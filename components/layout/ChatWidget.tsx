'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronLeft,
  Loader2,
  MessageCircle,
  MessageSquareText,
  Phone,
  Send,
  Smartphone,
  X,
} from 'lucide-react';

import { cn } from '@/lib/cn';
import { CHAT_OPEN_EVENT } from '@/lib/chat';
import { site, smsHref, telHref, whatsappHref } from '@/lib/site';

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 0 0 4.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.64-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2zm0 17.94h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.19 8.2-8.19a8.14 8.14 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.8c0 4.51-3.68 8.19-8.19 8.19z" />
    </svg>
  );
}

const fieldBase =
  'w-full rounded-xl border border-forest-900/15 bg-white px-3.5 py-2.5 text-sm text-forest-900 shadow-sm transition-colors placeholder:text-forest-900/35 focus:outline-none focus:ring-2 focus:ring-gold-500/40';

type View = 'menu' | 'chat';
type SendState = 'idle' | 'sending' | 'sent' | 'error';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('menu');

  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Live-chat message state.
  const [status, setStatus] = useState<SendState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Any "Chat with us" button on the page asks the widget to open.
  useEffect(() => {
    const onOpen = () => {
      setView('menu');
      setOpen(true);
    };
    window.addEventListener(CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, onOpen);
  }, []);

  // Esc closes; clicking outside the panel closes.
  useEffect(() => {
    if (!open) return;
    startedAt.current = Date.now();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !launcherRef.current?.contains(target)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, close]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
  }, [open, view]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      contact: String(formData.get('contact') ?? ''),
      message: String(formData.get('message') ?? ''),
      company: String(formData.get('company') ?? ''),
      startedAt: startedAt.current,
    };

    setStatus('sending');
    setErrors({});
    setServerMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(result.fieldErrors ?? {});
        setServerMessage(result.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('sent');
      form.reset();
    } catch {
      setServerMessage('We could not send that just now. Please call or text us instead.');
      setStatus('error');
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Chat with Dolane Cleaning Services"
          className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-forest-900/10 bg-cream shadow-lift sm:right-6"
        >
          {/* Header */}
          <div className="relative bg-forest-900 px-5 py-4">
            {view === 'chat' && (
              <button
                type="button"
                onClick={() => setView('menu')}
                aria-label="Back"
                className="absolute left-3 top-4 rounded-full p-1 text-gold-200/80 transition hover:bg-gold-500/10 hover:text-gold-200"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="absolute right-3 top-4 rounded-full p-1 text-gold-200/80 transition hover:bg-gold-500/10 hover:text-gold-200"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <div className={cn(view === 'chat' && 'pl-7')}>
              <p className="font-display text-xl leading-none text-cream">
                {view === 'chat' ? 'Send us a message' : 'Chat with us'}
              </p>
              <p className="mt-1.5 text-xs text-forest-100/70">
                {view === 'chat'
                  ? 'We usually reply within a business day.'
                  : 'How would you like to reach us?'}
              </p>
            </div>
          </div>

          {/* Body */}
          {view === 'menu' ? (
            <div className="p-3">
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  setStatus('idle');
                  setView('chat');
                }}
                className="flex w-full items-center gap-3.5 rounded-xl border border-forest-900/10 bg-white px-4 py-3.5 text-left transition hover:border-gold-600/40 hover:bg-gold-100/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-900 text-gold-300">
                  <MessageSquareText className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-forest-900">Live chat</span>
                  <span className="block text-xs text-forest-900/55">
                    Send a message and we&apos;ll reply
                  </span>
                </span>
              </button>

              <a
                href={smsHref}
                className="mt-2 flex w-full items-center gap-3.5 rounded-xl border border-forest-900/10 bg-white px-4 py-3.5 text-left transition hover:border-gold-600/40 hover:bg-gold-100/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-900 text-gold-300">
                  <Smartphone className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-forest-900">Text message</span>
                  <span className="block text-xs text-forest-900/55">{site.phone.display}</span>
                </span>
              </a>

              <a
                href={telHref}
                className="mt-2 flex w-full items-center gap-3.5 rounded-xl border border-forest-900/10 bg-white px-4 py-3.5 text-left transition hover:border-gold-600/40 hover:bg-gold-100/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-900 text-gold-300">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-forest-900">Call now</span>
                  <span className="block text-xs text-forest-900/55">{site.phone.display}</span>
                </span>
              </a>

              {/* WhatsApp kept as a secondary option. */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-forest-900/55 transition hover:text-forest-900"
              >
                <WhatsAppGlyph className="size-4" />
                Prefer WhatsApp? Message us there
              </a>
            </div>
          ) : status === 'sent' ? (
            <div className="p-6 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest-900">
                <Check className="size-6 text-gold-400" aria-hidden="true" />
              </span>
              <p className="mt-4 font-display text-xl text-forest-900">Message sent</p>
              <p className="mt-2 text-sm leading-relaxed text-forest-900/65">
                Thanks for reaching out — Letici or George will get right back to you.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-gold-200 transition hover:bg-forest-800"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call or text {site.phone.display}
                </a>
                <button
                  type="button"
                  onClick={() => setView('menu')}
                  className="text-xs text-forest-900/55 underline-offset-4 hover:underline"
                >
                  Back to all options
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-2.5 p-4">
              <div>
                <label htmlFor="chat-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="chat-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  data-autofocus
                  placeholder="Your name"
                  className={cn(fieldBase, errors.name && 'border-red-400')}
                />
                {errors.name && (
                  <p role="alert" className="mt-1 text-xs text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="chat-contact" className="sr-only">
                  Phone or email
                </label>
                <input
                  id="chat-contact"
                  name="contact"
                  type="text"
                  autoComplete="tel"
                  placeholder="Phone or email"
                  className={cn(fieldBase, errors.contact && 'border-red-400')}
                />
                {errors.contact && (
                  <p role="alert" className="mt-1 text-xs text-red-700">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="chat-message" className="sr-only">
                  How can we help?
                </label>
                <textarea
                  id="chat-message"
                  name="message"
                  rows={3}
                  placeholder="How can we help?"
                  className={cn(fieldBase, 'resize-y', errors.message && 'border-red-400')}
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs text-red-700">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="chat-company">Company</label>
                <input id="chat-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {status === 'error' && serverMessage && (
                <p role="alert" className="flex items-start gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  {serverMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>
              <p className="text-center text-[0.7rem] leading-relaxed text-forest-900/45">
                Prefer to talk now? Call or text {site.phone.display}.
              </p>
            </form>
          )}
        </div>
      )}

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => {
          setView('menu');
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with us'}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-full bg-forest-900 py-3.5 pl-4 pr-5 text-sm font-semibold text-gold-200 shadow-lift ring-1 ring-gold-500/30 transition hover:bg-forest-800 sm:right-6"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        {open ? (
          <X className="size-5 text-gold-300" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-5 text-gold-300" aria-hidden="true" />
        )}
        <span className={cn(open && 'sr-only')}>Chat with us</span>
      </button>
    </div>
  );
}
