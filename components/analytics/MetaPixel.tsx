'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

/**
 * Meta (Facebook) Pixel.
 *
 * The ID is a public identifier, so it ships with a sensible default and can be
 * overridden or disabled with NEXT_PUBLIC_FACEBOOK_PIXEL_ID. The base snippet
 * fires the first PageView; because this is a single-page app, we also fire a
 * PageView on each client-side route change (skipping the initial mount so the
 * first view is not counted twice).
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '2129798294641755';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;
    if (firstLoad.current) {
      // The base snippet already tracked the initial PageView.
      firstLoad.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
