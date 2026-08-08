import Image from 'next/image';

import Reveal from '@/components/ui/Reveal';
import { signatureTouches } from '@/content/gallery';

/**
 * The owners finish every job with a small folded detail. It is the most
 * concrete proof of the "attention to detail" claim, so it gets its own strip
 * rather than being buried in the gallery.
 */
export default function SignatureTouches() {
  if (signatureTouches.length === 0) return null;

  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="rule-gold w-8" aria-hidden="true" />
              <span className="eyebrow text-gold-700">The little things</span>
            </div>

            <h2 className="mt-5 text-4xl leading-[1.12] text-forest-900 sm:text-5xl">
              We leave a little something behind
            </h2>

            <p className="mt-6 text-base leading-relaxed text-forest-900/75 sm:text-lg">
              A folded towel on the oven handle. A paper heart in the guest bathroom. A
              sticker for the kids. None of it is on the checklist &mdash; it is just how
              we like to leave a home we have taken care of.
            </p>

            <p className="mt-4 text-base leading-relaxed text-forest-900/75">
              It is the same instinct that makes us clean the shower track instead of
              wiping over it.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {signatureTouches.map((touch, index) => (
                <figure
                  key={touch.src}
                  className={
                    index === 0
                      ? 'col-span-2 overflow-hidden rounded-2xl shadow-soft sm:col-span-2 sm:row-span-2'
                      : 'overflow-hidden rounded-2xl shadow-soft'
                  }
                >
                  <Image
                    src={touch.src}
                    alt={touch.alt}
                    width={touch.width}
                    height={touch.height}
                    sizes="(max-width: 640px) 45vw, 30vw"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
