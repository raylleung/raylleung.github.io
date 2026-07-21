"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const IMG = {
  positioning: "/img/soar/41e7f335-8d5a-4759-92a4-5ad23b3ca5ff.jpg",
  brandDna: "/img/soar/faa2c899-ee3c-4518-af00-ab3ff3ff151e.jpg",
  moodA: "/img/soar/34ff4d1a-d55e-4433-87c3-c5ab020a3559.jpg",
  moodAmat: "/img/soar/81b70f8e-f708-4a62-8db8-cdb44afa79d3.jpg",
  moodB: "/img/soar/76c6aefd-1c18-4ee6-904c-a8da42f726d9.jpg",
  moodBmat: "/img/soar/a3ef7413-8c0b-4a21-b970-e8fc85c3a327.jpg",
  moodC: "/img/soar/2a36a817-85e0-44b1-8fb3-f9953f26520f.jpg",
  moodCmat: "/img/soar/e66a003f-5312-4383-a7f0-26bafa522e37.jpg",
  sketches: "/img/soar/7399bd4d-083f-4fe5-901c-9e9e0b7ea55b.jpeg",
  conceptOverview: "/img/soar/d05a3b43-81e2-438a-bf8b-5fe60a4850b7.jpg",
  conceptC: "/img/soar/c5167b11-366f-4191-a9bf-e1cfc41a06ed.jpg",
  techConstruction: "/img/soar/627fff87-8309-4a56-a907-561dfe3d53f1.jpg",
  techUpper: "/img/soar/bd67592f-c8d5-4fb5-9054-023d6616935f.jpg",
  techOutsole: "/img/soar/1fea4d1c-85eb-4815-b8b3-60320e12b3d6.jpg",
  colorOverview: "/img/soar/3644d18e-8dc2-4ff3-9739-2d28002b53cc.jpg",
  colorRange: "/img/soar/31e9faa2-629b-4096-9ca5-ad9b6a837da1.jpg",
  colorFinal: "/img/soar/73a9abe7-c203-4b09-95bd-22b726b39e92.jpg",
  protoSpotted: "/img/soar/3b781a83-12aa-4e41-a18e-23ccfd9a4019.png",
  protoResponse: "/img/soar/5f3a0d83-5a1c-479b-938b-a0ee2168b211.png",
};

const COPY = {
  research:
    "SOAR set out to move into racing footwear with a clear point of view. The work opened by reading the field — mapping where today's fast shoes sit and what each one promises — and pulling the brand's own DNA out of that landscape, so every decision downstream had a fixed reference to measure against.",
  moodIntro:
    "Three directions carried that DNA into a look and feel — Future Fast, Tone Flow, and Urban Form — each a different answer in color, material, and texture. Select one:",
  concept:
    "The strongest cues were pulled forward into concept sketches, then narrowed to three buildable concepts — A · B · C.",
  techPack:
    "The chosen concept had to become buildable. The tech pack broke it down part by part — construction, materials, and dimensioned call-outs across every view — the document a factory could actually make the shoe from. Its signatures: a velcro-strap “lacing” system, a translucent CPU outsole, and a stretch-knit upper.",
  color:
    "Color took the concept from a broad exploration to one resolved story — a full grid of options narrowed to a single direction.",
  proto:
    "The design didn't stay on the page. The Soar Tempo Trainer prototype was built and shown at The Running Event — and the running world noticed, with an up-close look landing on running-media feeds the same weekend.",
  closing: "SOAR's first step into footwear — research, color, and a full tech pack, start to finish.",
};

const DIRECTIONS = {
  A: {
    tab: "Future Fast",
    board: IMG.moodA,
    mat: IMG.moodAmat,
    desc: "Speed as the whole story: neo-futurist architecture, high-energy gradients, and op-art — sharp, engineered, and unmistakably built to race.",
  },
  B: {
    tab: "Tone Flow",
    board: IMG.moodB,
    mat: IMG.moodBmat,
    desc: "A softer, more tonal read — motion carried through gradient, graphic, and texture rather than hard edges.",
  },
  C: {
    tab: "Urban Form",
    board: IMG.moodC,
    mat: IMG.moodCmat,
    desc: "The racing shoe pulled toward the street — structural and material-led, at home off the track as well as on it.",
  },
} as const;

/* ---------- helpers ---------- */

