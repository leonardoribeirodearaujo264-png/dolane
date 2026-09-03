'use client';

import { MessageSquareText } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { smsHrefWithBody } from '@/lib/site';
import { trackContact } from '@/lib/analytics';

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
 * "Text Us" call-to-action. Opens the visitor's SMS app to the business number
 * with a short message prefilled, and reports a Meta `Contact` event on tap.
 */
export default function SmsButton({
  children = 'Text Us',
  variant = 'forest',
  size = 'md',
  className,
  withIcon = true,
}: {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withIcon?: boolean;
}) {
  return (
    <a
      href={smsHrefWithBody}
      onClick={() => trackContact('sms')}
      className={cn(base, variants[variant], variant !== 'link' && sizes[size], className)}
    >
      {withIcon && <MessageSquareText className="size-4 shrink-0" aria-hidden="true" />}
      {children}
    </a>
  );
}
