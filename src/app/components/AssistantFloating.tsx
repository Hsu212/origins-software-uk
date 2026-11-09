'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import Link from '@/app/components/LocaleLink';
import { localeNames, locales, translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';

type ChatRole = 'user' | 'assistant';
type ChatMessage = { id: string; role: ChatRole; content: string; sources?: string[] };

const WELCOME_MESSAGE: ChatMessage = {
  id: 'origins-welcome',
  role: 'assistant',
  content: 'Hello — I’m the Origins Software assistant. Ask about our services, engineering approach, AI solutions, or how to start a project.',
};

function createSessionId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    // Fall back for browsers without crypto.randomUUID.
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export default function AssistantFloating() {
  const locale = useLocale();
  const localized = (text: string) => translate(locale, text);
  const welcomeMessage = { ...WELCOME_MESSAGE, content: localized(WELCOME_MESSAGE.content) };
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const storageKey = 'origins-assistant-session-id';
    try {
      const current = sessionStorage.getItem(storageKey) || createSessionId();
      sessionStorage.setItem(storageKey, current);
      setSessionId(current);
    } catch {
      setSessionId(createSessionId());
    }
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) window.requestAnimationFrame(() => launcherRef.current?.focus());
      wasOpenRef.current = false;
      return;
    }
    wasOpenRef.current = true;
    inputRef.current?.focus();
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, isLoading]);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduce') ? 'auto' : 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const message = input.trim();
    if (!message || isLoading) return;
    if (message.length > 4000) {
      setErrorMessage('Please keep each message under 4,000 characters.');
      return;
    }

    const nextUserMessage: ChatMessage = { id: createSessionId(), role: 'user', content: message };
    const history = messages.filter((item) => item.id !== WELCOME_MESSAGE.id).slice(-10).map(({ role, content }) => ({ role, content }));
    setMessages((current) => [...current, nextUserMessage]);
    setInput('');
    setErrorMessage('');
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          message,
          conversationHistory: history,
          sessionId,
          pageUrl: window.location.href,
          locale,
        }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({})) as {
        answer?: unknown;
        error?: unknown;
        sources?: unknown;
      };
      if (!response.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'The assistant could not answer just now. Please try again.');
      }
      if (typeof data.answer !== 'string' || !data.answer.trim()) {
        throw new Error('The assistant returned an empty response. Please try again.');
      }
      const sources = Array.isArray(data.sources)
        ? data.sources.filter((source): source is string => typeof source === 'string').slice(0, 5)
        : [];
      setMessages((current) => [...current, {
        id: createSessionId(),
        role: 'assistant',
        content: data.answer as string,
        ...(sources.length ? { sources } : {}),
      }]);
    } catch (error) {
      const messageText = error instanceof Error && error.name === 'AbortError'
        ? 'The assistant took too long to respond. Please try again.'
        : error instanceof Error
          ? error.message
          : 'I can’t connect to the assistant service right now. Please try again later.';
      setErrorMessage(messageText);
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const resetConversation = () => {
    if (isLoading) return;
    setMessages([welcomeMessage]);
    setInput('');
    setErrorMessage('');
    setIsLoading(false);
  };

  return (
    <div className="origins-assistant-root">
      {!isOpen && (
        <button ref={launcherRef} className="origins-assistant-launcher" type="button" onClick={() => setIsOpen(true)} aria-label={localized('Open Origins AI assistant')} aria-haspopup="dialog">
          <span className="origins-assistant-launcher-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M5 5.75h14a1.25 1.25 0 0 1 1.25 1.25v8A1.25 1.25 0 0 1 19 16.25h-8l-4.5 3v-3.13A1.25 1.25 0 0 1 4.75 15V7A1.25 1.25 0 0 1 6 5.75Z" />
              <path d="M9 10.25h6M9 13h3.5" />
            </svg>
          </span>
          <span className="origins-assistant-launcher-label">{localized('Ask Origins')}</span>
        </button>
      )}

      {isOpen && (
        <section className="origins-assistant-panel" role="dialog" aria-modal="false" aria-labelledby="origins-assistant-title">
          <header className="origins-assistant-header">
            <div className="origins-assistant-mark" aria-hidden="true">O.</div>
            <div className="origins-assistant-heading">
              <h2 id="origins-assistant-title">{localized('Origins Assistant')}</h2>
              <p><span className="origins-assistant-status-dot" /> {localized('Knowledge assistant')}</p>
            </div>
            <button type="button" className="origins-assistant-icon-button" onClick={resetConversation} disabled={isLoading} aria-label={localized('Clear conversation')} title={localized('Clear conversation')}>↺</button>
            <button type="button" className="origins-assistant-icon-button" onClick={() => setIsOpen(false)} aria-label={localized('Close assistant')}>×</button>
          </header>

          <div className="origins-assistant-languages">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18m0-18a14 14 0 0 0 0 18" />
            </svg>
            <span className="origins-assistant-languages-label">{localized('Replies in your selected language')}</span>
            <span className="origins-assistant-language-list">
              {locales.map((language) => <span key={language}>{localeNames[language]}</span>)}
            </span>
          </div>

          <div className="origins-assistant-messages" ref={messagesRef} aria-label={localized('Conversation')} aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <article key={message.id} className={`origins-assistant-message origins-assistant-message-${message.role}`}>
                {message.role === 'assistant' && <span className="origins-assistant-avatar" aria-hidden="true">O</span>}
                <div className="origins-assistant-message-content">
                  <p>{message.content}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="origins-assistant-sources"><span>{localized('Sources')}</span>{message.sources.map((source, index) => <p key={`${source}-${index}`}>{source}</p>)}</div>
                  )}
                </div>
              </article>
            ))}
            {isLoading && <div className="origins-assistant-loading" role="status"><span /><span /><span /> <em>{localized('Searching the knowledge base…')}</em></div>}
          </div>

          {errorMessage && <p className="origins-assistant-error" role="alert">{errorMessage}</p>}

          <form className="origins-assistant-composer" onSubmit={(event) => { void sendMessage(event); }}>
            <label className="sr-only" htmlFor="origins-assistant-input">{localized('Your message')}</label>
            <input
              ref={inputRef}
              id="origins-assistant-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={localized('Ask about Origins…')}
              maxLength={4000}
              disabled={isLoading}
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim() || isLoading} aria-label={localized('Send message')}>↗</button>
          </form>
          <footer className="origins-assistant-footer">{localized('AI-generated responses may be inaccurate.')} <Link href="/settings">{localized('Privacy & settings')}</Link></footer>
        </section>
      )}
    </div>
  );
}
