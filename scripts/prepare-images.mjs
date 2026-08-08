/**
 * Dolane Cleaning Services — image asset pipeline.
 *
 * Reads the original photos + logo supplied by the client and produces the
 * optimized, SEO-named assets under /public/images (plus the app icons).
 *
 * Run with:  npm run images
 *
 * The logo is NEVER redrawn. The only transformation applied to it is removing
 * the flat dark-green backdrop of the supplied mockup so the original artwork
 * can sit on the site's own backgrounds, and cropping the official monogram for
 * the favicon. Proportions, symbol, typography and composition are untouched.
 */
import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public', 'images');
const APP = path.join(ROOT, 'app');

// Originals live in the repo so the pipeline is reproducible on any machine.
const SRC_UNZIPPED = process.env.DOLANE_PHOTOS_DIR ?? path.join(ROOT, 'assets-source', 'photos');
const LOGO_SRC = process.env.DOLANE_LOGO_SRC
  ?? path.join(ROOT, 'assets-source', 'logo', 'dolane-cleaning-logo-original.jpeg');

/**
 * Photo assignments — chosen after visually reviewing every supplied image and
 * matching it to the section where it does the most work. Duplicates in the
 * client's originals were removed rather than shipped twice.
 */
const PHOTOS = [
  // ---------------------------------------------------------------- hero --
  {
    src: 'hero-bedroom-styled.jpeg',
    out: 'hero/dolane-cleaning-styled-bedroom-westerville-ohio.webp',
    width: 1600,
  },

  // --------------------------------------------------------------- about --
  {
    src: 'owners-letici-and-george.jpeg',
    out: 'about/dolane-cleaning-owners-letici-and-george.webp',
    width: 1100,
  },
  {
    src: 'owner-letici-portrait.jpeg',
    out: 'about/dolane-cleaning-owner-letici-dolane.webp',
    width: 800,
  },

  // ------------------------------------------------------------ services --
  {
    src: 'bedroom-green-linens.jpeg',
    out: 'services/dolane-residential-cleaning-bedroom.webp',
    width: 1200,
  },
  {
    src: 'bathroom-full-shower-enclosure.jpeg',
    out: 'services/dolane-deep-cleaning-bathroom.webp',
    width: 1200,
  },

  // ---------------------------------------------- signature detail strip --
  {
    src: 'kitchen-oven-towel-bow.jpeg',
    out: 'details/dolane-cleaning-kitchen-towel-detail.webp',
    width: 1400,
  },
  {
    src: 'touch-tp-heart.jpeg',
    out: 'details/dolane-cleaning-folded-paper-heart.webp',
    width: 900,
  },
  {
    src: 'touch-tp-fan.jpeg',
    out: 'details/dolane-cleaning-folded-paper-fan.webp',
    width: 900,
  },
  {
    src: 'touch-tp-bow.jpeg',
    out: 'details/dolane-cleaning-folded-paper-bow.webp',
    width: 900,
  },
  {
    src: 'touch-tp-pawpatrol.jpeg',
    out: 'details/dolane-cleaning-folded-paper-for-kids.webp',
    width: 900,
  },
  {
    src: 'touch-tp-emoji-flowers.jpeg',
    out: 'details/dolane-cleaning-paper-flowers-detail.webp',
    width: 900,
  },

  // ------------------------------------------------------- before / after --
  ...[
    ['shower-pan-01', 'shower-floor'],
    ['shower-pan-02', 'shower-base'],
    ['shower-door-track', 'shower-door-track'],
    ['showerhead', 'showerhead'],
    ['bathtub', 'bathtub'],
  ].flatMap(([src, slug]) =>
    ['before', 'after'].map((phase) => ({
      src: `ba-${src}-${phase}.jpeg`,
      out: `before-after/dolane-cleaning-${slug}-${phase}.webp`,
      width: 1000,
    })),
  ),

  // ------------------------------------------------------------- gallery --
  {
    src: 'bathroom-towels-and-flowers.jpeg',
    out: 'gallery/dolane-cleaning-bathroom-towels-and-flowers.webp',
    width: 1200,
  },
  {
    src: 'shower-stall-clean-01.jpeg',
    out: 'gallery/dolane-cleaning-shower-stall-cleaned.webp',
    width: 1000,
  },
  {
    src: 'shower-stall-clean-02.jpeg',
    out: 'gallery/dolane-cleaning-shower-enclosure-cleaned.webp',
    width: 1000,
  },
  {
    src: 'bathtub-clean-wide.jpeg',
    out: 'gallery/dolane-cleaning-bathtub-cleaned.webp',
    width: 1000,
  },
  {
    src: 'bedroom-lower-level.jpeg',
    out: 'gallery/dolane-cleaning-lower-level-bedroom.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53 (5).jpeg',
    out: 'gallery/dolane-cleaning-freshly-made-bed.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53 (4).jpeg',
    out: 'services/dolane-move-in-move-out-cleaning-empty-home.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53.jpeg',
    out: 'gallery/dolane-cleaning-living-area-vacuumed-carpet.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53 (1).jpeg',
    out: 'gallery/dolane-cleaning-carpeted-stairs.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53 (2).jpeg',
    out: 'gallery/dolane-cleaning-staircase-carpet-and-hardwood.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53 (3).jpeg',
    out: 'gallery/dolane-cleaning-finished-basement-clean-carpet.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53 (6).jpeg',
    out: 'gallery/dolane-cleaning-kitchen-counter-detail.webp',
    width: 1200,
  },
  {
    src: 'WhatsApp Image 2026-08-08 at 13.08.53 (7).jpeg',
    out: 'gallery/dolane-cleaning-bathroom-cleaned-and-detailed.webp',
    width: 1200,
  },
];

