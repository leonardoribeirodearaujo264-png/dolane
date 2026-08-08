import type { Metadata } from 'next';
import Link from 'next/link';

import LegalLayout from '@/components/legal/LegalLayout';
import { site, telHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `How ${site.name} uses cookies and similar technologies on this website.`,
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      intro="What cookies this website uses, what they do, and how to control them."
    >
      <p>
        This policy explains how {site.legalName}, doing business as {site.name}, uses
        cookies and similar technologies on this website.
      </p>

      <h2>What cookies are</h2>
      <p>
        Cookies are small text files a website stores in your browser. They let a site
        remember things between page loads, and they can also be used to measure how a site
        is used.
      </p>

      <h2>How we use them</h2>
      <p>
        This website is deliberately light on tracking. We use only what is needed for the
        site to work and, where enabled, basic aggregate analytics:
      </p>
      <ul>
        <li>
          <strong>Strictly necessary.</strong> Set by our hosting provider to serve pages
          reliably and to protect the site from abuse. These cannot be switched off without
          breaking the site.
        </li>
        <li>
          <strong>Analytics (only if enabled).</strong> If we turn on website analytics, it
          is used to understand which pages are visited and how people find us, in aggregate.
          We do not use it to identify you personally.
        </li>
      </ul>
      <p>
        We do not use advertising cookies, and we do not allow third parties to track you
        across other websites from here.
      </p>

      <h2>Controlling cookies</h2>
      <p>
        You can delete or block cookies through your browser settings. Every major browser
        &mdash; Chrome, Safari, Firefox and Edge &mdash; lets you view stored cookies and
        clear them. Blocking strictly necessary cookies may stop parts of the site working.
      </p>
      <p>
        Most browsers also offer a &ldquo;Do Not Track&rdquo; setting. Because there is no
        agreed standard for how sites should respond to it, we do not rely on it; instead we
        limit what we collect in the first place.
      </p>

      <h2>Changes</h2>
      <p>
        If we add or remove technologies that use cookies, we will update this page. The date
        at the top shows when it was last revised.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies or your privacy? Call or text{' '}
        <a href={telHref}>{site.phone.display}</a>
        {site.email ? (
          <>
            {' '}
            or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </>
        ) : null}
        . See also our <Link href="/privacy-policy">Privacy Policy</Link> and{' '}
        <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>
    </LegalLayout>
  );
}
