import type { Metadata } from 'next';
import Link from 'next/link';

import LegalLayout from '@/components/legal/LegalLayout';
import { site, telHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `The terms that apply to the use of the ${site.name} website and to the cleaning services we provide in Central Ohio.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      intro={`The terms that apply when you use this website or book services with ${site.name}.`}
    >
      <p>
        These terms govern your use of this website and the cleaning services provided by{' '}
        {site.legalName}, doing business as {site.name}, an {site.registeredState} limited
        liability company. By using this site or booking a service, you accept these terms.
      </p>

      <h2>Quotes and pricing</h2>
      <p>
        We do not publish fixed prices. Every quote is personalized based on the size of the
        property, its current condition, the type of cleaning, the frequency and any
        additional services requested. Estimates are free and carry no obligation.
      </p>
      <p>
        A quote is an estimate based on the information you give us. If the property differs
        materially from what was described &mdash; for example, it is significantly larger or
        in a substantially different condition &mdash; we will discuss the difference with
        you before continuing, and the price may be adjusted.
      </p>

      <h2>Scope of services</h2>
      <p>
        The work included in a service is what is set out in your quote. Some detailed or
        additional services are not part of a standard cleaning and may carry an additional
        fee. Where possible, please request additional services in advance.
      </p>
      <p>
        We do not offer professional carpet shampooing. Carpet vacuuming is included as part
        of the cleaning where applicable.
      </p>
      <p>
        We may decline or stop a service where conditions are unsafe or unsanitary, where
        there is a biohazard, pest infestation, or where the property presents a risk to our
        team. In those cases we will explain the reason and discuss the options with you.
      </p>

      <h2>Access to the property</h2>
      <p>
        You do not need to be home during the cleaning. If you are not, you are responsible
        for providing safe and lawful access and for letting us know about alarms, pets, or
        areas you would like us to avoid. We treat all access information as confidential.
      </p>

      <h2>Scheduling</h2>
      <p>
        Appointment times are estimates. Traffic, weather and the length of the job before
        yours can affect arrival times, and we will let you know if we are running late.
      </p>
      <p>
        Cancellation and rescheduling terms are confirmed with you when your appointment is
        booked.
      </p>

      <h2>Payment</h2>
      <p>
        We currently accept {site.paymentMethods.join(', ')}. Payment is due as agreed at the
        time of booking unless we have agreed otherwise in writing.
      </p>

      <h2>Your property</h2>
      <p>
        We take great care in your home. Please secure or point out fragile, valuable,
        sentimental or irreplaceable items in advance so we can avoid handling them.
      </p>
      <p>
        We carry commercial general liability insurance and {site.registeredState}{' '}
        workers&rsquo; compensation coverage. A certificate of insurance is available to
        clients on request. If you believe something was damaged during a service, please
        tell us within 48 hours of the visit so we can look into it promptly.
      </p>

      <h2>Concerns about a cleaning</h2>
      <p>
        If something was not done to your satisfaction, contact us within 48 hours of the
        service and we will work with you to put it right.
      </p>

      <h2>Gift cards</h2>
      <p>
        Gift cards are issued digitally. The amount, validity and any conditions are confirmed
        at the time of purchase. Gift cards are not redeemable for cash.
      </p>

      <h2>Website content</h2>
      <p>
        The content of this website, including the {site.shortName} name, logo, text and
        photographs, belongs to {site.legalName} and may not be reproduced without our
        permission. All photographs of completed work were taken by us on our own jobs.
      </p>
      <p>
        The website is provided as-is. We aim to keep the information accurate and current
        but do not warrant that it is complete or error-free at all times.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by {site.registeredState} law, our liability arising
        out of a service is limited to the amount paid for that service. We are not liable
        for indirect or consequential losses. Nothing in these terms limits liability that
        cannot be limited by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of {site.registeredState}, and any
        dispute will be handled in the courts of that state.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top of this page shows when they were last
        revised, and the version in force at the time of your booking applies to that booking.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Call or text{' '}
        <a href={telHref}>{site.phone.display}</a>
        {site.email ? (
          <>
            {' '}
            or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </>
        ) : null}
        . See also our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalLayout>
  );
}
