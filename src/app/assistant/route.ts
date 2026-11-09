import { NextResponse } from 'next/server';
import { localeNames, locales } from '@/app/i18n';

export const runtime = 'nodejs';
export const maxDuration = 40;

const MAX_BODY_BYTES = 32 * 1024;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 10;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 20;

type ChatRole = 'user' | 'assistant';
type HistoryMessage = { role: ChatRole; content: string };
type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function extractAnswer(value: unknown, depth = 0): string | null {
  if (typeof value === 'string') return value.trim() || null;
  if (!isRecord(value) || depth > 3) return null;
  for (const key of ['answer', 'response', 'message', 'output_text', 'output', 'text', 'content']) {
    const candidate = value[key];
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
  }
  if (Array.isArray(value.choices) && value.choices.length > 0) {
    const first = value.choices[0];
    if (isRecord(first)) {
      const message = isRecord(first.message) ? first.message : null;
      const content = message?.content;
      if (typeof content === 'string' && content.trim()) return content.trim();
    }
  }
  for (const key of ['data', 'result', 'message', 'response']) {
    const nested = extractAnswer(value[key], depth + 1);
    if (nested) return nested;
  }
  return null;
}

function extractSources(value: unknown): string[] {
  if (!isRecord(value)) return [];
  const raw = value.sources ?? value.citations ?? value.references ?? value.source_documents;
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): string[] => {
    if (typeof item === 'string' && item.trim()) return [item.trim().slice(0, 500)];
    if (isRecord(item)) {
      const meta = isRecord(item.metadata) ? item.metadata : {};
      const text = stringValue(item.title) ?? stringValue(item.url) ?? stringValue(item.source) ?? stringValue(meta.title) ?? stringValue(meta.source) ?? stringValue(meta.url);
      return text ? [text.slice(0, 500)] : [];
    }
    return [];
  }).slice(0, 5);
}

function getClientKey(request: Request): string {
  // The deployment proxy should overwrite these headers. Configure trusted-proxy behaviour at the hosting layer.
  const realIp = request.headers.get('x-real-ip')?.trim();
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (realIp || forwarded || 'unknown').slice(0, 100);
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  if (rateBuckets.size >= 10_000) {
    for (const [bucketKey, bucket] of rateBuckets) {
      if (bucket.resetAt <= now) rateBuckets.delete(bucketKey);
    }
    // Fail closed when this best-effort per-process limiter is saturated.
    if (rateBuckets.size >= 10_000 && !rateBuckets.has(key)) return true;
  }
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_MAX_REQUESTS;
}

function safePageUrl(value: unknown, request: Request): string | undefined {
  if (typeof value !== 'string' || value.length > 2048) return undefined;
  try {
    const page = new URL(value);
    const requestHost = request.headers.get('host');
    if ((page.protocol !== 'https:' && page.protocol !== 'http:') || !requestHost || page.host.toLowerCase() !== requestHost.toLowerCase()) return undefined;
    return `${page.origin}${page.pathname}${page.search}`.slice(0, 2048);
  } catch {
    return undefined;
  }
}

function safeEndpoint(rawEndpoint: string): URL | null {
  try {
    const endpoint = new URL(rawEndpoint);
    if (endpoint.protocol !== 'https:' && endpoint.protocol !== 'http:') return null;
    if (process.env.NODE_ENV === 'production' && endpoint.protocol !== 'https:') return null;
    return endpoint;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const endpointValue = process.env.RAG_API_URL?.trim();
  if (!endpointValue) {
    return NextResponse.json(
      { error: 'The Origins assistant is not connected yet. The site administrator must set RAG_API_URL on the server.' },
      { status: 503 },
    );
  }
  const endpoint = safeEndpoint(endpointValue);
  if (!endpoint) {
    return NextResponse.json({ error: 'The assistant endpoint configuration is invalid.' }, { status: 500 });
  }

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== host.toLowerCase()) {
        return NextResponse.json({ error: 'Cross-origin requests are not allowed.' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
    }
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ error: 'Too many messages in a short period. Please wait a minute and try again.' }, { status: 429 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'The request is too large.' }, { status: 413 });
  }
  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'The request is too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }
  if (!isRecord(body)) return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });

  const message = stringValue(body.message);
  if (!message) return NextResponse.json({ error: 'Please enter a message.' }, { status: 400 });
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Messages must be ${MAX_MESSAGE_LENGTH.toLocaleString()} characters or fewer.` }, { status: 413 });
  }

  const rawHistory = Array.isArray(body.conversationHistory) ? body.conversationHistory : [];
  const conversationHistory: HistoryMessage[] = rawHistory.slice(-MAX_HISTORY_TURNS).flatMap((item): HistoryMessage[] => {
    if (!isRecord(item) || (item.role !== 'user' && item.role !== 'assistant')) return [];
    const content = stringValue(item.content);
    if (!content) return [];
    return [{ role: item.role, content: content.slice(0, 2000) }];
  });
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 128) : undefined;
  const pageUrl = safePageUrl(body.pageUrl, request);
  const locale = locales.find((supportedLocale) => supportedLocale === body.locale) ?? 'en';

  const authKey = process.env.RAG_API_KEY;
  const authHeader = process.env.RAG_API_AUTH_HEADER?.trim() || 'Authorization';
  const authScheme = process.env.RAG_API_AUTH_SCHEME?.trim() || 'Bearer';
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (authKey) {
    headers[authHeader] = authHeader.toLowerCase() === 'authorization' && authScheme
      ? `${authScheme} ${authKey}`
      : authKey;
  }

  const requestedTimeout = Number(process.env.RAG_API_TIMEOUT_MS || 30000);
  const timeoutMs = Number.isFinite(requestedTimeout) ? Math.max(5000, Math.min(requestedTimeout, 60000)) : 30000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const upstream = await fetch(endpoint.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message,
        conversationHistory,
        sessionId,
        pageUrl,
        locale,
        responseLanguage: localeNames[locale],
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!upstream.ok) {
      // Do not echo the RAG provider's raw body, URL, or secrets to the public client.
      return NextResponse.json(
        { error: upstream.status === 429 ? 'The assistant is busy right now. Please try again shortly.' : 'The assistant service could not complete the request. Please try again later.' },
        { status: upstream.status === 429 ? 429 : 502 },
      );
    }

    const upstreamLength = Number(upstream.headers.get('content-length') || 0);
    if (Number.isFinite(upstreamLength) && upstreamLength > 1_000_000) {
      await upstream.body?.cancel();
      return NextResponse.json({ error: 'The assistant returned a response that was too large.' }, { status: 502 });
    }
    const responseText = await upstream.text();
    if (new TextEncoder().encode(responseText).byteLength > 1_000_000) {
      return NextResponse.json({ error: 'The assistant returned a response that was too large.' }, { status: 502 });
    }
    let upstreamData: unknown = responseText;
    try {
      upstreamData = JSON.parse(responseText) as unknown;
    } catch {
      // Some simple RAG deployments return plain-text answers.
    }
    const answer = extractAnswer(upstreamData);
    if (!answer) {
      return NextResponse.json({ error: 'The assistant response format was not recognised. Check the RAG response contract.' }, { status: 502 });
    }
    return NextResponse.json({ answer: answer.slice(0, 20_000), sources: extractSources(upstreamData) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    return NextResponse.json(
      { error: timedOut ? 'The assistant service timed out. Please try again.' : 'The assistant service is temporarily unavailable. Please try again later.' },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
