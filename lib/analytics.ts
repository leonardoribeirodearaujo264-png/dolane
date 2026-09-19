/**
 * Meta Pixel (window.fbq) — ONE conversion event: `Lead`.
 *
 * The campaign optimizes for the standard `Lead` event, sub-typed with
 * `lead_type` so SMS vs form vs chat stay distinguishable inside a single,
 * clean event stream. No `Contact`, no custom events — to keep the campaign
 * data clean and undivided.
 *
 * Lead fires ONLY on a real action (an SMS click or a confirmed form
 * submission). It must NEVER fire on page load — PageView covers that.
 */
export type LeadType = 'sms' | 'form' | 'chat';

export function trackLead(leadType: LeadType) {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('track', 'Lead', { lead_type: leadType });
  } catch {
    // Analytics must never break the page or a form submission.
  }
}
