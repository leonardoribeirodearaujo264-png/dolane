import type { Metadata } from 'next';
import Link from 'next/link';

import LegalLayout from '@/components/legal/LegalLayout';
import { site, telHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects the personal information you share through this website.`,
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`How ${site.legalName}, doing business as ${site.name}, handles the information you share with us.`}
    >
      <p>
        {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), doing
        business as {site.name}, operates this website. This policy explains what personal
        information we collect, why we collect it, and the choices you have. By using this
        site or requesting a quote, you agree to the practices described here.
      </p>

      <h2>Information we collect</h2>
      <p>We only collect information you choose to give us, plus limited technical data:</p>
      <ul>
        <li>
          <strong>Information you provide.</strong> When you submit the quote form, contact
          us, or message us, we collect your name, phone number, email address, city and ZIP
          code, and the details you share about your property and the service you want.
        </li>
        <li>
          <strong>Technical information.</strong> Our hosting provider records standard
          server data such as IP address, browser type and the pages requested. This is used
          for security, abuse prevention and basic reliability monitoring.
        </li>
      </ul>
      <p>
        We do not knowingly collect information from children under 13, and we do not ask for
        sensitive categories of personal information.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To prepare and send you a quote and to schedule services.</li>
        <li>To contact you about your request, your appointment or your account.</li>
        <li>To answer your questions and provide customer support.</li>
        <li>To keep records required for running our business, including insurance.</li>
        <li>To protect the website against spam, fraud and abuse.</li>
      </ul>
      <p>
        We do not sell, rent or trade your personal information, and we do not use it for
        advertising by third parties.
      </p>

      <h2>Text messages and calls</h2>
      <p>
        If you give us your phone number, you agree that we may contact you by phone or text
        about your quote and your service. Message and data rates may apply. You can ask us
        to stop contacting you by text at any time by replying to let us know or by calling{' '}
        <a href={telHref}>{site.phone.display}</a>.
      </p>

      <h2>Who we share information with</h2>
      <p>
        We share personal information only where it is necessary to run the business, and
        only with providers who are bound to protect it:
      </p>
      <ul>
        <li>Our website hosting and infrastructure provider.</li>
        <li>The email and messaging services we use to send and receive your request.</li>
        <li>Our insurance provider or professional advisors, where required.</li>
        <li>Law enforcement or regulators, where we are legally required to do so.</li>
      </ul>

      <h2>In your home</h2>
      <p>
        Because we work inside our clients&rsquo; homes and businesses, we treat what we see
        there as confidential. We do not photograph identifiable people, personal documents
        or valuables. Photographs of completed work are only published where they show the
        space itself, and we will remove any image at a client&rsquo;s request.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep quote requests and client records for as long as needed to provide the
        service and to meet our legal, tax and insurance obligations. When information is no
        longer needed, we delete it or render it anonymous.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect your information,
        including encrypted connections to this website. No method of transmission or storage
        is completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>You can ask us what personal information we hold about you.</li>
        <li>You can ask us to correct information that is inaccurate.</li>
        <li>You can ask us to delete your information, subject to our legal obligations.</li>
        <li>You can ask us to stop contacting you at any time.</li>
      </ul>
      <p>
        To make any of these requests, contact us at{' '}
        <a href={telHref}>{site.phone.display}</a>
        {site.email ? (
          <>
            {' '}
            or <a href={`mailto:${site.email}`}>{site.email}</a>
          </>
        ) : null}
        .
      </p>

      <h2>Cookies</h2>
      <p>
        Information about the cookies this site uses is set out in our{' '}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this page shows
        when it was last revised, and the current version always applies.
      </p>

      <h2>Contact us</h2>
      <p>
        {site.legalName} d/b/a {site.name}
        <br />
        {site.location.city}, {site.location.state}, {site.location.country}
        <br />
        <a href={telHref}>{site.phone.display}</a>
        {site.email ? (
          <>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </>
        ) : null}
      </p>
    </LegalLayout>
  );
}
