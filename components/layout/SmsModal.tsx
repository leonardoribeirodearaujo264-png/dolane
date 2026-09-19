'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, MessageSquareText, Phone, X } from 'lucide-react';

import { SMS_MODAL_EVENT } from '@/lib/sms';
import { site, smsHrefWithBody, telHref } from '@/lib/site';

/**
 * Desktop fallback for the Text (SMS) buttons. On a computer an `sms:` link
 * usually does nothing, so instead of a dead click we show the number with a
 * one-tap copy. Rendered once (in the layout); any SmsButton opens it by event.
 */
export default function SmsModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus?.();
  }, []);

  useEffect(() => {
    const onOpen = () => {
      lastFocused.current = document.activeElement as HTMLElement;
      setCopied(false);
      setOpen(true);
    };
    window.addEventListener(SMS_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(SMS_MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      // Simple focus trap.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  async function copyNumber() {
    const text = site.phone.display;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Legacy fallback for contexts without the async clipboard API.
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
    // If both paths fail (very rare), the number stays visible on screen to copy.
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sms-modal-title"
        data-sms-modal
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-forest-900/10 bg-cream shadow-lift"
      >
        <div className="bg-forest-900 px-6 py-5">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-1.5 text-gold-200/80 transition hover:bg-gold-500/10 hover:text-gold-200"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <span className="flex size-11 items-center justify-center rounded-full bg-gold-500">
            <MessageSquareText className="size-5 text-forest-900" aria-hidden="true" />
          </span>
          <h2 id="sms-modal-title" className="mt-4 font-display text-2xl text-cream">
            Text us for a fast, free quote
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-forest-100/75">
            Text us at the number below and we&apos;ll reply quickly with your free quote.
          </p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-forest-900/12 bg-white px-4 py-3.5">
            <span className="text-lg font-semibold tracking-wide text-forest-900">
              {site.phone.display}
            </span>
            <button
              type="button"
              data-autofocus
              onClick={copyNumber}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2 text-xs font-semibold text-gold-200 transition hover:bg-forest-800"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" aria-hidden="true" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={smsHrefWithBody}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-900 transition hover:bg-gold-400"
            >
              <MessageSquareText className="size-4" aria-hidden="true" />
              Open Messages
            </a>
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-900/20 px-6 py-3 text-sm font-semibold text-forest-900 transition hover:border-forest-900/50"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phone.display}
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-forest-900/50">
            Quick response &middot; Free quote &middot; No obligation
          </p>
        </div>
      </div>
    </div>
  );
}
