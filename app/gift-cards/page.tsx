import type { Metadata } from 'next';
import { Check, Gift, Mail, MessageCircle, Phone } from 'lucide-react';

import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { site, telHref, whatsappHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gift Cards',
  description:
    'Give the gift of a clean home. Dolane Cleaning Services gift cards are delivered digitally and can be used toward any of our cleaning services in Central Ohio.',
  alternates: { canonical: '/gift-cards' },
};

/** Suggested denominations, confirmed by the owners. */
const amounts = ['$50', '$100', '$150', '$200', 'Custom amount'];

const howItWorks = [
  'Tell us the amount and who it is for.',
  'Pay by Zelle or bank transfer.',
  'We email the gift card to you or straight to the recipient.',
  'They redeem it toward any Dolane Cleaning service.',
];

export default function GiftCardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gift Cards"
        title="Give someone their weekend back"
        intro="A new parent, someone recovering, a friend who never stops. A clean home is one of the few gifts that gives back time."
      />

      <section className="bg-cream py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl text-forest-900 sm:text-4xl">Choose an amount</h2>
            <ul className="mt-7 flex flex-wrap gap-3">
              {amounts.map((amount) => (
                <li
                  key={amount}
                  className="rounded-full border border-gold-600/30 bg-white px-6 py-3 font-display text-xl text-forest-900 shadow-soft"
                >
                  {amount}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <h2 className="text-3xl text-forest-900 sm:text-4xl">How it works</h2>
            <ol className="mt-7 space-y-4">
              {howItWorks.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest-900 font-display text-sm text-gold-300">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-base leading-relaxed text-forest-900/75">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={160} className="mt-14 rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft sm:p-9">
            <div className="flex items-start gap-4">
              <Gift className="mt-1 size-6 shrink-0 text-gold-700" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2 className="text-2xl text-forest-900">Good to know</h2>
                <ul className="mt-4 space-y-2.5">
                  {[
                    'Delivered digitally by email — no waiting on the mail.',
                    'Payment accepted by Zelle or bank transfer.',
                    'Redeemable toward any of our cleaning services.',
                    'Full terms and validity are confirmed at the time of purchase.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-forest-900/75">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest-900 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <span className="rule-gold mx-auto w-12" aria-hidden="true" />
          <h2 className="mt-6 text-3xl text-cream sm:text-4xl">Ready to send one?</h2>
          <p className="mt-4 text-base leading-relaxed text-forest-100/75">
            Gift cards are arranged personally — message us with the amount and who it is
            for, and we will take care of the rest.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Message us on WhatsApp
            </ButtonLink>
            <ButtonLink href={telHref} variant="ghost-light" size="lg" className="w-full sm:w-auto">
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </ButtonLink>
          </div>

          {site.email && (
            <a
              href={`mailto:${site.email}?subject=Gift%20Card%20Request`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-forest-100/65 transition hover:text-gold-300"
            >
              <Mail className="size-4 text-gold-500" aria-hidden="true" />
              {site.email}
            </a>
          )}
        </Reveal>
      </section>
    </>
  );
}
