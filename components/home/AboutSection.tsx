import Image from 'next/image';
import { Quote } from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { mission, values } from '@/content/trust';
import { site } from '@/lib/site';

export default function AboutSection() {
  return (
    <section id="about" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Owners first — the family is the reason people call. */}
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src="/images/about/dolane-cleaning-owners-letici-and-george.webp"
                alt="Letici Dolane and George, the husband-and-wife owners of Dolane Cleaning Services in Westerville, Ohio"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-gold-600/20 bg-forest-900 px-6 py-4 shadow-lift sm:left-8 sm:right-8 lg:-right-6 lg:left-8">
              <p className="font-display text-xl text-gold-300">{site.owners.names}</p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-forest-100/60">
                {site.owners.role} &middot; {site.location.city}, {site.location.stateCode}
              </p>
            </div>
          </Reveal>

          <div className="pt-8 lg:pt-0">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="rule-gold w-8" aria-hidden="true" />
                <span className="eyebrow text-gold-700">About Dolane Cleaning</span>
              </div>

              <h2 className="mt-5 text-4xl leading-[1.12] text-forest-900 sm:text-5xl">
                A family business you can trust
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-forest-900/75 sm:text-lg">
                <p>
                  Dolane Cleaning Services is a family-owned cleaning company operated by
                  husband-and-wife team Letici and George. We believe that allowing
                  someone into your home requires trust, which is why we personally bring
                  care, responsibility and attention to every service.
                </p>
                <p>
                  With more than seven years of cleaning experience, our goal is not simply
                  to clean a house. We want to give our clients the peace of mind of knowing
                  their home is being cared for by people who truly value their trust.
                </p>
                <p>
                  We believe a clean home brings comfort, peace and more time to enjoy the
                  people and moments that matter most.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <ButtonLink href="#quote" size="lg">
                Request a Free Quote
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        {/* Mission + values, kept quiet so they support rather than compete. */}
        <div className="mt-20 grid gap-10 lg:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="relative">
            <Quote
              className="size-9 text-gold-500/60"
              aria-hidden="true"
              strokeWidth={1.25}
            />
            <p className="mt-4 font-display text-2xl leading-snug text-forest-900 sm:text-[1.75rem]">
              Our mission
            </p>
            <p className="mt-3 text-base leading-relaxed text-forest-900/70">{mission}</p>

            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/images/about/dolane-cleaning-owner-letici-dolane.webp"
                alt="Letici Dolane, co-owner of Dolane Cleaning Services"
                width={64}
                height={64}
                className="size-16 rounded-full object-cover object-top ring-2 ring-gold-500/30"
              />
              <div>
                <p className="font-semibold text-forest-900">Letici Dolane</p>
                <p className="text-sm text-forest-900/55">Co-owner</p>
              </div>
            </div>
          </Reveal>

          <div className="grid content-start gap-6 sm:grid-cols-3">
            {values.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 90}
                className="self-start rounded-2xl border border-forest-900/10 bg-white p-6 shadow-soft"
              >
                <span className="rule-gold w-8" aria-hidden="true" />
                <h3 className="mt-4 text-2xl text-forest-900">{value.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-forest-900/70">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
