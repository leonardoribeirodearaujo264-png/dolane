'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { offer } from '@/lib/offer';
import { trackCouponClaimed } from '@/lib/analytics';

const STORAGE_KEY = 'dolane_coupon';

type CouponContextValue = {
  applied: boolean;
  /** Claim from a user action (fires the coupon_claimed conversion). */
  claim: () => void;
  remove: () => void;
};

const CouponContext = createContext<CouponContextValue>({
  applied: false,
  claim: () => {},
  remove: () => {},
});

export function useCoupon() {
  return useContext(CouponContext);
}

/** Read a `coupon` param from either the real query or a hash query (…/#quote?coupon=). */
function couponInUrl(): boolean {
  try {
    const fromSearch = new URLSearchParams(window.location.search).get('coupon');
    const hashQuery = window.location.hash.split('?')[1] ?? '';
    const fromHash = new URLSearchParams(hashQuery).get('coupon');
    const value = (fromSearch || fromHash || '').trim().toUpperCase();
    return value === offer.couponCode;
  } catch {
    return false;
  }
}

function persist(applied: boolean) {
  try {
    if (applied) window.localStorage.setItem(STORAGE_KEY, offer.couponCode);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be unavailable (private mode, blocked) — the in-memory state
    // still works for this visit; it just will not survive a reload.
  }
}

export default function CouponProvider({ children }: { children: ReactNode }) {
  const [applied, setApplied] = useState(false);

  // Restore from storage, or auto-apply from an ad URL (?coupon=DOLANE20).
  useEffect(() => {
    let stored = false;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY) === offer.couponCode;
    } catch {
      stored = false;
    }
    const fromUrl = couponInUrl();
    if (stored || fromUrl) {
      setApplied(true);
      // Auto-apply from a URL is silent — no coupon_claimed event.
      if (fromUrl && !stored) persist(true);
    }
  }, []);

  const claim = useCallback(() => {
    setApplied(true);
    persist(true);
    trackCouponClaimed();
  }, []);

  const remove = useCallback(() => {
    setApplied(false);
    persist(false);
  }, []);

  return (
    <CouponContext.Provider value={{ applied, claim, remove }}>
      {children}
    </CouponContext.Provider>
  );
}
