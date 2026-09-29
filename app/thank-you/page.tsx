import type { Metadata } from 'next';
import { Suspense } from 'react';

import ThankYouContent from './ThankYouContent';

// Kept out of search results and out of the sitemap — it is a post-conversion
// page that only makes sense right after submitting the quote form.
export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: false },
  alternates: { canonical: '/thank-you' },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
