import { NextResponse } from 'next/server';

import { quoteSchema } from '@/lib/quote-schema';
import { insertLead, sendLeadEmail, nullify, type LeadRecord } from '@/lib/leads';
import { offer } from '@/lib/offer';

export const runtime = 'nodejs';
/** Leads must never be served from a cache. */
export const dynamic = 'force-dynamic';

/**
 * Very small in-memory rate limiter. Good enough to stop a bot hammering the
 * endpoint from one address; it resets on cold start, which is fine because it
 * is a speed bump, not the primary defense (the honeypot and time trap are).
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: only a bot fills a field that is hidden from humans. Answer 200 so
  // the bot believes it succeeded and stops retrying.
  if (data.company) return NextResponse.json({ ok: true });

  // Time trap: a real person cannot complete this form in under three seconds.
  if (data.startedAt && Date.now() - data.startedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  // Never trust the coupon from the client — accept it only if it matches exactly.
  const submittedCoupon = (data.couponCode ?? '').trim().toUpperCase();
  const couponValid = submittedCoupon === offer.couponCode;
  if (submittedCoupon && !couponValid) {
    console.log('[quote] Ignoring unrecognized coupon code:', submittedCoupon);
  }

  // Consent is required by the schema, so it is true here. Stamp it server-side.
  const consented = data.smsEmailConsent === true;

  const record: LeadRecord = {
    type: 'quote',
    full_name: nullify(data.fullName),
    phone: nullify(data.phone),
    email: nullify(data.email),
    city: nullify(data.city),
    zip: nullify(data.zip),
    service_type: nullify(data.serviceType),
    frequency: nullify(data.frequency),
    bedrooms: nullify(data.bedrooms),
    bathrooms: nullify(data.bathrooms),
    square_feet: nullify(data.squareFeet),
    preferred_date: nullify(data.preferredDate),
    pets: nullify(data.pets),
    last_cleaned: nullify(data.lastCleaned),
    add_ons: data.addOns && data.addOns.length ? data.addOns : null,
    home_condition: nullify(data.homeCondition),
    special_requests: nullify(data.specialRequests),
    message: null,
    source: 'website-quote-form',
    coupon_code: couponValid ? offer.couponCode : null,
    sms_email_consent: consented,
    consent_at: consented ? new Date().toISOString() : null,
  };

  const saved = await insertLead(record);
  if (!saved.ok) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not submit your request just now. Please call or text us and we will help right away.',
      },
      { status: 502 },
    );
  }

  // Best-effort notification — never blocks or fails the saved lead.
  const emailed = await sendLeadEmail(record);

  return NextResponse.json({ ok: true, emailed });
}
