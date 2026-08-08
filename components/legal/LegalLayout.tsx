import type { ReactNode } from 'react';

import PageHeader from '@/components/layout/PageHeader';

/** Date the legal pages were last revised. Update when the text changes. */
export const LEGAL_LAST_UPDATED = 'August 8, 2026';

export default function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro={intro} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-forest-900/50">Last updated: {LEGAL_LAST_UPDATED}</p>

          <div
            className={[
              'mt-8 space-y-6',
              '[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:text-forest-900 sm:[&_h2]:text-3xl',
              '[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:text-forest-900',
              '[&_p]:text-[0.95rem] [&_p]:leading-relaxed [&_p]:text-forest-900/75',
              '[&_li]:text-[0.95rem] [&_li]:leading-relaxed [&_li]:text-forest-900/75',
              '[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5',
              '[&_a]:text-forest-900 [&_a]:underline [&_a]:underline-offset-4',
            ].join(' ')}
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
