/**
 * Single source of truth for every real business fact on the site.
 *
 * RULE: nothing in here may be invented. Anything the business has not yet
 * confirmed is either `null` (and the UI hides it) or driven by an environment
 * variable so it can be filled in without touching component code.
 */

export const site = {
  /** Public-facing trade name. */
  name: 'Dolane Cleaning Services',
  shortName: 'Dolane Cleaning',
  /** Registered legal entity — used in legal pages and structured data only. */
  legalName: 'DOLANE DIRHAM, LLC',

  tagline: 'A clean home. More time for what matters.',
  secondaryTagline: "We care for your home like it's our own.",

  description:
    'Family-owned, fully insured residential and commercial cleaning in Westerville, Ohio, serving Columbus and surrounding communities. Request your free, no-obligation quote.',

  /** Confirmed by the owners. */
  foundedYear: 2023,
  /** Hands-on cleaning experience, which predates the LLC registration. */
  yearsOfExperience: '7+',
  registeredState: 'Ohio',
  llcEffectiveDate: '2023-07-10',

  owners: {
    names: 'Letici Dolane & George',
    role: 'Owners',
  },

  phone: {
    display: '(380) 261-7818',
    /** E.164 — used by tel:, sms: and wa.me links. */
    e164: '+13802617818',
    digits: '13802617818',
  },

  /**
   * No business email exists yet. Set NEXT_PUBLIC_CONTACT_EMAIL once the domain
   * mailbox is created; until then every email affordance stays hidden rather
   * than pointing at an address that would bounce.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,

  location: {
    city: 'Westerville',
    state: 'Ohio',
    stateCode: 'OH',
    country: 'US',
    region: 'Central Ohio',
    /** Deliberately omitted: the owners do not publish their home address. */
    streetAddress: null,
    /** Approximate center of the service area, for map/structured data only. */
    geo: { latitude: 40.1262, longitude: -82.9291 },
  },

  /** To be confirmed by the owners — the UI shows a neutral line until then. */
  businessHours: null as null | { days: string; hours: string }[],

  languages: ['English', 'Portuguese', 'Spanish'],

  /** Confirmed in the client briefing. Policy numbers are never published. */
  insurance: {
    generalLiability: true,
    workersComp: true,
    certificateOnRequest: true,
  },

  paymentMethods: ['Zelle', 'Check', 'Cash'],

  /** Filled in as the accounts are created — falsy entries are not rendered. */
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || null,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
    google: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || null,
  },

  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dolanecleaningservices.com').replace(/\/$/, ''),
} as const;

export const whatsappHref = (() => {
  const message =
    "Hi! I found Dolane Cleaning Services online and would like to request a cleaning quote.";
  return `https://wa.me/${site.phone.digits}?text=${encodeURIComponent(message)}`;
})();

export const telHref = `tel:${site.phone.e164}`;
export const smsHref = `sms:${site.phone.e164}`;

/** Cities the owners confirmed they serve. Order matters for the UI. */
export const serviceArea = [
  'Westerville',
  'Columbus',
  'New Albany',
  'Dublin',
  'Powell',
  'Lewis Center',
  'Worthington',
  'Upper Arlington',
  'Hilliard',
  'Delaware',
  'Galena',
  'Pickerington',
  'Canal Winchester',
  'Groveport',
  'Grove City',
  'Pataskala',
  'Plain City',
  'Alexandria',
  'Granville',
  'Kirkersville',
  'Obetz',
  'Bexley',
  'Grandview Heights',
  'Reynoldsburg',
  'Johnstown',
] as const;

export type NavLink = { label: string; href: string };

/** Shown in the desktop header — kept short so it never crowds the logo. */
export const primaryNav: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

/** The full set, used by the mobile menu and the footer. */
export const fullNav: NavLink[] = [
  { label: 'Home', href: '/#top' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Why Choose Us', href: '/#why-us' },
  { label: 'Service Area', href: '/#service-area' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];
