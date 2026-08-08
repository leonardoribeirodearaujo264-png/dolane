import { ChevronDown } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { faq } from '@/content/faq';

/**
 * Native <details>/<summary> accordion — keyboard accessible and functional
 * before any JavaScript loads, with no client bundle cost.
 */
export default function FAQ() {
  return (
    <section id="faq" className="bg-sand py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions we hear often"
          intro="If yours is not here, just ask — we are happy to answer before you book."
        />

        <div className="mt-12 space-y-3 lg:mt-14">
          {faq.map((item, index) => (
            <Reveal key={item.question} delay={Math.min(index, 5) * 55}>
              <details className="group overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-soft [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                  <h3 className="font-display text-xl leading-snug text-forest-900">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className="size-5 shrink-0 text-gold-700 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="border-t border-forest-900/8 px-6 py-5 text-[0.95rem] leading-relaxed text-forest-900/72">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 text-center">
          <p className="text-base text-forest-900/70">Still have a question?</p>
          <ButtonLink href="#contact" variant="outline" className="mt-5">
            Get in touch
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
