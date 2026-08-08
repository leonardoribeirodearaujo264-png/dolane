import { NextResponse } from 'next/server';

import { quoteSchema, quoteFieldLabels, type QuoteInput } from '@/lib/quote-schema';
import { site } from '@/lib/site';

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

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) hits.clear();

  return recent.length > RATE_LIMIT.max;
}

function formatLead(data: QuoteInput) {
  const rows: [string, string][] = [];
  for (const [key, label] of Object.entries(quoteFieldLabels)) {
    const value = data[key as keyof QuoteInput];
    const text = Array.isArray(value) ? value.join(', ') : String(value ?? '');
    if (text.trim()) rows.push([label, text.trim()]);
  }
  return rows;
}

async function deliverByEmail(rows: [string, string][], data: QuoteInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFICATION_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const html = `
    <h2 style="font-family:Georgia,serif;color:#01271A">New quote request</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#6b7280;border-bottom:1px solid #eee">${label}</td>` +
            `<td style="color:#111;border-bottom:1px solid #eee"><strong>${value.replace(/</g, '&lt;')}</strong></td></tr>`,
        )
        .join('')}
    </table>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New quote request — ${data.fullName} (${data.city})`,
      html,
    }),
  });

  return response.ok;
}

async function deliverBySms(data: QuoteInput) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.QUOTE_SMS_TO || site.phone.e164;
  if (!sid || !token || !from) return false;

  const body =
    `New quote request\n${data.fullName}\n${data.phone}\n` +
    `${data.city} ${data.zip}\n${data.serviceType} · ${data.frequency}`;

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: to, From: from, Body: body }),
  });

  return response.ok;
}

async function deliverByWebhook(data: QuoteInput) {
  const url = process.env.QUOTE_WEBHOOK_URL;
  if (!url) return false;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'dolane-cleaning-website', receivedAt: new Date().toISOString(), ...data }),
  });

  return response.ok;
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

  // Honeypot: only a bot fills a field that is hidden from humans.
  if (data.company) {
    // Answer 200 so the bot believes it succeeded and stops retrying.
    return NextResponse.json({ ok: true, delivered: true });
  }

  // Time trap: a real person cannot complete this form in under three seconds.
  if (data.startedAt && Date.now() - data.startedAt < 3000) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const rows = formatLead(data);

  const results = await Promise.allSettled([
    deliverByEmail(rows, data),
    deliverBySms(data),
    deliverByWebhook(data),
  ]);

  const delivered = results.some((r) => r.status === 'fulfilled' && r.value === true);

  if (!delivered) {
    // Loud, so a misconfigured deployment is obvious in the Vercel logs rather
    // than silently dropping paying customers.
    console.error(
      '[quote] No delivery channel succeeded. Configure RESEND_API_KEY + ' +
        'QUOTE_NOTIFICATION_EMAIL, Twilio, or QUOTE_WEBHOOK_URL. Lead follows:',
      Object.fromEntries(rows),
    );
  }

  return NextResponse.json({ ok: true, delivered });
}
