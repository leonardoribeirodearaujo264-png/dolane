import 'server-only';

import { supabase } from '@/lib/supabase';
import { site } from '@/lib/site';

/**
 * One row in the public.leads table. Snake_case to match Postgres columns.
 * A single table holds both quote requests and chat messages; `type` tells
 * them apart.
 */
export type LeadRecord = {
  type: 'quote' | 'contact';
  full_name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  zip: string | null;
  service_type: string | null;
  frequency: string | null;
  bedrooms: string | null;
  bathrooms: string | null;
  square_feet: string | null;
  preferred_date: string | null;
  pets: string | null;
  last_cleaned: string | null;
  add_ons: string[] | null;
  home_condition: string | null;
  special_requests: string | null;
  message: string | null;
  source: string;
};

/** Trim, and treat an empty string as "not provided" so the DB stores null. */
export function nullify(value: unknown): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text ? text : null;
}

/**
 * Persist a lead to Supabase. This is the primary store — if it fails, the
 * caller should report the failure to the visitor so nothing is lost silently.
 */
export async function insertLead(
  record: LeadRecord,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured.' };
  }

  const { error } = await supabase.from('leads').insert(record);

  if (error) {
    console.error('[leads] Supabase insert failed:', error.message, error.details ?? '');
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

/** The fields, in the order the owners asked to see them in the email. */
const emailRows = (r: LeadRecord): [string, string][] => {
  const rows: [string, string | null][] = [
    ['Name', r.full_name],
    ['Phone', r.phone],
    ['Email', r.email],
    ['City', r.city],
    ['ZIP', r.zip],
    ['Type of cleaning', r.service_type],
    ['Frequency', r.frequency],
    ['Bedrooms', r.bedrooms],
    ['Bathrooms', r.bathrooms],
    ['Square feet', r.square_feet],
    ['Preferred date', r.preferred_date],
    ['Pets', r.pets],
    ['Last cleaned', r.last_cleaned],
    ['Additional services', r.add_ons?.length ? r.add_ons.join(', ') : null],
    ['Home condition', r.home_condition],
    ['Special requests', r.special_requests],
    ['Message', r.message],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Send a notification email to the business inbox for a new lead, via Resend.
 *
 * Server-side ONLY — never call this from the browser (the API key must stay
 * secret). Best-effort by contract: it never throws, so an email problem can
 * never stop a lead from being saved. Returns false (and logs a clear reason)
 * when Resend is not configured or the send fails.
 *
 * All configuration comes from environment variables — nothing is hard-coded:
 *   RESEND_API_KEY           the Resend API key (server secret).
 *   RESEND_FROM_EMAIL        verified sender, e.g. "Dolane Cleaning <leads@your-domain.com>".
 *                            Falls back to Resend's shared onboarding@resend.dev for testing.
 *   LEADS_NOTIFICATION_EMAIL where leads are delivered — reuses the inbox already
 *                            configured for the site (NEXT_PUBLIC_CONTACT_EMAIL) when unset.
 */
export async function sendLeadEmail(record: LeadRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFICATION_EMAIL || site.email;
  const from =
    process.env.RESEND_FROM_EMAIL || 'Dolane Cleaning Website <onboarding@resend.dev>';

  if (!apiKey || !to) {
    console.warn(
      '[leads] Email notification skipped — set RESEND_API_KEY and ' +
        'LEADS_NOTIFICATION_EMAIL (or NEXT_PUBLIC_CONTACT_EMAIL) to enable it. ' +
        'Lead was still saved to Supabase.',
    );
    return false;
  }

  const rows = emailRows(record);
  const kind = record.type === 'quote' ? 'quote request' : 'contact message';
  const who = record.full_name ? ` from ${record.full_name}` : '';
  const subject = `New ${kind}${who} — Dolane Cleaning website`;

  const html = `
    <div style="margin:0;padding:24px 12px;background:#f3efe7">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;border-collapse:collapse">
        <tr>
          <td style="background:#01271a;border-radius:14px 14px 0 0;padding:22px 28px">
            <p style="margin:0;font-family:Georgia,serif;font-size:20px;color:#e1c277">Dolane Cleaning Services</p>
            <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#dcece5">New ${kind}${who ? ` ${who.trim()}` : ''}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:8px 28px 24px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
              ${rows
                .map(
                  ([label, value]) =>
                    `<tr>` +
                    `<td style="color:#6b7280;border-bottom:1px solid #eee;padding:10px 12px 10px 0;white-space:nowrap;vertical-align:top">${label}</td>` +
                    `<td style="color:#111827;border-bottom:1px solid #eee;padding:10px 0;vertical-align:top"><strong>${escapeHtml(value).replace(/\n/g, '<br>')}</strong></td>` +
                    `</tr>`,
                )
                .join('')}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-radius:0 0 14px 14px;padding:0 28px 24px">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#9ca3af">
              Sent automatically from the Dolane Cleaning Services website. Reply to this email to respond to the customer.
            </p>
          </td>
        </tr>
      </table>
    </div>`;

  const text =
    `New ${kind}${who}\n\n` + rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  try {
    // Imported lazily so the SDK is only loaded when a lead is actually sent.
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: record.email || undefined,
      subject,
      html,
      text,
    });

    if (error) {
      console.error(
        '[leads] Resend send failed (lead was still saved):',
        error.name,
        error.message,
      );
      return false;
    }

    console.log('[leads] Notification email sent via Resend — id:', data?.id, 'to:', to);
    return true;
  } catch (error) {
    console.error(
      '[leads] Resend threw (lead was still saved):',
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}
