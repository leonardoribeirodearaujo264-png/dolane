'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  /** Stagger, in ms, applied to this element only. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and lifts its children into view once, the first time they are scrolled
 * near. Reduced-motion users get the final state with no transition, handled in
 * globals.css so there is no flash of hidden content.
 */
export default function Reveal({ children, delay = 0, className, as }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      data-revealed={revealed ? 'true' : 'false'}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
