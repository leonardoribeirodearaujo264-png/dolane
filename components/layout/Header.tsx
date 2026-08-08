'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, ShieldCheck } from 'lucide-react';

import Logo from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/cn';
import { primaryNav, site, telHref } from '@/lib/site';
import { hasReviews } from '@/content/reviews';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only the home page opens on the deep-green hero, so only there can the
  // header start out transparent.
  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled || !overHero;

  const nav = hasReviews
    ? [...primaryNav.slice(0, 3), { label: 'Reviews', href: '/#reviews' }, ...primaryNav.slice(3)]
    : primaryNav;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500',
          solid
            ? 'bg-forest-900/95 shadow-[0_1px_0_0_rgb(225_194_119_/_0.14),0_10px_30px_-12px_rgb(1_15_10_/_0.5)] backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        {/* Utility strip — collapses away as soon as the page moves. */}
        <div
          className={cn(
            'overflow-hidden border-b border-gold-500/10 transition-all duration-500',
            solid ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
            <p className="flex items-center gap-2 text-xs text-gold-200/80">
              <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
              <span>
                Family-owned &amp; fully insured &middot; Serving {site.location.region}
              </span>
            </p>
            <p className="hidden text-xs text-gold-200/70 sm:block">
              English &middot; Português &middot; Español
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* The official lockup stacks the mark above the wordmark, so it needs
              real height to stay legible — the header is sized around it. */}
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo height={64} priority className="h-11 sm:h-14 lg:h-16" />
          </Link>

          <nav className="hidden lg:block" aria-label="Main">
            <ul className="flex items-center gap-1">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative rounded-full px-3.5 py-2 text-sm font-medium text-cream/85 transition-colors after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-300 hover:text-gold-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref}
              className="hidden items-center gap-2 rounded-full border border-gold-500/25 px-4 py-2.5 text-sm font-semibold text-gold-200 transition hover:border-gold-500/60 hover:bg-gold-500/10 md:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden xl:inline">{site.phone.display}</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* Kept visible at every width — it is the page's main conversion
                action. The label shortens rather than disappearing. */}
            <ButtonLink href="/#quote" className="px-4 sm:px-6">
              <span className="sm:hidden">Free Quote</span>
              <span className="hidden sm:inline">Get a Free Quote</span>
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="rounded-full border border-gold-500/25 p-2.5 text-gold-200 transition hover:bg-gold-500/10 lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
