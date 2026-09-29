'use client';

import { Check } from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import { offer, scarcityHeadline } from '@/lib/offer';
import { useCoupon } from '@/components/offer/CouponProvider';

function scrollToQuote() {
  const target = document.getElementById('quote');
  if (!target) return;
  let reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    reduce = false;
  }
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

/** A cut-out circle that gives the card its torn-ticket edge. Sits in the section colour. */
function Notch({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 size-6 rounded-full bg-cream ${className}`}
    />
  );
}

/**
 * The new-client discount as an actual coupon ticket — torn edges, a dashed
 * perforation and a barcode stub — in the brand's forest/gold, not a generic
 * banner. Claiming stores the coupon (it appears applied inside the quote form)
 * and drops the visitor into the form.
 */
export default function OfferBlock() {
  const { applied, claim } = useCoupon();

  return (
    <section id="offer" aria-labelledby="offer-heading" className="bg-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <Reveal className="relative">
          {/* Torn-ticket notches on the outer edges. */}
          <Notch className="left-[-12px] top-1/2 -translate-y-1/2" />
          <Notch className="right-[-12px] top-1/2 -translate-y-1/2" />

          <div className="overflow-hidden rounded-[1.5rem] bg-forest-900 shadow-lift ring-1 ring-gold-400/25">
            <div className="grid sm:grid-cols-[1fr_auto]">
              {/* Main coupon body */}
              <div className="p-6 sm:p-7">
                <p className="eyebrow text-xs text-gold-400">New-client offer</p>

                <p className="mt-2 flex items-start gap-1 font-display leading-none text-gold-400">
                  <span className="text-5xl">{offer.discountPercent}%</span>
                  <span className="mt-0.5 text-2xl font-semibold">OFF</span>
                </p>
                <h2 id="offer-heading" className="mt-1 font-display text-xl text-cream sm:text-2xl">
                  your first cleaning
                </h2>

                <p className="mt-2.5 max-w-sm text-xs leading-relaxed text-forest-100/75">
                  {scarcityHeadline()}. {offer.scarcityNote}
                </p>

                <div className="mt-4">
                  {applied ? (
                    <div className="flex flex-col items-start gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-2 text-sm font-semibold text-gold-200 ring-1 ring-gold-400/40">
                        <Check className="size-4" aria-hidden="true" />
                        {offer.claimedTitle}
                      </span>
                      <button
                        type="button"
                        onClick={scrollToQuote}
                        className="text-sm font-semibold text-gold-300 underline-offset-4 hover:underline"
                      >
                        Go to your free quote →
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        claim();
                        scrollToQuote();
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-forest-900 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:w-auto"
                    >
                      {offer.claimCta}
                    </button>
                  )}
                </div>

                <p className="mt-4 max-w-sm text-[0.68rem] leading-relaxed text-forest-100/45">
                  {offer.terms}
                </p>
              </div>

              {/* Perforated barcode stub */}
              <div className="relative hidden w-28 flex-col items-center justify-center gap-3 border-l border-dashed border-gold-400/40 px-5 sm:flex">
                <Notch className="left-[-12px] top-[-12px]" />
                <Notch className="bottom-[-12px] left-[-12px]" />
                <div
                  aria-hidden="true"
                  className="h-20 w-12"
                  style={{
                    background:
                      'repeating-linear-gradient(90deg, #ecd396 0, #ecd396 2px, transparent 2px, transparent 5px)',
                  }}
                />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-300">
                  {offer.couponCode}
                </span>
              </div>
            </div>
          </div>

          {/* Announce the claim to screen readers without moving focus abruptly. */}
          <p aria-live="polite" className="sr-only">
            {applied ? `${offer.claimedTitle}. ${offer.chipText}.` : ''}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
