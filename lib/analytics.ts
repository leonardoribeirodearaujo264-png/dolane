/**
 * Thin, safe wrappers around the Meta Pixel (window.fbq). Every call is a no-op
 * when the pixel has not loaded (blocked, still initializing, or disabled), so
 * these can be called from anywhere without guarding at the call site.
 *
 * Event policy (matches the ad-conversion tracking plan):
 *   - PageView is fired by the base pixel (see components/analytics/MetaPixel).
 *   - Lead    → ONLY after a form is submitted successfully (a real request was
 *               captured). Never on focus, open or click.
 *   - Contact → a lighter "reached out" intent: tapping a Text (SMS) or Call CTA.
 */

type LeadKind = 'quote' | 'contact-form';
type ContactMethod = 'sms' | 'call';

function fire(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('track', event, params);
  } catch {
    // Analytics must never break the page or a form submission.
  }
}

/** Fire once, right after a successful form submission. */
export function trackLead(kind: LeadKind) {
  fire('Lead', { content_name: kind });
}

/** Fire on a tap of a Text (SMS) or Call call-to-action. */
export function trackContact(method: ContactMethod) {
  fire('Contact', { method });
}
