/**
 * Gallery of real completed work. Every image here is a photo taken by the
 * owners on an actual job — no stock photography anywhere on this site.
 *
 * Widths/heights are the intrinsic sizes of the optimized files (see
 * public/images-manifest.json) so the masonry grid never shifts as images load.
 *
 * To add more: drop originals into /assets-source/photos, register them in
 * scripts/prepare-images.mjs, run `npm run images`, then append here.
 */
export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export const gallery: GalleryImage[] = [
  {
    src: '/images/hero/dolane-cleaning-styled-bedroom-westerville-ohio.webp',
    alt: 'Master bedroom cleaned and the bed styled with a folded throw by Dolane Cleaning Services',
    width: 1200,
    height: 1600,
    caption: 'Master bedroom, finished and styled',
  },
  {
    src: '/images/details/dolane-cleaning-kitchen-towel-detail.webp',
    alt: 'Kitchen cleaned with the oven towel tied into a bow by Dolane Cleaning Services',
    width: 1400,
    height: 1161,
    caption: 'Kitchen, down to the towel',
  },
  {
    src: '/images/services/dolane-deep-cleaning-bathroom.webp',
    alt: 'Full bathroom with tiled floor and glass shower enclosure cleaned by Dolane Cleaning Services',
    width: 1200,
    height: 1600,
    caption: 'Bathroom, top to bottom',
  },
  {
    src: '/images/services/dolane-residential-cleaning-bedroom.webp',
    alt: 'Bedroom with green linens cleaned and made up by Dolane Cleaning Services',
    width: 1200,
    height: 1600,
    caption: 'Bedroom and carpet',
  },
  {
    src: '/images/gallery/dolane-cleaning-bathroom-towels-and-flowers.webp',
    alt: 'Bathroom finished with folded towels, stacked paper and fresh flowers by Dolane Cleaning Services',
    width: 828,
    height: 1104,
    caption: 'Guest bathroom, finished',
  },
  {
    src: '/images/gallery/dolane-cleaning-living-area-vacuumed-carpet.webp',
    alt: 'Lower-level living area with carpet vacuumed in clean lines by Dolane Cleaning Services',
    width: 768,
    height: 1024,
    caption: 'Living area and carpet',
  },
  {
    src: '/images/gallery/dolane-cleaning-carpeted-stairs.webp',
    alt: 'Carpeted staircase vacuumed step by step by Dolane Cleaning Services',
    width: 768,
    height: 1024,
    caption: 'Stairs, cleaned step by step',
  },
  {
    src: '/images/gallery/dolane-cleaning-lower-level-bedroom.webp',
    alt: 'Lower-level bedroom cleaned and carpet vacuumed by Dolane Cleaning Services',
    width: 900,
    height: 1600,
    caption: 'Lower-level bedroom',
  },
  {
    src: '/images/gallery/dolane-cleaning-shower-enclosure-cleaned.webp',
    alt: 'Shower enclosure cleaned and left spotless by Dolane Cleaning Services',
    width: 576,
    height: 1024,
    caption: 'Shower, cleaned',
  },
  {
    src: '/images/gallery/dolane-cleaning-freshly-made-bed.webp',
    alt: 'Bedroom with the bed freshly made and a throw folded into place by Dolane Cleaning Services',
    width: 900,
    height: 1024,
    caption: 'Bed, made up',
  },
  {
    src: '/images/gallery/dolane-cleaning-staircase-carpet-and-hardwood.webp',
    alt: 'Staircase with cleaned carpet and hardwood floors below by Dolane Cleaning Services',
    width: 768,
    height: 1024,
    caption: 'Staircase and entry',
  },
  {
    src: '/images/gallery/dolane-cleaning-kitchen-counter-detail.webp',
    alt: 'Kitchen counter cleaned and finished with a folded paper towel detail by Dolane Cleaning Services',
    width: 768,
    height: 1024,
    caption: 'Kitchen counter',
  },
  {
    src: '/images/services/dolane-move-in-move-out-cleaning-empty-home.webp',
    alt: 'Empty finished basement cleaned for a move-out by Dolane Cleaning Services',
    width: 576,
    height: 1024,
    caption: 'Move-out clean, ready for handover',
  },
  {
    src: '/images/gallery/dolane-cleaning-bathroom-cleaned-and-detailed.webp',
    alt: 'Bathroom cleaned and detailed with a folded tissue finish by Dolane Cleaning Services',
    width: 1024,
    height: 768,
    caption: 'Bathroom, detailed',
  },
  {
    src: '/images/gallery/dolane-cleaning-bathtub-cleaned.webp',
    alt: 'Bathtub scrubbed clean by Dolane Cleaning Services',
    width: 576,
    height: 1024,
    caption: 'Bathtub, scrubbed',
  },
  {
    src: '/images/gallery/dolane-cleaning-finished-basement-clean-carpet.webp',
    alt: 'Finished basement with freshly vacuumed carpet by Dolane Cleaning Services',
    width: 576,
    height: 1024,
    caption: 'Finished basement',
  },
  {
    src: '/images/gallery/dolane-cleaning-shower-stall-cleaned.webp',
    alt: 'Shower stall left clean and dry by Dolane Cleaning Services',
    width: 576,
    height: 1024,
    caption: 'Shower stall',
  },
];

