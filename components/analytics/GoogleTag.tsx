import Script from 'next/script';

/**
 * Google tag (gtag.js) for Google Ads — AW-18311931246.
 *
 * Completely independent of the Meta Pixel (see MetaPixel.tsx): its own scripts,
 * its own global (window.gtag / dataLayer). One never affects the other.
 * The ID ships as a default and can be overridden with NEXT_PUBLIC_GOOGLE_ADS_ID.
 */
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18311931246';

export default function GoogleTag() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
