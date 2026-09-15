'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, Check, Loader2, Phone } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import SmsButton from '@/components/ui/SmsButton';
import { cn } from '@/lib/cn';
import { site, telHref } from '@/lib/site';
import { trackLead } from '@/lib/analytics';
import { quoteServiceOptions } from '@/content/services';
import { quoteSchema } from '@/lib/quote-schema';

type Errors = Record<string, string>;

const fieldBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-forest-900 shadow-sm transition-colors placeholder:text-forest-900/35 focus:outline-none focus:ring-2 focus:ring-gold-500/40';

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-forest-900/85">
        {label}
        {required && (
          <span className="ml-0.5 text-gold-700" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function QuoteForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<string>(quoteServiceOptions[0]);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Service cards link through as /#quote?service=Deep+Cleaning — honor that so
  // the visitor does not have to re-pick what they just clicked.
  useEffect(() => {
    const raw = window.location.hash.split('?')[1] ?? window.location.search.slice(1);
    const requested = new URLSearchParams(raw).get('service');
    if (requested && (quoteServiceOptions as readonly string[]).includes(requested)) {
      setServiceType(requested);
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get('fullName') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? ''),
      city: String(formData.get('city') ?? ''),
      zip: String(formData.get('zip') ?? ''),
      serviceType: String(formData.get('serviceType') ?? ''),
      frequency: String(formData.get('frequency') ?? ''),
      bedrooms: String(formData.get('bedrooms') ?? ''),
      bathrooms: String(formData.get('bathrooms') ?? ''),
      squareFeet: String(formData.get('squareFeet') ?? ''),
      preferredDate: String(formData.get('preferredDate') ?? ''),
      pets: String(formData.get('pets') ?? ''),
      lastCleaned: String(formData.get('lastCleaned') ?? ''),
      addOns: formData.getAll('addOns').map(String),
      homeCondition: String(formData.get('homeCondition') ?? ''),
      specialRequests: String(formData.get('specialRequests') ?? ''),
      company: String(formData.get('company') ?? ''),
      startedAt: startedAt.current,
    };

    // Validate in the browser first so mistakes are caught without a round trip.
    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        next[key] ??= issue.message;
      }
      setErrors(next);
      setStatus('idle');
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
        ?.focus();
      return;
    }

    setErrors({});
    setStatus('sending');
    setServerMessage(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(result.fieldErrors ?? {});
        setServerMessage(result.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('sent');
      // Meta conversion: a real lead was captured. Fires once, only here.
      trackLead({ content_name: serviceType, content_category: 'Quote Request' });
    } catch {
      setServerMessage(
        'We could not send your request just now. Please call or text us instead.',
      );
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-forest-900/10 bg-white p-8 text-center shadow-lift sm:p-12">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-900">
          <Check className="size-7 text-gold-400" aria-hidden="true" />
        </span>

        <h3 className="mt-6 text-3xl text-forest-900">Thank you — we have your request</h3>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-forest-900/70">
          Letici or George will review the details and get back to you personally with a
          personalized quote. We usually respond within one business day.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SmsButton variant="gold" size="md">Text Us Now for a Faster Response</SmsButton>
          <a
            href={telHref}
            className="inline-flex items-center gap-2 rounded-full border border-forest-900/20 px-6 py-3 text-sm font-semibold text-forest-900 transition hover:border-forest-900/50"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call {site.phone.display}
          </a>
        </div>

        <p className="mt-6 text-xs text-forest-900/50">
          Need it sooner? Text or call and we will get straight back to you.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-forest-900/10 bg-white p-6 shadow-lift sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* A short form — name, phone and ZIP are all we need to start. */}
        <Field label="Full name" htmlFor={id('fullName')} error={errors.fullName} required>
          <input
            id={id('fullName')}
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jane Miller"
            aria-invalid={Boolean(errors.fullName)}
            className={cn(fieldBase, errors.fullName ? 'border-red-400' : 'border-forest-900/15')}
          />
        </Field>

        <Field label="Phone number" htmlFor={id('phone')} error={errors.phone} required>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(614) 555-0123"
            aria-invalid={Boolean(errors.phone)}
            className={cn(fieldBase, errors.phone ? 'border-red-400' : 'border-forest-900/15')}
          />
        </Field>

        <Field label="ZIP code" htmlFor={id('zip')} error={errors.zip} required>
          <input
            id={id('zip')}
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="43081"
            aria-invalid={Boolean(errors.zip)}
            className={cn(fieldBase, errors.zip ? 'border-red-400' : 'border-forest-900/15')}
          />
        </Field>

        <Field label="Type of cleaning" htmlFor={id('serviceType')} error={errors.serviceType}>
          <select
            id={id('serviceType')}
            name="serviceType"
            value={serviceType}
            onChange={(event) => setServiceType(event.target.value)}
            className={cn(fieldBase, 'border-forest-900/15')}
          >
            {quoteServiceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Bedrooms" htmlFor={id('bedrooms')}>
          <input
            id={id('bedrooms')}
            name="bedrooms"
            type="number"
            min={0}
            max={20}
            inputMode="numeric"
            placeholder="3"
            className={cn(fieldBase, 'border-forest-900/15')}
          />
        </Field>

        <Field label="Bathrooms" htmlFor={id('bathrooms')}>
          <input
            id={id('bathrooms')}
            name="bathrooms"
            type="number"
            min={0}
            max={20}
            step="0.5"
            inputMode="decimal"
            placeholder="2"
            className={cn(fieldBase, 'border-forest-900/15')}
          />
        </Field>

        <Field
          label="Preferred date or timeframe"
          htmlFor={id('preferredDate')}
          className="sm:col-span-2"
        >
          <input
            id={id('preferredDate')}
            name="preferredDate"
            type="date"
            className={cn(fieldBase, 'border-forest-900/15')}
          />
        </Field>

        <Field
          label="Anything else we should know?"
          htmlFor={id('specialRequests')}
          className="sm:col-span-2"
        >
          <textarea
            id={id('specialRequests')}
            name="specialRequests"
            rows={3}
            placeholder="Home size, pets, access instructions, areas to focus on — anything helps (optional)."
            className={cn(fieldBase, 'resize-y border-forest-900/15')}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={id('company')}>Company</label>
        <input id={id('company')} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && serverMessage && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {serverMessage}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
          {status === 'sending' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Get My Free Quote'
          )}
        </Button>

        <p className="text-xs leading-relaxed text-forest-900/55">
          Free estimates &middot; No obligation.
          <br className="hidden sm:block" /> We never share your information.
        </p>
      </div>
    </form>
  );
}
