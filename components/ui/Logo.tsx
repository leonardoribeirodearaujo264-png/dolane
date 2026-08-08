import Image from 'next/image';
import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

/** Intrinsic size of the extracted lockup, kept in one place. */
const LOCKUP = { width: 900, height: 542 };

type Props = {
  /** Rendered height in px at the largest breakpoint. */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * The official Dolane Cleaning lockup, unmodified apart from having its mockup
 * backdrop removed so it can sit on the site's own deep-green surfaces.
 */
export default function Logo({ height = 48, className, priority = false }: Props) {
  const width = Math.round((LOCKUP.width / LOCKUP.height) * height);

  return (
    <Image
      src="/images/logo/dolane-cleaning-logo.png"
      alt={`${site.name} logo`}
      width={width}
      height={height}
      priority={priority}
      className={cn('h-auto w-auto object-contain', className)}
      sizes={`${width}px`}
    />
  );
}

export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo/dolane-cleaning-mark.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn('object-contain', className)}
    />
  );
}