/**
 * The small finishing touches the owners leave behind. This is the clearest
 * evidence of the "attention to detail" claim, so it gets its own section.
 */
export const signatureTouches: GalleryImage[] = [
  {
    src: '/images/details/dolane-cleaning-folded-paper-heart.webp',
    alt: 'Toilet paper folded into a heart, a finishing touch left by Dolane Cleaning Services',
    width: 900,
    height: 1200,
    caption: 'A folded heart',
  },
  {
    src: '/images/details/dolane-cleaning-folded-paper-fan.webp',
    alt: 'Toilet paper folded into a fan, a finishing touch left by Dolane Cleaning Services',
    width: 900,
    height: 1200,
    caption: 'A folded fan',
  },
  {
    src: '/images/details/dolane-cleaning-folded-paper-bow.webp',
    alt: 'Toilet paper folded into a bow, a finishing touch left by Dolane Cleaning Services',
    width: 828,
    height: 1104,
    caption: 'A folded bow',
  },
  {
    src: '/images/details/dolane-cleaning-folded-paper-for-kids.webp',
    alt: 'A small cartoon sticker left on folded toilet paper for the children of the house by Dolane Cleaning Services',
    width: 900,
    height: 1200,
    caption: 'Something for the kids',
  },
  {
    src: '/images/details/dolane-cleaning-paper-flowers-detail.webp',
    alt: 'Paper folded into flowers and finished with stickers by Dolane Cleaning Services',
    width: 900,
    height: 1200,
    caption: 'Paper flowers',
  },
];

/**
 * Before / After pairs.
 *
 * Every pair below is the same fixture photographed before and after the same
 * visit — no unrelated photos are passed off as a comparison. The section hides
 * itself if this array is emptied.
 */
export type BeforeAfterPair = {
  id: string;
  label: string;
  note: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  width: number;
  height: number;
};

export const beforeAfter: BeforeAfterPair[] = [
  {
    id: 'shower-floor',
    label: 'Shower floor',
    note: 'Built-up grime and staining lifted out of the pan and the door track.',
    before: {
      src: '/images/before-after/dolane-cleaning-shower-floor-before.webp',
      alt: 'Shower pan with staining and build-up before cleaning by Dolane Cleaning Services',
    },
    after: {
      src: '/images/before-after/dolane-cleaning-shower-floor-after.webp',
      alt: 'The same shower pan clean and clear after cleaning by Dolane Cleaning Services',
    },
    width: 576,
    height: 1024,
  },
  {
    id: 'bathtub',
    label: 'Bathtub',
    note: 'Residue and mineral staining scrubbed back to a clean surface.',
    before: {
      src: '/images/before-after/dolane-cleaning-bathtub-before.webp',
      alt: 'Bathtub with residue and staining before cleaning by Dolane Cleaning Services',
    },
    after: {
      src: '/images/before-after/dolane-cleaning-bathtub-after.webp',
      alt: 'The same bathtub clean and bright after cleaning by Dolane Cleaning Services',
    },
    width: 576,
    height: 1024,
  },
  {
    id: 'showerhead',
    label: 'Showerhead',
    note: 'The kind of fixture that gets skipped. We do not skip it.',
    before: {
      src: '/images/before-after/dolane-cleaning-showerhead-before.webp',
      alt: 'Showerhead with rust and mineral build-up before cleaning by Dolane Cleaning Services',
    },
    after: {
      src: '/images/before-after/dolane-cleaning-showerhead-after.webp',
      alt: 'The same showerhead clean and clear after cleaning by Dolane Cleaning Services',
    },
    width: 576,
    height: 1024,
  },
  {
    id: 'shower-door-track',
    label: 'Shower door track',
    note: 'The track and threshold, cleaned out rather than wiped over.',
    before: {
      src: '/images/before-after/dolane-cleaning-shower-door-track-before.webp',
      alt: 'Shower door track with heavy build-up before cleaning by Dolane Cleaning Services',
    },
    after: {
      src: '/images/before-after/dolane-cleaning-shower-door-track-after.webp',
      alt: 'The same shower door track clean after cleaning by Dolane Cleaning Services',
    },
    width: 576,
    height: 1024,
  },
  {
    id: 'shower-base',
    label: 'Shower base',
    note: 'Corners and seams brought back, not just the open floor.',
    before: {
      src: '/images/before-after/dolane-cleaning-shower-base-before.webp',
      alt: 'Shower base with staining in the corners before cleaning by Dolane Cleaning Services',
    },
    after: {
      src: '/images/before-after/dolane-cleaning-shower-base-after.webp',
      alt: 'The same shower base clean into the corners after cleaning by Dolane Cleaning Services',
    },
    width: 576,
    height: 1024,
  },
];
