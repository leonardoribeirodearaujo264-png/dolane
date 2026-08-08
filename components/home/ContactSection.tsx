import { Clock, Globe, Mail, MapPin, MessageCircle, Phone, Wallet } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { serviceArea, site, smsHref, telHref, whatsappHref } from '@/lib/site';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          intro="Call, text or message us — in English, Portuguese or Spanish. We are happy to answer questions before you commit to anything."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          <Reveal className="rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft">
            <span className="flex size-11 items-center justify-center rounded-full bg-forest-900">
              <Phone className="size-5 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl text-forest-900">Phone &amp; text</h3>
            <a
              href={telHref}
              className="mt-2.5 block text-lg font-semibold text-forest-900 transition hover:text-gold-700"
            >
              {site.phone.display}
            </a>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a href={smsHref} className="text-forest-900/60 underline-offset-4 hover:underline">
                Send a text
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-forest-900/60 underline-offset-4 hover:underline"
              >
                <MessageCircle className="size-3.5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={90}
            className="rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-forest-900">
              <MapPin className="size-5 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl text-forest-900">Service area</h3>
            <p className="mt-2.5 text-base font-semibold text-forest-900">
              {site.location.city}, {site.location.stateCode}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-forest-900/65">
              Serving Columbus and {serviceArea.length - 2}+ surrounding communities across{' '}
              {site.location.region}.
            </p>
            <a
              href="#service-area"
              className="mt-3 inline-block text-sm text-forest-900/60 underline-offset-4 hover:underline"
            >
              See all cities
            </a>
          </Reveal>

          {/* Email is only rendered once a real business mailbox exists. */}
          {site.email ? (
            <Reveal
              delay={180}
              className="rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-forest-900">
                <Mail className="size-5 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl text-forest-900">Email</h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-2.5 block break-all text-base font-semibold text-forest-900 transition hover:text-gold-700"
              >
                {site.email}
              </a>
            </Reveal>
          ) : (
            <Reveal
              delay={180}
              className="rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-forest-900">
                <Globe className="size-5 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl text-forest-900">Languages</h3>
              <p className="mt-2.5 text-base font-semibold text-forest-900">
                {site.languages.join(' · ')}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-forest-900/65">
                Reach out in whichever language is most comfortable for you.
              </p>
            </Reveal>
          )}

          <Reveal
            delay={240}
            className="rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-forest-900">
              <Clock className="size-5 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl text-forest-900">Availability</h3>
            {site.businessHours ? (
              <dl className="mt-3 space-y-1.5 text-sm">
                {site.businessHours.map((entry) => (
                  <div key={entry.days} className="flex justify-between gap-4">
                    <dt className="text-forest-900/60">{entry.days}</dt>
                    <dd className="font-medium text-forest-900">{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-2.5 text-sm leading-relaxed text-forest-900/65">
                Appointments are scheduled around your routine. Saturday appointments may be
                available depending on our schedule — contact us to check availability.
              </p>
            )}
          </Reveal>

          <Reveal
            delay={300}
            className="rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-forest-900">
              <Wallet className="size-5 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl text-forest-900">Payment</h3>
            <p className="mt-2.5 text-base font-semibold text-forest-900">
              {site.paymentMethods.join(' · ')}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-forest-900/65">
              Pricing is always personalized to your home — never a fixed package.
            </p>
          </Reveal>

          <Reveal
            delay={360}
            className="flex flex-col justify-center rounded-2xl bg-forest-900 p-7 shadow-lift"
          >
            <h3 className="text-2xl text-cream">Prefer a written quote?</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-forest-100/70">
              Fill in the quote form and we will come back with a personalized price.
            </p>
            <a
              href="#quote"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-900 transition hover:bg-gold-400"
            >
              Request a Free Quote
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
