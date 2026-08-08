'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { beforeAfter, type BeforeAfterPair } from '@/content/gallery';

function Slider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const { left, width } = frame.getBoundingClientRect();
    const next = ((clientX - left) / width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <figure>
      <div
        ref={frameRef}
        className="relative aspect-[3/4] w-full select-none overflow-hidden rounded-2xl bg-forest-950 shadow-lift"
        onPointerDown={(event) => {
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging.current) setFromClientX(event.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        {/* After sits underneath; the before layer is clipped over the top. */}
        <Image
          src={pair.after.src}
          alt={pair.after.alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
          loading="lazy"
          className="pointer-events-none object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.before.src}
            alt={pair.before.alt}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
            loading="lazy"
            className="pointer-events-none object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-forest-950/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-200 backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold-500/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-forest-900">
          After
        </span>

        {/* Divider */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-gold-300"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/60 bg-forest-900/90 shadow-lift backdrop-blur-sm">
            <MoveHorizontal className="size-5 text-gold-300" aria-hidden="true" />
          </span>
        </div>

        {/* The real control: keyboard-accessible and screen-reader friendly. */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Reveal the before and after of the ${pair.label.toLowerCase()}`}
          className={cn(
            'absolute inset-0 h-full w-full cursor-ew-resize opacity-0',
            'focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400',
          )}
        />
      </div>

      <figcaption className="mt-4">
        <p className="font-display text-xl text-forest-900">{pair.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-forest-900/65">{pair.note}</p>
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter() {
  // Hidden entirely while there are no genuine matched pairs.
  if (beforeAfter.length === 0) return null;

  return (
    <section id="before-after" className="bg-sand py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Before & After"
          title="See the difference"
          intro="Real photos from real visits. Drag the handle on any image to compare. Nothing here is staged or borrowed."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {beforeAfter.map((pair, index) => (
            <Reveal key={pair.id} delay={(index % 3) * 90}>
              <Slider pair={pair} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