function Fig({ src, alt, caption, wide }: { src: string; alt: string; caption?: string; wide?: boolean }) {
  return (
    <Reveal className={`ss-fig${wide ? " ss-fig--wide" : ""}`}>
      <div className="ss-fig-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {caption ? <p className="ss-cap mono-sm muted">{caption}</p> : null}
    </Reveal>
  );
}

function ChapterHead({ num, kicker, title }: { num: string; kicker: string; title: string }) {
  return (
    <Reveal className="ss-chapter-head">
      <p className="chapter-kicker mono accent">{num} — {kicker}</p>
      <h2 className="ss-chapter-title">{title}</h2>
    </Reveal>
  );
}

function DirectionSwitcher() {
  const keys = ["A", "B", "C"] as const;
  const [active, setActive] = useState<(typeof keys)[number]>("A");
  const d = DIRECTIONS[active];
  return (
    <div>
      <div className="ss-fork-tabs" role="tablist" aria-label="Moodboard directions">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={active === k}
            className={`ss-fork-tab${active === k ? " active" : ""}`}
            onClick={() => setActive(k)}
          >
            {DIRECTIONS[k].tab}
          </button>
        ))}
      </div>
      <div className="ss-swap" key={active}>
        <div className="ss-two">
          <div className="ss-fig">
            <div className="ss-fig-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.board} alt={`${d.tab} moodboard`} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="ss-fig">
            <div className="ss-fig-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.mat} alt={`${d.tab} — materials & finish`} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <p className="ss-fork-tag mono accent">Direction {active} — {d.tab}</p>
        <p className="ss-body">{d.desc}</p>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function SoarCase() {
  return (
    <div className="ss">
      {/* 01 — RESEARCH */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="Research" title="Reading the Field" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.research}</p></Reveal>
        <Fig src={IMG.positioning} alt="Competitive positioning map of the racing-shoe field" wide caption="The racing-shoe field, mapped by positioning — and the space SOAR could own." />
        <Fig src={IMG.brandDna} alt="Brand DNA board" caption="Brand DNA — the throughline every later choice answers to." />
      </section>

      {/* 02 — DIRECTIONS */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="Direction" title="Three Directions" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.moodIntro}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Moodboards — select a direction</p>
          <DirectionSwitcher />
        </Reveal>
        <Reveal className="ss-lede"><p className="ss-body">{COPY.concept}</p></Reveal>
        <Fig src={IMG.sketches} alt="First concept sketches for the SOAR racing shoe" caption="First concept sketches." />
        <div className="ss-two">
          <Fig src={IMG.conceptOverview} alt="Three concepts side by side — A, B, C" caption="Three concepts, side by side — A · B · C." />
          <Fig src={IMG.conceptC} alt="Concept C — the chosen direction" caption="Concept C — the direction carried forward." />
        </div>
      </section>

      {/* 03 — TECH PACK */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Making" title="The Tech Pack" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.techPack}</p></Reveal>
        <Fig src={IMG.techConstruction} alt="Full tech pack — construction and spec across every view" wide caption="The full technical package — every view, called out." />
        <div className="ss-two">
          <Fig src={IMG.techUpper} alt="Upper — materials and call-outs" caption="Upper — materials & call-outs." />
          <Fig src={IMG.techOutsole} alt="Outsole and footbed — call-outs" caption="Outsole & footbed — call-outs." />
        </div>
      </section>

      {/* 04 — COLOR */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="Resolution" title="Color Design" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.color}</p></Reveal>
        <Fig src={IMG.colorOverview} alt="Colorway concepts — the full grid A to C" wide caption="Colorway concepts — the full grid, A–C." />
        <div className="ss-two">
          <Fig src={IMG.colorRange} alt="The colorway range explored" caption="The range explored." />
          <Fig src={IMG.colorFinal} alt="The final color direction" caption="The final color direction." />
        </div>
      </section>

      {/* 05 — PROTOTYPE */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Payoff" title="Spotted in the Wild" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.proto}</p></Reveal>
        <div className="ss-two">
          <Fig src={IMG.protoSpotted} alt="The Soar Tempo Trainer prototype at The Running Event" caption="The Soar Tempo Trainer prototype, up close at The Running Event." />
          <Fig src={IMG.protoResponse} alt="Running-media coverage of the SOAR prototype" caption="Picked up by running media the same weekend — “one of the most unique shoes we saw.”" />
        </div>
        <Reveal className="ss-closing">
          <p className="ss-closing-big display">From a read of the field to a shoe worth photographing.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
