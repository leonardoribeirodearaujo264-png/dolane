/**
 * Client reviews.
 *
 * INTENTIONALLY EMPTY. The owners have no published Google/Yelp reviews yet and
 * asked that no fictional testimonials appear on the site. The Reviews section
 * and its "Reviews" nav link both hide themselves while this array is empty.
 *
 * To switch the section on, append real reviews in the shape below — nothing
 * else needs to change. Do not paste in example text: whatever is in this array
 * is published to the public site and to Review structured data.
 *
 * @example
 * {
 *   id: 'g-001',
 *   name: 'First name L.',
 *   rating: 5,
 *   date: '2026-09-14',          // ISO, the date the review was left
 *   source: 'Google',
 *   body: 'The exact text the client wrote.',
 *   avatar: null,                // '/images/reviews/...' once available
 * }
 */
export type Review = {
  id: string;
  name: string;
  /** Whole stars, 1–5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  source: 'Google' | 'Yelp' | 'Nextdoor' | 'Facebook' | 'Direct';
  body: string;
  avatar: string | null;
  /** Optional city, e.g. 'Westerville, OH'. */
  location?: string;
};

export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;

/** Set once a Google Business Profile exists, to link "See all reviews". */
export const googleReviewsUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL || null;
