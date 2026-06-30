"use client";

import { useCallback, useEffect, useState } from "react";

// Global click-to-zoom. Listens (via delegation) for clicks on any case-study
// image — figures, persona/build images (all wrapped in .ss-fig-img), project
// covers, and rabbit gallery plates — and opens it full-resolution over a
// blurred backdrop. No per-image wiring needed.
const ZOOMABLE = ".ss-fig-img, .proj-cover, .plate-img";

export default function Lightbox() {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || target.tagName !== "IMG") return;
      if (!target.closest(ZOOMABLE)) return;
      e.preventDefault();
      const el = target as HTMLImageElement;
      setImg({ src: el.currentSrc || el.src, alt: el.alt || "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = useCallback(() => setImg(null), []);

  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [img, close]);

  if (!img) return null;

  return (
    <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button type="button" className="lightbox-close" onClick={close} aria-label="Close image">
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lightbox-img" src={img.src} alt={img.alt} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
