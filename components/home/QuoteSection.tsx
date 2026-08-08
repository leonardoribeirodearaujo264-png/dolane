import { Clock, ShieldCheck, Sparkles } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import QuoteForm from '@/components/forms/QuoteForm';

const assurances = [
  { icon: Clock, text: 'Most quotes answered within one business day' },
  { icon: ShieldCheck, text: 'Fully insured, family-owned and operated' },
  { icon: Sparkles, text: 'Priced to your home — never a generic package' },
];

export default function QuoteSection() {
  return (
    <section id="quote" className="scroll-mt-24 bg-sand py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Free Quote"
          title="Request your free quote"
          intro="Every home is different, so every quote is too. Tell us about yours and we will come back with a personalized price — no obligation."
        />

        <Reveal delay={80} className="mt-9">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {assurances.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-sm text-forest-900/70">
                <Icon className="size-4 shrink-0 text-gold-700" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="mt-10">
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
