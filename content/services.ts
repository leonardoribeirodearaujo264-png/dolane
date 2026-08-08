/**
 * The service catalogue, exactly as confirmed by the owners.
 *
 * `image` is null where no real photo of that kind of job exists yet — those
 * cards fall back to an editorial green treatment instead of borrowing a
 * misleading stock or unrelated photo. Drop a file in /public/images/services
 * and fill the field in to upgrade a card.
 */
export type Service = {
  slug: string;
  title: string;
  /** Short line for the card. */
  summary: string;
  /** Longer copy shown in the detail panel. */
  description: string;
  highlights: string[];
  image: { src: string; alt: string } | null;
  /** Matches an option value in the quote form's "Type of Cleaning" select. */
  quoteValue: string;
};

export const services: Service[] = [
  {
    slug: 'residential-cleaning',
    title: 'Residential Cleaning',
    summary: 'Recurring or one-time cleaning that keeps your home comfortable and cared for.',
    description:
      "Professional residential cleaning designed around your home's needs. Our recurring and one-time services help keep your home clean, comfortable and cared for, giving you more time for what matters most.",
    highlights: [
      'Weekly, biweekly, monthly or one-time',
      'Kitchen, bathrooms, bedrooms and common areas',
      'Dusting, vacuuming and floor cleaning',
    ],
    image: {
      src: '/images/services/dolane-residential-cleaning-bedroom.webp',
      alt: 'Bedroom cleaned and made up during a residential cleaning by Dolane Cleaning Services in Westerville, Ohio',
    },
    quoteValue: 'Residential Cleaning',
  },
  {
    slug: 'deep-cleaning',
    title: 'Deep Cleaning',
    summary: 'A detailed, top-to-bottom clean for homes that need extra attention.',
    description:
      'A detailed, top-to-bottom cleaning designed for homes that need extra attention. Deep cleaning is ideal for first-time services, seasonal cleaning or homes that have not received professional cleaning recently.',
    highlights: [
      'Ideal for a first service with us',
      'Seasonal and reset cleaning',
      'Extra time spent on built-up areas',
    ],
    image: {
      src: '/images/services/dolane-deep-cleaning-bathroom.webp',
      alt: 'Bathroom cleaned top to bottom, including the shower enclosure and tile, during a deep cleaning by Dolane Cleaning Services',
    },
    quoteValue: 'Deep Cleaning',
  },
  {
    slug: 'move-in-move-out-cleaning',
    title: 'Move-In / Move-Out Cleaning',
    summary: 'Detailed cleaning for empty or transitioning homes.',
    description:
      'Detailed cleaning for empty or transitioning homes, helping prepare the property for new residents, homeowners, tenants, real estate photos or listing.',
    highlights: [
      'Homeowners, tenants and Realtors',
      'Prepare a property for listing or photos',
      'Cleaned top to bottom while empty',
    ],
    image: {
      src: '/images/services/dolane-move-in-move-out-cleaning-empty-home.webp',
      alt: 'Empty finished basement cleaned and ready for new residents by Dolane Cleaning Services',
    },
    quoteValue: 'Move-In / Move-Out Cleaning',
  },
  {
    slug: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    summary: 'Reliable, customized cleaning for commercial spaces.',
    description:
      'Reliable and customized cleaning services for commercial spaces, helping businesses maintain a clean, professional and welcoming environment.',
    highlights: [
      'Schedules built around your business',
      'Consistent, dependable service',
      'A welcoming space for your customers',
    ],
    image: null,
    quoteValue: 'Commercial Cleaning',
  },
  {
    slug: 'office-cleaning',
    title: 'Office Cleaning',
    summary: 'Clean, organized workspaces on a schedule that fits your team.',
    description:
      'Professional cleaning services for offices and workspaces, customized according to the needs and frequency of each business.',
    highlights: [
      'Customized frequency',
      'Desks, common areas and restrooms',
      'Discreet, professional service',
    ],
    image: null,
    quoteValue: 'Office Cleaning',
  },
  {
    slug: 'post-construction-cleaning',
    title: 'After Renovation / Post-Construction',
    summary: 'Detailed dust removal and surface cleaning after a project.',
    description:
      'Detailed cleaning after renovations or construction projects, focused on removing dust and cleaning surfaces to help prepare the space for use. Scope and pricing depend on the condition of the property.',
    highlights: [
      'Fine construction dust removal',
      'Surfaces cleaned and prepared for use',
      'Quoted after reviewing the property',
    ],
    image: null,
    quoteValue: 'Post-Construction or Renovation Cleaning',
  },
];

/** Available on request; some carry an additional fee. */
export const additionalServices = [
  'Inside refrigerator',
  'Inside oven',
  'Interior windows',
  'Window tracks',
  'Inside cabinets',
  'Basement cleaning',
  'Garage cleaning',
  'Custom cleaning requests',
] as const;

export const additionalServicesNote =
  'Please note: some detailed or additional services are not included in standard cleaning and may require an additional fee. Please request additional services in advance when possible.';

/** Stated plainly so nobody books expecting something we do not offer. */
export const carpetNote =
  'We do not offer professional carpet shampooing. Carpet vacuuming is included as part of the cleaning where applicable.';

export const quoteServiceOptions = [
  ...services.map((s) => s.quoteValue),
  'Other',
] as const;

export const frequencyOptions = ['Weekly', 'Biweekly', 'Monthly', 'One-Time'] as const;
