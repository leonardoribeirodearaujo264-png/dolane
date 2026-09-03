import { NextResponse } from 'next/server';

import { contactSchema } from '@/lib/contact-schema';
import { insertLead, sendLeadEmail, nullify, type LeadRecord } from '@/lib/leads';

export const runtime = 'nodejs';
/** Messages must never be served from a cache. */
export const dynamic = 'force-dynamic';

/**
 * Small in-memory rate limiter — a speed bump, not the primary defense (the
 * honeypot and time trap are). Resets on cold start, which is fine.
 */
const RATE_LIMIT = { max: 6, windowMs: 10 * 60 * 1000 };
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
      { ok: false, message: 'Too many messages. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
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

  // Honeypot: answer 200 so the bot believes it succeeded and stops retrying.
  if (data.company) return NextResponse.json({ ok: true });

  // Time trap: a real person cannot fill this in under two seconds.
  if (data.startedAt && Date.now() - data.startedAt < 2000) {
    return NextResponse.json({ ok: true });
  }

  // The single "contact" field is a phone number or an email — route it to the
  // matching column so the lead is still searchable by either.
  const looksLikeEmail = /\S+@\S+\.\S+/.test(data.contact);

  const record: LeadRecord = {
    type: 'contact',
    full_name: nullify(data.name),
    phone: looksLikeEmail ? null : nullify(data.contact),
    email: looksLikeEmail ? nullify(data.contact) : null,
    city: null,
    zip: null,
    service_type: null,
    frequency: null,
    bedrooms: null,
    bathrooms: null,
    square_feet: null,
    preferred_date: null,
    pets: null,
    last_cleaned: null,
    add_ons: null,
    home_condition: null,
    special_requests: null,
    message: nullify(data.message),
    source: 'website-chat-widget',
  };

  const saved = await insertLead(record);
  if (!saved.ok) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not send that just now. Please call or text us and we will help right away.',
      },
      { status: 502 },
    );
  }

  // Best-effort notification — never blocks or fails the saved lead.
  const emailed = await sendLeadEmail(record);

  return NextResponse.json({ ok: true, emailed });
}
