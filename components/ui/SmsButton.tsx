'use client';

import { MessageSquareText } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { smsHrefWithBody } from '@/lib/site';
import { isLikelyMobile, openSmsModal } from '@/lib/sms';

type Variant = 'gold' | 'forest' | 'ghost-light' | 'link';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<Variant, string> = {
  gold: 'bg-gold-500 text-forest-900 shadow-soft hover:bg-gold-400 hover:shadow-lift hover:-translate-y-0.5 focus-visible:outline-forest-900',
  forest:
    'bg-forest-900 text-gold-200 shadow-soft hover:bg-forest-800 hover:shadow-lift hover:-translate-y-0.5 focus-visible:outline-gold-600',
  'ghost-light':
    'border border-gold-300/45 text-gold-100 backdrop-blur-sm hover:border-gold-300 hover:bg-gold-300/12 focus-visible:outline-gold-300',
  // Not a pill — an inline text affordance.
  link: 'gap-1.5 rounded-none font-semibold text-forest-900 underline-offset-4 hover:text-gold-700 hover:underline',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[0.95rem]',
};

/**
 * "Text Us" call-to-action.
 *
 * On a phone/tablet it opens the native Messages app to the business number with
 * a message prefilled. On a desktop — where `sms:` typically does nothing — it
 * opens the copy-number modal instead, so the click always has a visible result.
 * The Meta `Lead` (lead_type: 'sms') event is fired by the delegated listener in
 * MetaPixel, so every SMS link is tracked in one place.
 */
export default function SmsButton({
  children = 'Text Us',
  variant = 'forest',
  size = 'md',
  className,
  withIcon = true,
  pulse = false,
}: {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withIcon?: boolean;
  pulse?: boolean;
}) {
  return (
    <a
      href={smsHrefWithBody}
      aria-label={typeof children === 'string' ? children : 'Text us for a free quote'}
      onClick={(event) => {
        // On desktop, fall back to the modal instead of a dead sms: link.
        if (!isLikelyMobile()) {
          event.preventDefault();
          openSmsModal();
        }
      }}
      className={cn(
        base,
        variants[variant],
        variant !== 'link' && sizes[size],
        pulse && 'cta-pulse',
        className,
      )}
    >
      {withIcon && <MessageSquareText className="size-4 shrink-0" aria-hidden="true" />}
      {children}
    </a>
  );
}
