"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import type { SoarPhase } from "@/lib/soarStory";

type FlatCard = {
  src: string;
  caption: string;
  phaseIndex: number;
  phaseNum: string;
  phaseTitle: string;
  phaseStart: boolean;
};

const cardVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 70 : -70, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -70 : 70, scale: 0.98 }),
};

export default function SoarDeck({ phases }: { phases: SoarPhase[] }) {
  const reduce = useReducedMotion();

  const cards = useMemo<FlatCard[]>(
    () =>
      phases.flatMap((ph, pi) =>
        ph.cards.map((c, ci) => ({
          src: c.src,
          caption: c.caption,
          phaseIndex: pi,
          phaseNum: ph.num,
          phaseTitle: ph.title,
          phaseStart: ci === 0,
        }))
      ),
    [phases]
  );

  // index of the first flat card for each phase (for the phase nav jumps)
  const phaseFirst = useMemo(() => {
    const out: number[] = [];
    let acc = 0;
    phases.forEach((ph) => {
      out.push(acc);
      acc += ph.cards.length;
    });
    return out;
  }, [phases]);

  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (target: number, direction: number) => {
      if (target < 0 || target >= cards.length) return;
      setState([target, direction]);
    },
    [cards.length]
  );

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  const card = cards[index];
  const activePhase = card.phaseIndex;
  const atStart = index === 0;
  const atEnd = index === cards.length - 1;

  return (
    <section
      className="deck"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
      aria-label="SOAR project, phase by phase"
    >
      {/* phase nav / table of contents */}
      <div className="deck-phases">
        {phases.map((ph, pi) => (
          <button
            key={ph.num}
            type="button"
            className={`deck-phase${pi === activePhase ? " active" : ""}`}
            onClick={() => go(phaseFirst[pi], pi >= activePhase ? 1 : -1)}
            aria-current={pi === activePhase}
          >
            <span className="deck-phase-num mono">{ph.num}</span>
            <span className="deck-phase-name">{ph.title}</span>
          </button>
        ))}
      </div>

      {/* active phase note */}
      <p className="deck-note">{phases[activePhase].note}</p>

      {/* stage */}
      <div className="deck-stage">
        <button
          type="button"
          className="deck-arrow prev"
          onClick={prev}
          disabled={atStart}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className="deck-stack">
          <div className="deck-ghost g2" aria-hidden="true" />
          <div className="deck-ghost g1" aria-hidden="true" />
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={index}
              className="deck-card"
              custom={dir}
              variants={cardVariants}
              initial={reduce ? false : "enter"}
              animate="center"
              exit={reduce ? { opacity: 0 } : "exit"}
              transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.src} alt={card.caption} draggable={false} />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="deck-arrow next"
          onClick={next}
          disabled={atEnd}
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* caption — pops in on each cycle */}
      <div className="deck-caption">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className="deck-kicker mono accent">
              Phase {card.phaseNum} · {card.phaseTitle}
            </p>
            <h3 className="deck-title">{card.caption}</h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* foot: progress dots + counter */}
      <div className="deck-foot">
        <div className="deck-dots" aria-hidden="true">
          {cards.map((c, i) => (
            <button
              key={c.src}
              type="button"
              className={`deck-dot${i === index ? " active" : ""}${c.phaseStart ? " phase-start" : ""}`}
              onClick={() => go(i, i >= index ? 1 : -1)}
              tabIndex={-1}
              aria-label={`Go to ${c.caption}`}
            />
          ))}
        </div>
        <span className="deck-count mono-sm muted">
          {String(index + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
