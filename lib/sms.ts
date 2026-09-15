/**
 * The whole site shares one SMS fallback modal (rendered once by SmsModal).
 * On a phone, a Text CTA opens the native Messages app directly; on a desktop,
 * where `sms:` usually does nothing, the button opens this modal instead so the
 * visitor can copy the number. Any button asks for it by dispatching this event.
 */
export const SMS_MODAL_EVENT = 'dolane:open-sms-modal';

export function openSmsModal() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SMS_MODAL_EVENT));
}

/**
 * True when the device can plausibly hand off an `sms:` link to a Messages app
 * — i.e. a phone or tablet. Desktops fall through to the copy-number modal.
 */
export function isLikelyMobile() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const mobileUA = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile|Silk/i.test(ua);
  const coarsePointer =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(pointer: coarse)').matches
      : false;
  return mobileUA || coarsePointer;
}
