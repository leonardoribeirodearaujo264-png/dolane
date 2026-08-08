import { Star } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { googleReviewsUrl, reviews } from '@/content/reviews';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={i < rating ? 'size-4 fill-gold-500 text-gold-500' : 'size-4 text-forest-900/20'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * Renders nothing until real reviews exist in content/reviews.ts. The owners
 * asked that no fictional testimonials be published, so there is deliberately
 * no placeholder card and no "coming soon" filler here.
 */
export default function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="bg-sand py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="What our clients say"
          intro="In their words, not ours."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal
              key={review.id}
              delay={(index % 3) * 90}
              className="flex h-full flex-col rounded-2xl border border-forest-900/10 bg-white p-7 shadow-soft"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-forest-900/80">
                &ldquo;{review.body}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-forest-900/10 pt-4">
                <p className="font-semibold text-forest-900">{review.name}</p>
                <p className="mt-0.5 text-xs text-forest-900/55">
                  {review.location ? `${review.location} · ` : ''}
                  {review.source}
                  {' · '}
                  <time dateTime={review.date}>
                    {new Date(`${review.date}T00:00:00`).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </p>
              </footer>
            </Reveal>
          ))}
        </div>

        {googleReviewsUrl && (
          <Reveal className="mt-10 text-center">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-gold-600/40 pb-1 text-sm font-semibold text-forest-900 transition-colors hover:border-gold-600 hover:text-gold-700"
            >
              Read all reviews on Google
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
