import Image from 'next/image';
import { Check, Phone } from 'lucide-react';

import SmsButton from '@/components/ui/SmsButton';
import { LogoMark } from '@/components/ui/Logo';
import { site, telHref } from '@/lib/site';

const promises = [
  'Fully insured',
  'Family-owned & operated',
  '7+ years of experience',
  'Pet friendly',
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-forest-900">
      {/* Depth without gradients that fight the brand: two very soft radials. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(60rem 40rem at 15% -10%, rgb(31 122 92 / 0.30), transparent 60%), radial-gradient(45rem 35rem at 95% 105%, rgb(225 194 119 / 0.10), transparent 60%)',
        }}
      />
      <LogoMark
        size={520}
        className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.035] xl:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-40">
        <div>
          <p className="flex items-center gap-3">
            <span className="rule-gold w-10" aria-hidden="true" />
            <span className="eyebrow text-gold-400">
              {site.location.city}, {site.location.stateCode} &middot; {site.location.region}
            </span>
          </p>

          <h1 className="mt-6 text-[2.75rem] leading-[1.05] text-cream sm:text-6xl lg:text-[4.25rem]">
            A Cleaner Home,
            <span className="block text-gold-400">Without the Stress</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-forest-100/85">
            Reliable home cleaning tailored to your needs and schedule. Text us today for a
            fast, free quote.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SmsButton variant="gold" size="lg" pulse className="w-full sm:w-auto">
              Text Us for a Free Quote
            </SmsButton>
            <a
              href={telHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-300/45 px-8 py-4 text-[0.95rem] font-semibold text-gold-100 backdrop-blur-sm transition-all duration-300 hover:border-gold-300 hover:bg-gold-300/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:w-auto"
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              Call Now
            </a>
          </div>

          <p className="mt-4 text-sm text-forest-100/70">
            Quick response &middot; Free quote &middot; No obligation
          </p>

          <a
            href="#quote"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-forest-100/70 underline-offset-4 transition hover:text-gold-300 hover:underline"
          >
            Prefer a form? Get a free quote online
          </a>

          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-gold-500/15 pt-8 sm:grid-cols-2">
            {promises.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-forest-100/80">
                <Check className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pl-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-gold-500/25 sm:aspect-[5/6] lg:aspect-[4/5]">
            <Image
              src="/images/hero/dolane-cleaning-styled-bedroom-westerville-ohio.webp"
              alt="Master bedroom left clean and neatly styled after a house cleaning by Dolane Cleaning Services in Westerville, Ohio"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-forest-950/45 via-transparent to-transparent"
            />
          </div>

          {/* Small proof card, anchored to the image on larger screens. */}
          <div className="mx-auto -mt-8 w-[min(22rem,90%)] rounded-2xl border border-gold-500/20 bg-forest-800/90 p-5 shadow-lift backdrop-blur-sm sm:-mt-10 lg:absolute lg:-bottom-8 lg:-left-6 lg:mx-0 lg:mt-0 lg:w-64">
            <p className="font-display text-2xl leading-snug text-gold-300">
              Free estimates
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-forest-100/75">
              No obligation. Every quote is personalized to your home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
