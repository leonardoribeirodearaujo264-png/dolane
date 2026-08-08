import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';
import { whyChooseUs } from '@/content/trust';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-forest-900 py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(50rem 32rem at 85% 0%, rgb(31 122 92 / 0.28), transparent 62%)',
        }}
      />
      <LogoMark
        size={460}
        className="pointer-events-none absolute -left-28 bottom-0 opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Dolane Cleaning"
          title="The reasons our clients keep us"
          intro="We are not a call center with a rotating crew. You get the same two people, the same standard, every visit."
          tone="light"
        />

        <div className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {whyChooseUs.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delay={(index % 3) * 90}>
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/8">
                <Icon className="size-5 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl text-cream">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-forest-100/70">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={120}
          className="mt-14 flex flex-col items-center gap-5 rounded-2xl border border-gold-500/18 bg-forest-950/35 px-7 py-8 text-center sm:flex-row sm:justify-between sm:text-left lg:mt-16"
        >
          <div>
            <p className="font-display text-2xl text-cream sm:text-[1.6rem]">
              Insurance certificates available on request
            </p>
            <p className="mt-1.5 text-sm text-forest-100/65">
              Commercial general liability and Ohio workers&apos; compensation coverage.
            </p>
          </div>
          <ButtonLink href="#contact" variant="ghost-light" className="shrink-0">
            Ask us about coverage
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
