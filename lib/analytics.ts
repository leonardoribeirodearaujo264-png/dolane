/**
 * Thin, safe wrappers around the Meta Pixel (window.fbq). Every call is a no-op
 * when the pixel has not loaded (blocked, still initializing, or disabled), so
 * these can be called from anywhere without guarding at the call site.
 *
 * Each visitor action fires TWO things, and never duplicates the pixel script:
 *   - a Meta STANDARD event (Lead / Contact) that Meta uses to optimize ads;
 *   - a CUSTOM event (quote_form_submit / sms_click / call_click / phone_copy)
 *     for granular reporting.
 * No personal data is ever put in event parameters.
 */

function fire(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('track', event, params);
  } catch {
    // Analytics must never break the page or a form submission.
  }
}

function fireCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('trackCustom', event, params);
  } catch {
    /* no-op */
  }
}

/** Fire once, right after a successful quote-form submission. */
export function trackLead(params?: { content_name?: string; content_category?: string }) {
  fire('Lead', { content_category: 'Quote Request', ...params });
  fireCustom('quote_form_submit', params);
}

/** Fire on a tap of a Text (SMS) call-to-action. */
export function trackSmsClick() {
  fire('Contact', { content_name: 'Text Us' });
  fireCustom('sms_click');
}

/** Fire on a tap of a Call (tel:) call-to-action. */
export function trackCallClick() {
  fire('Contact', { content_name: 'Call' });
  fireCustom('call_click');
}

/** Fire when the visitor copies the phone number from the desktop SMS modal. */
export function trackPhoneCopy() {
  fireCustom('phone_copy');
}
