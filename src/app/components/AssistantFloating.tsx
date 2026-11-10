'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from '@/app/components/LocaleLink';
import { localeNames, locales, translate } from '@/app/i18n';
import { findEmbeddedFaq, getEmbeddedFaq, suggestedQuestions } from '@/app/data/assistantFaq';
import { useLocale } from './LocaleProvider';

type ChatRole = 'user' | 'assistant';
type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  link?: { href: string; label: string };
};

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
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) window.requestAnimationFrame(() => launcherRef.current?.focus());
      wasOpenRef.current = false;
      return;
    }
    wasOpenRef.current = true;
    inputRef.current?.focus();
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduce') ? 'auto' : 'smooth' });
  }, [messages]);

  const askQuestion = (question: string) => {
    const answer = findEmbeddedFaq(question, locale);
    const response: ChatMessage = answer
      ? {
          id: createSessionId(),
          role: 'assistant',
          content: answer.answer,
          ...(answer.href && answer.linkLabel ? { link: { href: answer.href, label: answer.linkLabel } } : {}),
        }
      : {
          id: createSessionId(),
          role: 'assistant',
          content: localized('I don’t have a verified answer for that question yet. Please contact our team and we’ll be happy to help.'),
          link: { href: '/contact', label: localized('Contact Origins') },
        };
    setMessages((current) => [
      ...current,
      { id: createSessionId(), role: 'user', content: question },
      response,
    ]);
  };

  const sendMessage = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const message = input.trim();
    if (!message) return;
    if (message.length > 4000) {
      setErrorMessage(localized('Please keep each message under 4,000 characters.'));
      return;
    }

    setInput('');
    setErrorMessage('');
    askQuestion(message);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([welcomeMessage]);
    setInput('');
    setErrorMessage('');
  };

  const faq = getEmbeddedFaq(locale);
  const suggestedFaq = suggestedQuestions
    .map((question) => faq.find((item) => item.question === localized(question)))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

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
            <div className="origins-assistant-mark" aria-hidden="true">
              <Image src="/origins-icon.png" alt="" width={30} height={30} />
            </div>
            <div className="origins-assistant-heading">
              <h2 id="origins-assistant-title">{localized('Origins Assistant')}</h2>
              <p><span className="origins-assistant-status-dot" /> {localized('Company FAQ assistant')} <span className="origins-assistant-local-badge">{localized('LOCAL')}</span></p>
            </div>
            <button type="button" className="origins-assistant-icon-button" onClick={resetConversation} aria-label={localized('Clear conversation')} title={localized('Clear conversation')}>↺</button>
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
                {message.role === 'assistant' && (
                  <span className="origins-assistant-avatar" aria-hidden="true">
                    <Image src="/origins-icon.png" alt="" width={19} height={19} />
                  </span>
                )}
                <div className="origins-assistant-message-content">
                  <p>{message.content}</p>
                  {message.link && (
                    message.link.href.startsWith('mailto:') || message.link.href.startsWith('https://')
                      ? <a className="origins-assistant-answer-link" href={message.link.href} target={message.link.href.startsWith('https://') ? '_blank' : undefined} rel={message.link.href.startsWith('https://') ? 'noreferrer' : undefined}>{message.link.label} <span aria-hidden="true">↗</span></a>
                      : <Link className="origins-assistant-answer-link" href={message.link.href}>{message.link.label} <span aria-hidden="true">↗</span></Link>
                  )}
                </div>
              </article>
            ))}
            {messages.length === 1 && suggestedFaq.length > 0 && (
              <div className="origins-assistant-suggestions" aria-label={localized('Suggested questions')}>
                <p>{localized('Suggested questions')}</p>
                {suggestedFaq.map((item) => (
                  <button type="button" key={item.id} onClick={() => askQuestion(item.question)}>{item.question}</button>
                ))}
              </div>
            )}
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
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim()} aria-label={localized('Send message')}>↗</button>
          </form>
          <footer className="origins-assistant-footer">{localized('Answers come from reviewed company FAQs; no generative AI is used.')} <Link href="/settings">{localized('Privacy & settings')}</Link></footer>
        </section>
      )}
    </div>
  );
}
