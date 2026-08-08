import { MapPin } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { serviceArea, site } from '@/lib/site';

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Service Area"
          title="Proudly serving Central Ohio"
          intro={`Based in ${site.location.city} and providing professional cleaning services throughout Columbus and surrounding communities.`}
        />

        <Reveal className="mt-12 lg:mt-14">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {serviceArea.map((city) => (
              <li
                key={city}
                className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/12 bg-white px-4 py-2 text-sm text-forest-900/80 shadow-soft transition-colors hover:border-gold-600/45 hover:text-forest-900"
              >
                <MapPin className="size-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                {city}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="mt-12 text-center">
          <p className="text-base text-forest-900/70">
            Do not see your city? We may still be able to help.
          </p>
          <ButtonLink href="#quote" variant="outline" className="mt-5">
            Check availability in your area
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
