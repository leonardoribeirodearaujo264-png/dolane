/**
 * Downloads the two brand typefaces from Google Fonts into /app/fonts so the
 * site can self-host them with next/font/local.
 *
 * Self-hosting means the production build has no external network dependency,
 * visitors make no third-party request, and there is no flash of fallback text
 * waiting on fonts.googleapis.com.
 *
 * Run with:  npm run fonts   (only needed if the font files are ever replaced)
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', 'app', 'fonts');

// A modern UA makes Google Fonts return woff2 rather than legacy formats.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const FONTS = [
  {
    css: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300..700&display=swap',
    file: 'CormorantGaramond-Variable.woff2',
  },
  {
    css: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@300..800&display=swap',
    file: 'Urbanist-Variable.woff2',
  },
];

await mkdir(OUT, { recursive: true });

for (const font of FONTS) {
  const cssResponse = await fetch(font.css, { headers: { 'User-Agent': UA } });
  if (!cssResponse.ok) throw new Error(`CSS fetch failed: ${font.css} (${cssResponse.status})`);
  const css = await cssResponse.text();

  // Take the latin subset block — the site is en-US only.
  const blocks = css.split('/*').filter((b) => b.trim().startsWith('latin*/'));
  const source = blocks[0] ?? css;
  const url = source.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) throw new Error(`No woff2 URL found for ${font.file}`);

  const fontResponse = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!fontResponse.ok) throw new Error(`Font fetch failed: ${url} (${fontResponse.status})`);

  const buffer = Buffer.from(await fontResponse.arrayBuffer());
  await writeFile(path.join(OUT, font.file), buffer);
  console.log(`  ${font.file}  ${Math.round(buffer.length / 1024)}KB`);
}
