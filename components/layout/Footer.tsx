import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

import Logo from '@/components/ui/Logo';
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import { fullNav, serviceArea, site, telHref } from '@/lib/site';
import { services } from '@/content/services';

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

export default function Footer() {
  // Rendered at request time, so this never goes stale.
  const year = new Date().getFullYear();

  const socials = [
    { href: site.social.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  ].filter((item): item is { href: string; label: string; Icon: typeof FacebookIcon } =>
    Boolean(item.href),
  );

  return (
    <footer className="bg-forest-950 text-forest-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label={`${site.name} — home`}>
              <Logo height={52} />
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-forest-100/60">
              {site.secondaryTagline} Family-owned, fully insured cleaning services across{' '}
              {site.location.region}.
            </p>

            <p className="mt-5 text-xs text-forest-100/40">
              {site.languages.join(' · ')}
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${label}`}
                    className="flex size-10 items-center justify-center rounded-full border border-gold-500/20 text-gold-300 transition hover:bg-gold-500/10"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-gold-500">Explore</h2>
            <ul className="mt-5 space-y-2.5">
              {fullNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-forest-100/65 transition hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-gold-500">Services</h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/#quote?service=${encodeURIComponent(service.quoteValue)}`}
                    className="text-sm text-forest-100/65 transition hover:text-gold-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold-500">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={telHref}
                  className="flex items-start gap-2.5 text-forest-100/65 transition hover:text-gold-300"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>

              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-2.5 break-all text-forest-100/65 transition hover:text-gold-300"
                  >
                    <Mail className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
              )}

              <li className="flex items-start gap-2.5 text-forest-100/65">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                <span>
                  {site.location.city}, {site.location.stateCode}
                  <br />
                  <span className="text-forest-100/45">
                    Serving Columbus &amp; {site.location.region}
                  </span>
                </span>
              </li>
            </ul>

            <Link
              href="/#quote"
              className="mt-6 inline-flex rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:bg-gold-400"
            >
              Request a Free Quote
            </Link>
          </div>
        </div>

        {/* Local SEO: the full service area, as real crawlable text. */}
        <div className="mt-14 border-t border-gold-500/10 pt-8">
          <h2 className="eyebrow text-gold-500/70">Areas We Serve</h2>
          <p className="mt-3 text-xs leading-relaxed text-forest-100/40">
            {serviceArea.join(' · ')}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-gold-500/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-forest-100/45">
            &copy; {year} {site.name}. All rights reserved.
            <span className="mt-1 block text-forest-100/30">
              {site.legalName} &middot; {site.registeredState} registered LLC
            </span>
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-forest-100/45 transition hover:text-gold-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
