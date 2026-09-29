/**
 * Single source of truth for the first-clean discount offer.
 *
 * Change the copy, the code or the number of spots here and every component
 * (home offer block, header strip, quote form chip, thank-you page, FAQ) picks
 * it up. The discount applies to a first cleaning of ANY service, and it has NO
 * expiration — so there is deliberately no countdown anywhere. Urgency comes
 * only from limited new-client spots.
 */
type Offer = {
  couponCode: string;
  discountPercent: number;
  /** Headline used on the offer block and header strip. */
  headline: string;
  claimCta: string;
  claimedTitle: string;
  /** Shown in the form once the coupon is applied. */
  chipText: string;
  /** The honest, no-expiry scarcity note. */
  scarcityNote: string;
  /** Offer conditions, shown by the offer block and the form chip. */
  terms: string;
  /**
   * Real number of new-client spots left this month, or null. When null the UI
   * uses qualitative wording. NEVER generate this by code — set it by hand.
   */
  spotsLeft: number | null;
};

export const offer: Offer = {
  couponCode: 'DOLANE20',
  discountPercent: 20,
  headline: '20% off your first cleaning',
  claimCta: 'Claim my 20% off',
  claimedTitle: 'Coupon claimed',
  chipText: 'DOLANE20 applied: 20% off your first cleaning',
  scarcityNote:
    'The 20% discount has no expiration date, but first-clean spots fill up fast.',
  terms:
    'Valid only on your first cleaning. New clients only, one per household. Cannot be combined with other offers. Void if altered, copied, or sold.',
  spotsLeft: null,
};

/** The current month name, computed from today's date — never hard-coded in copy. */
export function currentMonth(): string {
  return new Date().toLocaleString('en-US', { month: 'long' });
}

/**
 * Short scarcity headline. Shows the real spot count only when `spotsLeft` is
 * set; otherwise stays qualitative. No random numbers, no countdown.
 */
export function scarcityHeadline(): string {
  const month = currentMonth();
  if (offer.spotsLeft != null && offer.spotsLeft > 0) {
    const noun = offer.spotsLeft === 1 ? 'spot' : 'spots';
    return `Only ${offer.spotsLeft} new-client ${noun} left this ${month}`;
  }
  return `Limited new-client spots this ${month}`;
}
