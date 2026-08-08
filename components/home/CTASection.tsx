import { MessageCircle, Phone } from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';
import { site, telHref, whatsappHref } from '@/lib/site';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-forest-900 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(48rem 30rem at 50% 120%, rgb(225 194 119 / 0.14), transparent 62%)',
        }}
      />
      <LogoMark
        size={420}
        className="pointer-events-none absolute -right-24 -top-20 opacity-[0.045]"
      />

      <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rule-gold mx-auto w-12" aria-hidden="true" />

        <h2 className="mt-6 text-4xl leading-[1.12] text-cream sm:text-5xl">
          Ready for a cleaner, more comfortable home?
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-forest-100/80">
          Let Dolane Cleaning Services take care of the cleaning while you enjoy more time
          for what matters most.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="#quote" size="lg" className="w-full sm:w-auto">
            Get My Free Quote
          </ButtonLink>
          <ButtonLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost-light"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Message us on WhatsApp
          </ButtonLink>
        </div>

        <a
          href={telHref}
          className="mt-7 inline-flex items-center gap-2 text-sm text-forest-100/70 transition hover:text-gold-300"
        >
          <Phone className="size-4 text-gold-500" aria-hidden="true" />
          Or call and text{' '}
          <span className="font-semibold text-gold-300">{site.phone.display}</span>
        </a>
      </Reveal>
    </section>
  );
}
