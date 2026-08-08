import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'gold' | 'forest' | 'outline' | 'ghost-light';
type Size = 'md' | 'lg';

/**
 * Note: `base` sets a display value, and Tailwind emits display utilities in a
 * fixed order regardless of class order in the attribute. Passing `hidden` via
 * `className` will NOT reliably hide a button — wrap it in a `<span
 * className="hidden sm:block">` instead.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  // Primary CTA: logo gold with deep-green type — high contrast, no glow.
  gold: 'bg-gold-500 text-forest-900 shadow-soft hover:bg-gold-400 hover:shadow-lift hover:-translate-y-0.5 focus-visible:outline-forest-900',
  forest:
    'bg-forest-900 text-gold-200 shadow-soft hover:bg-forest-800 hover:shadow-lift hover:-translate-y-0.5 focus-visible:outline-gold-600',
  outline:
    'border border-forest-900/25 text-forest-900 hover:border-forest-900/60 hover:bg-forest-900 hover:text-gold-200 focus-visible:outline-forest-900',
  // For placing on top of photos or deep-green panels.
  'ghost-light':
    'border border-gold-300/45 text-gold-100 backdrop-blur-sm hover:border-gold-300 hover:bg-gold-300/12 focus-visible:outline-gold-300',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[0.95rem]',
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function ButtonLink({
  children,
  variant = 'gold',
  size = 'md',
  className,
  ...props
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = 'gold',
  size = 'md',
  className,
  ...props
}: ButtonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
