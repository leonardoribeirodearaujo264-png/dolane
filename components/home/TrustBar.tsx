import Reveal from '@/components/ui/Reveal';
import { trustBadges } from '@/content/trust';

export default function TrustBar() {
  return (
    <section aria-label="Why clients trust us" className="border-b border-forest-900/8 bg-sand">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {trustBadges.map(({ label, icon: Icon }, index) => (
            <Reveal as="li" key={label} delay={index * 45} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-600/30 bg-cream">
                <Icon className="size-[1.15rem] text-gold-700" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium leading-snug text-forest-900/85">
                {label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
