import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Check, HardHat, Briefcase } from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import { LogoMark } from '@/components/ui/Logo';
import type { Service } from '@/content/services';

/**
 * Fallback art for services we have no real photo of yet. Rather than borrow an
 * unrelated or stock image, those cards get a deep-green panel carrying the
 * logo monogram — which reads as deliberate next to the photo cards.
 */
const fallbackIcons: Record<string, typeof Building2> = {
  'commercial-cleaning': Building2,
  'office-cleaning': Briefcase,
  'post-construction-cleaning': HardHat,
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const FallbackIcon = fallbackIcons[service.slug] ?? Building2;
  const quoteHref = `/#quote?service=${encodeURIComponent(service.quoteValue)}`;

  return (
    <Reveal
      as="article"
      delay={(index % 3) * 90}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        {service.image ? (
          <>
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-forest-950/5 to-transparent"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-forest-900">
            <LogoMark
              size={220}
              className="absolute -right-8 -top-8 opacity-[0.06]"
            />
            <FallbackIcon
              className="size-14 text-gold-500/80 transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        )}

        <h3 className="absolute inset-x-5 bottom-4 font-display text-2xl leading-tight text-cream drop-shadow-sm">
          {service.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-forest-900/70">{service.summary}</p>

        <ul className="mt-5 space-y-2.5">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5 text-sm text-forest-900/75">
              <Check className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <Link
          href={quoteHref}
          className="mt-6 inline-flex items-center gap-2 self-start border-b border-gold-600/40 pb-1 text-sm font-semibold text-forest-900 transition-colors hover:border-gold-600 hover:text-gold-700"
        >
          Request a Quote
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
          <span className="sr-only">for {service.title}</span>
        </Link>
      </div>
    </Reveal>
  );
}
