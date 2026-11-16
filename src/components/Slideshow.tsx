"use client";

import { useState } from "react";

export type Slide = {
  src: string;
  alt: string;
  caption: string;
};

export function Slideshow({
  slides,
  previousLabel,
  nextLabel,
}: {
  slides: Slide[];
  previousLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const slide = slides[index];

  function step(direction: number) {
    setIndex((current) => (current + direction + count) % count);
  }

  return (
    <figure className="slideshow">
      <div className="slideshow-frame">
        <img src={slide.src} alt={slide.alt} />
      </div>
      <figcaption>
        <p>{slide.caption}</p>
        <p className="slideshow-nav">
          <button type="button" onClick={() => step(-1)} aria-label={previousLabel}>
            {previousLabel}
          </button>
          <span>
            {index + 1} / {count}
          </span>
          <button type="button" onClick={() => step(1)} aria-label={nextLabel}>
            {nextLabel}
          </button>
        </p>
      </figcaption>
    </figure>
  );
}
