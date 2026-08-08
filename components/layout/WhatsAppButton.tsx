'use client';

import { useEffect, useState } from 'react';

import { whatsappHref } from '@/lib/site';

/**
 * Floating WhatsApp entry point. Appears only after the visitor has scrolled
 * past the hero so it never covers the first thing they see, and it sits above
 * the safe-area inset on phones with a home indicator.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Dolane Cleaning Services on WhatsApp"
      className={`fixed right-4 z-40 flex size-14 items-center justify-center rounded-full bg-forest-800 text-gold-300 shadow-lift ring-1 ring-gold-500/30 transition-all duration-300 hover:bg-forest-700 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      {/* WhatsApp glyph, drawn inline to avoid loading an icon set for one mark. */}
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 0 0 4.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.64-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2zm0 17.94h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.19 8.2-8.19a8.14 8.14 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.8c0 4.51-3.68 8.19-8.19 8.19z" />
      </svg>
    </a>
  );
}
