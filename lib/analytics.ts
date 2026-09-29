import { offer } from '@/lib/offer';

/**
 * Meta Pixel (window.fbq) + Google tag (window.gtag).
 *
 * Standard conversion is `Lead` (Meta), sub-typed with `lead_type`. Lead fires
 * ONLY on a real action — an SMS click, or a confirmed form submission (fired
 * on the /thank-you page). It must NEVER fire on page load. `coupon_claimed` is
 * a custom signal fired when a visitor claims the discount on the home page.
 */
export type LeadType = 'sms' | 'form' | 'chat';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Meta `Lead`. Used for SMS clicks and the chat message form. */
export function trackLead(leadType: LeadType) {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('track', 'Lead', { lead_type: leadType });
  } catch {
    // Analytics must never break the page or a form submission.
  }
}

/**
 * The quote-form conversion, fired once on the /thank-you page after a
 * confirmed submission: Meta `Lead` + Google `generate_lead`.
 *
 * The Google event only fires when NEXT_PUBLIC_GADS_LEAD_LABEL is set (the Ads
 * conversion label), so nothing bogus is sent before it is configured.
 */
export function trackFormLeadConversion() {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('track', 'Lead', { lead_type: 'form' });
  } catch {
    /* no-op */
  }
  try {
    const sendTo = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;
    if (sendTo && typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { send_to: sendTo });
    }
  } catch {
    /* no-op */
  }
}

/** Fired when the visitor claims the discount on the home page. */
export function trackCouponClaimed() {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('trackCustom', 'coupon_claimed', { coupon: offer.couponCode });
  } catch {
    /* no-op */
  }
  try {
    window.gtag?.('event', 'coupon_claimed', { coupon: offer.couponCode });
  } catch {
    /* no-op */
  }
}
