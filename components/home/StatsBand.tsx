import Reveal from '@/components/ui/Reveal';
import { stats } from '@/content/trust';

/**
 * The bold confidence band under the hero — big serif figures on deep green,
 * echoing the "stats strip" pattern common to cleaning-company sites.
 *
 * Every figure comes straight from the vetted `stats` array in content/trust.ts,
 * so nothing here can drift into a claim the business has not confirmed.
 */
export default function StatsBand() {
  return (
    <section
      aria-label="Dolane Cleaning at a glance"
      className="relative overflow-hidden bg-forest-900"
    >
      {/* A whisper of gold to keep the band from reading flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <dl className="grid grid-cols-2 gap-y-10 sm:gap-y-0 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 80}
              className="text-center sm:border-l sm:border-gold-500/15 sm:first:border-l-0 sm:px-6 lg:px-8"
            >
              <dt className="font-display text-5xl leading-none text-gold-400 sm:text-6xl">
                {stat.value}
              </dt>
              <dd className="mx-auto mt-3 max-w-[10rem] text-xs uppercase leading-snug tracking-[0.16em] text-forest-100/70 sm:text-sm">
                {stat.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
