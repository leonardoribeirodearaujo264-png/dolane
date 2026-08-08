import { Info, Plus } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ServiceCard from '@/components/services/ServiceCard';
import {
  additionalServices,
  additionalServicesNote,
  carpetNote,
  services,
} from '@/content/services';

export default function ServicesSection() {
  return (
    <section id="services" className="bg-sand py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Cleaning built around your home"
          intro="Professional cleaning solutions for homes and businesses across Central Ohio, tailored to your space, your schedule and how you actually live."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        {/* Add-ons and the carpet caveat, stated plainly up front. */}
        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-soft lg:mt-16">
          <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
            <div>
              <span className="rule-gold w-8" aria-hidden="true" />
              <h3 className="mt-4 text-3xl text-forest-900">Additional services</h3>
              <p className="mt-3 text-sm leading-relaxed text-forest-900/70">
                {additionalServicesNote}
              </p>

              <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-sand px-4 py-3.5 text-sm leading-relaxed text-forest-900/75">
                <Info className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
                {carpetNote}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:self-center">
              {additionalServices.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-forest-900/80">
                  <Plus className="size-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
