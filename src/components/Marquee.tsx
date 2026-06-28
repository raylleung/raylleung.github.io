"use client";

import { useEffect, useRef, useState } from "react";

const SPEED = 70; // px per second — constant feel regardless of width

export default function Marquee({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [shift, setShift] = useState<number | null>(null);
  const [dur, setDur] = useState(24);

  useEffect(() => {
    const container = containerRef.current;
    const set = setRef.current;
    if (!container || !set) return;

    const measure = () => {
      const setW = set.getBoundingClientRect().width;
      const cW = container.getBoundingClientRect().width;
      if (setW < 1) return;
      // enough sets to always overfill the viewport + one spare for the wrap
      setCopies(Math.max(2, Math.ceil(cW / setW) + 1));
      setShift(setW);
      setDur(setW / SPEED);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(set);
    return () => ro.disconnect();
  }, [items]);

  const trackStyle =
    shift != null
      ? ({ "--shift": `${shift}px`, animationDuration: `${dur}s` } as React.CSSProperties)
      : undefined;

  return (
    <div className="marquee" aria-hidden="true" ref={containerRef}>
      <div className="marquee-track" style={trackStyle}>
        {Array.from({ length: copies }).map((_, r) => (
          <div className="marquee-set" key={r} ref={r === 0 ? setRef : undefined}>
            {items.map((it, i) => (
              <span className="marquee-item" key={i}>
                {it}
                <span className="sep">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