/** Official logo geometry, measured from the supplied artwork (1536x1024). */
const MARK_BOX = { left: 613, top: 182, width: 311, height: 311 };
const LOCKUP_BOX = { left: 258, top: 182, width: 1025, height: 617 };

const BRAND_GREEN = { r: 1, g: 39, b: 26 }; // #01271A — sampled from the logo backdrop

const luma = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/**
 * Lifts the original gold artwork off the flat dark-green mockup backdrop into a
 * straight-alpha PNG, recovering the anti-aliased edges instead of hard-keying
 * them. Colors of the artwork itself are preserved exactly.
 */
async function keyOutBackdrop(box) {
  const { data, info } = await sharp(LOGO_SRC)
    .extract(box)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const bgL = luma(BRAND_GREEN.r, BRAND_GREEN.g, BRAND_GREEN.b);
  // Luminance of the artwork's dominant gold (#E1C277), sampled from the source.
  const fgL = luma(225, 194, 119);
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    let a = (luma(r, g, b) - bgL) / (fgL - bgL);

    // Floor kills JPEG noise and the mockup's soft drop shadow; ceiling keeps
    // the specular highlights fully opaque.
    if (a < 0.05) a = 0;
    else if (a > 1) a = 1;

    if (a === 0) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
      continue;
    }

    // Un-composite: recover the source color from the observed blend.
    out[o] = Math.max(0, Math.min(255, Math.round((r - (1 - a) * BRAND_GREEN.r) / a)));
    out[o + 1] = Math.max(0, Math.min(255, Math.round((g - (1 - a) * BRAND_GREEN.g) / a)));
    out[o + 2] = Math.max(0, Math.min(255, Math.round((b - (1 - a) * BRAND_GREEN.b) / a)));
    out[o + 3] = Math.round(a * 255);
  }

  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function main() {
  const dirs = ['logo', 'hero', 'about', 'services', 'details', 'before-after', 'gallery', 'og'];
  await Promise.all(dirs.map((d) => mkdir(path.join(PUB, d), { recursive: true })));

  // ---------------------------------------------------------------- photos --
  const available = new Set(await readdir(SRC_UNZIPPED));
  /** Collected so the TypeScript content files can be checked against reality. */
  const produced = [];

  for (const photo of PHOTOS) {
    if (!available.has(photo.src)) {
      console.warn(`  ! missing source, skipped: ${photo.src}`);
      continue;
    }
    const dest = path.join(PUB, photo.out);
    const info = await sharp(path.join(SRC_UNZIPPED, photo.src))
      .rotate() // honor EXIF orientation, then drop all metadata (incl. any GPS)
      .resize({ width: photo.width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(dest);
    produced.push({ src: `/images/${photo.out}`, width: info.width, height: info.height });
    console.log(`  photo  ${photo.out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
  }

  // ------------------------------------------------------------------ logo --
  const lockup = await keyOutBackdrop(LOCKUP_BOX);
  await lockup
    .clone()
    .resize({ width: 900 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUB, 'logo', 'dolane-cleaning-logo.png'));

  const mark = await keyOutBackdrop(MARK_BOX);
  await mark
    .clone()
    .resize({ width: 512 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUB, 'logo', 'dolane-cleaning-mark.png'));
  console.log('  logo   dolane-cleaning-logo.png + dolane-cleaning-mark.png (transparent)');

  // --------------------------------------------------------------- favicon --
  // The official monogram, centered on the brand green from the logo artwork.
  const markPad = async (size, pad) => {
    const inner = Math.round(size * pad);
    const buf = await mark.clone().resize({ width: inner, height: inner, fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    return sharp({
      create: {
        width: size, height: size, channels: 4,
        background: { ...BRAND_GREEN, alpha: 1 },
      },
    }).composite([{ input: buf, gravity: 'center' }]).png({ compressionLevel: 9 });
  };

  await (await markPad(512, 0.66)).toFile(path.join(APP, 'icon.png'));
  await (await markPad(180, 0.64)).toFile(path.join(APP, 'apple-icon.png'));
  console.log('  icons  app/icon.png + app/apple-icon.png');

  // -------------------------------------------------------------- OG image --
  const ogLogo = await lockup.clone().resize({ width: 760 }).png().toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { ...BRAND_GREEN, alpha: 1 } },
  })
    .composite([{ input: ogLogo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUB, 'og', 'dolane-cleaning-og.png'));
  console.log('  og     dolane-cleaning-og.png (1200x630)');

  // A manifest of exactly what shipped, with real intrinsic dimensions, so the
  // content files can declare width/height without guessing.
  await writeFile(
    path.join(PUB, 'images-manifest.json'),
    JSON.stringify({ generatedFrom: 'client-supplied photos', images: produced }, null, 2),
  );
  console.log(`\n  ${produced.length} images written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
