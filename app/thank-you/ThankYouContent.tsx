'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BadgePercent, Check, Home, Mail, Phone, Smartphone } from 'lucide-react';

import SmsButton from '@/components/ui/SmsButton';
import { site, telHref } from '@/lib/site';
import { offer, scarcityHeadline } from '@/lib/offer';
import { trackFormLeadConversion } from '@/lib/analytics';

export default function ThankYouContent() {
  const params = useSearchParams();
  const firstName = (params.get('name') ?? '').trim();
  const couponApplied = params.get('coupon') === '1';
  const token = (params.get('t') ?? '').trim();

  // Fire the quote conversion once. Only when we arrived from a real submission
  // (a token is present), and only once per submission even across reloads.
  useEffect(() => {
    if (!token) return;
    const key = `ty_fired_${token}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
    } catch {
      /* storage blocked — fall through, best effort */
    }
    trackFormLeadConversion();
    try {
      window.sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  }, [token]);

  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-forest-900/10 bg-white p-8 text-center shadow-lift sm:p-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-900">
            <Check className="size-7 text-gold-400" aria-hidden="true" />
          </span>

          <h1 className="mt-6 font-display text-4xl leading-tight text-forest-900 sm:text-5xl">
            Thank you{firstName ? `, ${firstName}` : ''}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-forest-900/75">
            We have your request. Letici or George will put together a personalized quote and
            send it to you by email and text message. Most quotes are answered within one
            business day.
          </p>

          <div className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 text-left text-sm text-forest-900/70">
            <p className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
              Keep an eye on your email — including the spam or promotions folder, just in case.
            </p>
            <p className="flex items-start gap-2.5">
              <Smartphone className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
              Watch your phone for a text from us at {site.phone.display}.
            </p>
          </div>

          {couponApplied && (
            <div className="mx-auto mt-7 flex max-w-md items-start gap-3 rounded-xl border border-gold-500/40 bg-gold-100/50 px-4 py-3.5 text-left">
              <BadgePercent className="mt-0.5 size-5 shrink-0 text-gold-700" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-forest-900/80">
                Your <strong className="text-forest-900">{offer.couponCode}</strong> —{' '}
                {offer.discountPercent}% off your first cleaning is reserved for you. We&apos;ll
                apply it to your quote.
              </p>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-forest-900/55">
            {scarcityHeadline()}. {offer.scarcityNote}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SmsButton variant="gold" size="md">
              Text us now
            </SmsButton>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full border border-forest-900/20 px-6 py-3 text-sm font-semibold text-forest-900 transition hover:border-forest-900/50"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phone.display}
            </a>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-forest-900/55 underline-offset-4 transition hover:text-forest-900 hover:underline"
          >
            <Home className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
