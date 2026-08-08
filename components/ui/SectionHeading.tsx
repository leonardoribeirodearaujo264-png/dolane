import { cn } from '@/lib/cn';
import Reveal from './Reveal';

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Use on deep-green backgrounds. */
  tone?: 'dark' | 'light';
  align?: 'center' | 'left';
  className?: string;
};

/** The shared section header: gold eyebrow, hairline rule, serif title, intro. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'dark',
  align = 'center',
  className,
}: Props) {
  const centered = align === 'center';

  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        centered && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-3', centered && 'justify-center')}>
          <span className="rule-gold w-8" aria-hidden="true" />
          <span
            className={cn(
              'eyebrow',
              tone === 'dark' ? 'text-gold-700' : 'text-gold-400',
            )}
          >
            {eyebrow}
          </span>
          <span className="rule-gold w-8" aria-hidden="true" />
        </div>
      )}

      <h2
        className={cn(
          'mt-5 text-4xl leading-[1.12] sm:text-5xl',
          tone === 'dark' ? 'text-forest-900' : 'text-cream',
        )}
      >
        {title}
      </h2>

      {intro && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-forest-900/70' : 'text-forest-100/80',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
