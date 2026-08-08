import { ButtonLink } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';
import { site, telHref } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-forest-900 px-4 py-32">
      <LogoMark
        size={420}
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.045]"
      />

      <div className="relative mx-auto max-w-xl text-center">
        <span className="rule-gold mx-auto w-12" aria-hidden="true" />
        <p className="mt-6 font-display text-6xl text-gold-400">404</p>
        <h1 className="mt-4 text-3xl text-cream sm:text-4xl">This page could not be found</h1>
        <p className="mt-4 text-base leading-relaxed text-forest-100/75">
          The link may be out of date. Let&apos;s get you back to something useful.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" className="w-full sm:w-auto">
            Back to home
          </ButtonLink>
          <ButtonLink href="/#quote" variant="ghost-light" size="lg" className="w-full sm:w-auto">
            Request a free quote
          </ButtonLink>
        </div>

        <a
          href={telHref}
          className="mt-7 inline-block text-sm text-forest-100/60 transition hover:text-gold-300"
        >
          Or call us at <span className="font-semibold text-gold-300">{site.phone.display}</span>
        </a>
      </div>
    </section>
  );
}
