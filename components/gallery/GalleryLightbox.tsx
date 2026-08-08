'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { GalleryImage } from '@/content/gallery';

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

export default function GalleryLightbox({ images, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, index, images.length, onClose, onNavigate]);

  if (!open) return null;
  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${image.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-forest-950/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <p className="text-sm text-gold-200/70">
          {index + 1} / {images.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="rounded-full border border-gold-500/25 p-2.5 text-gold-200 transition hover:bg-gold-500/10"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-2 sm:px-16"
        onClick={(event) => {
          // Clicking the backdrop (but not the image) closes the viewer.
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + images.length) % images.length)}
          aria-label="Previous image"
          className="absolute left-2 z-10 rounded-full border border-gold-500/25 bg-forest-900/70 p-3 text-gold-200 transition hover:bg-forest-800 sm:left-4"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 640px) 92vw, 80vw"
          className="max-h-[74vh] w-auto rounded-xl object-contain shadow-lift"
        />

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % images.length)}
          aria-label="Next image"
          className="absolute right-2 z-10 rounded-full border border-gold-500/25 bg-forest-900/70 p-3 text-gold-200 transition hover:bg-forest-800 sm:right-4"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <p className="px-6 pb-8 pt-3 text-center font-display text-xl text-gold-200">
        {image.caption}
      </p>
    </div>
  );
}
