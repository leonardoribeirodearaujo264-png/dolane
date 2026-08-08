import { LogoMark } from '@/components/ui/Logo';

/** Shared banner for the secondary pages (gift cards, legal). */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-900 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(48rem 28rem at 20% -20%, rgb(31 122 92 / 0.28), transparent 62%)',
        }}
      />
      <LogoMark
        size={380}
        className="pointer-events-none absolute -right-16 -bottom-24 opacity-[0.045]"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="rule-gold w-8" aria-hidden="true" />
          <span className="eyebrow text-gold-400">{eyebrow}</span>
        </div>
        <h1 className="mt-5 text-4xl leading-[1.1] text-cream sm:text-5xl">{title}</h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-forest-100/80 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
