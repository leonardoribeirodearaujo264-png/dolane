'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, X } from 'lucide-react';

import Logo from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { fullNav, site, telHref } from '@/lib/site';
import { hasReviews } from '@/content/reviews';

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock the page behind the panel and wire up Esc + focus.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      // Trap focus inside the panel while it is open.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
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
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const links = hasReviews
    ? [...fullNav.slice(0, 4), { label: 'Reviews', href: '/#reviews' }, ...fullNav.slice(4)]
    : fullNav;

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-forest-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        // The panel stays mounted so it can animate, so it must only advertise
        // itself as a modal dialog while it is actually open.
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? 'Main menu' : undefined}
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-forest-900 shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold-500/15 px-6 py-5">
          <Link href="/" onClick={onClose} aria-label={`${site.name} — home`}>
            <Logo height={36} />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full border border-gold-500/25 p-2.5 text-gold-200 transition hover:bg-gold-500/10"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Sized so the whole list fits without scrolling on a standard phone. */}
        <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile">
          <ul className="space-y-0.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-2.5 font-display text-xl text-cream/90 transition hover:bg-gold-500/10 hover:text-gold-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2.5 border-t border-gold-500/15 px-6 py-5">
          <ButtonLink href="/#quote" onClick={onClose} size="lg" className="w-full">
            Request a Free Quote
          </ButtonLink>
          <a
            href={telHref}
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full border border-gold-500/25 px-6 py-3.5 text-sm font-semibold text-gold-200 transition hover:bg-gold-500/10"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone.display}
          </a>
          <p className="pt-1 text-center text-xs text-forest-100/50">
            Free estimates &middot; No obligation
          </p>
        </div>
      </div>
    </div>
  );
}
