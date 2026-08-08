'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';
import { gallery } from '@/content/gallery';

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Homes we have taken care of"
          intro="Every photo below was taken by us, on a real job, in a real Central Ohio home."
        />

        {/* CSS columns give a natural masonry flow for mixed portrait/landscape. */}
        <div className="mt-14 columns-2 gap-3 sm:gap-4 lg:mt-16 lg:columns-3 xl:columns-4">
          {gallery.map((image, index) => (
            <Reveal
              key={image.src}
              delay={(index % 4) * 70}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-xl shadow-soft transition-shadow duration-300 hover:shadow-lift"
                aria-label={`Open image: ${image.caption}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
                  loading="lazy"
                  className="w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-forest-950/75 via-forest-950/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <span className="text-left text-sm font-medium text-cream">
                    {image.caption}
                  </span>
                  <Expand className="size-4 shrink-0 text-gold-300" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={gallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
