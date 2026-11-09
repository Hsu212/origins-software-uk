import { NextRequest, NextResponse } from 'next/server';
import { locales, type Locale } from './app/i18n';

const prefixedLocales = locales.filter((locale) => locale !== 'en');

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split('/')[1] as Locale;
  const headers = new Headers(request.headers);
  const originalPath = request.headers.get('x-site-original-path');
  const existingLocale = request.headers.get('x-site-locale');
  headers.set('x-site-original-path', originalPath || pathname);
  if (!prefixedLocales.includes(firstSegment as (typeof prefixedLocales)[number])) {
    const forwardedLocale = prefixedLocales.find((locale) => locale === existingLocale) || 'en';
    headers.set('x-site-locale', forwardedLocale);
    return NextResponse.next({ request: { headers } });
  }

  const rewritten = request.nextUrl.clone();
  rewritten.pathname = pathname.replace(/^\/(ja|zh|ar|de)(?=\/|$)/, '') || '/';
  headers.set('x-site-locale', firstSegment);
  return NextResponse.rewrite(rewritten, { request: { headers } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
