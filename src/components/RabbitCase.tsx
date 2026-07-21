"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const img = (f: string) => `/img/rabbit/${f}`;

const IMG = {
  positioning: img("3a6c0199-2e0b-4803-80b5-6d4aedc6c1fd.jpg"),
  trainingWeek: img("2ee52bff-2081-4891-816c-eb2acf384dfd.jpg"),
  paceMapping: img("55178ab8-1946-40d4-b5ba-16df129bc33c.jpg"),
  brandDna: img("63f5b544-fca8-4a9c-8105-8bec5100e699.jpg"),
  cmf: img("016de4a5-6d23-493c-be13-d5b255140b6f.jpg"),
  creative: img("d705fa93-c154-4d6e-b187-07245c45afad.jpg"),
  conceptOverview: img("4bbd162a-bc2d-4438-917d-4361d13166a9.jpg"),
  conceptB: img("73626e1c-64fd-429d-a562-08dd0b51a8fc.jpg"),
  techConstruction: img("0fe80fc2-e24f-47af-a075-e7adfd40ff96.jpg"),
  techViews: img("6e6c9747-7b7f-4683-abb3-14c5c02e1c2e.jpg"),
  colorOverview: img("6b185407-3261-418f-81ed-5d01ada9eaaa.jpg"),
  dirAupper: img("666df22a-fabf-4c7a-933d-0a0715428b5e.jpg"),
  dirAoutsole: img("0626fb9b-3b71-492e-9335-b5c008977e45.jpg"),
  dirBupper: img("1a47cef5-bdc0-44b7-b541-04931a41e932.jpg"),
  dirBoutsole: img("ca0884a1-1b4e-43b2-9fdd-e2604d530e72.jpg"),
  dirCupper: img("174456c6-2a75-4534-a012-e8c4757d301c.jpg"),
  dirCoutsole: img("2194794d-3dfc-4c1f-9af6-d3caf6629a3a.jpg"),
  outsoleA: img("7300ce31-c2aa-451b-a243-85c8c0506607.jpg"),
  outsoleB: img("e5cd71e6-6751-4ee4-929c-a6a138e889d4.jpg"),
  apparelWomen: img("413f7dd1-2dee-425c-9df3-158ac7a49082.jpg"),
  apparelMen: img("f91d7934-305b-4f7e-9291-63a97d570e82.jpg"),
};

const COPY = {
  research:
    "rabbit's step into racing footwear opened the way every fast shoe should — with the runner. I mapped the competitive field, the rhythm of a training week, and the paces runners actually race, pinpointing where a new super-trainer could earn its place.",
  moodIntro:
    "From the brand's DNA to color, texture, and form references, the feeling was translated into a clear creative direction — then pushed into the first concept sketches and narrowed to three: A · B · C.",
  techPack:
    "The chosen concept had to become buildable. The tech pack broke it down part by part — construction, materials, and dimensioned call-outs across every view. Its signatures: a Carbon Trax plate, a stretch-knit upper, a translucent CPU outsole, and a Blumaka insole.",
  colorIntro:
    "With the collection's palette as the reference, three color directions were taken end to end — a full colorway grid across men's, women's, and a core line, with dedicated upper, outsole, and trim call-outs for each. Select a direction:",
  outsole:
    "Each direction carried its own outsole color study — the last surface a runner sees before the shoe hits the ground.",
  collection:
    "The shoe had to land inside a bigger story. rabbit's Cadence Collection — the season's apparel line — set the palette first, so the footwear color work had a fixed reference to match.",
  closing: "rabbit's Pace Chaser — research, tech pack, and a color story drawn from the collection it runs with.",
};

const DIRECTIONS = {
  A: {
    tab: "Direction A",
    upper: IMG.dirAupper,
    outsole: IMG.dirAoutsole,
    desc: "The hero colorway — flo-pink and flo-yellow over a purple-to-blue gradient, with call-outs for every material and trim.",
  },
  B: {
    tab: "Direction B",
    upper: IMG.dirBupper,
    outsole: IMG.dirBoutsole,
    desc: "A second read of the gradient family — the same energy, tuned to a different balance of color.",
  },
  C: {
    tab: "Direction C",
    upper: IMG.dirCupper,
    outsole: IMG.dirCoutsole,
    desc: "The core direction — pared back to a cleaner yellow, black, and white palette.",
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

function ColorwaySwitcher() {
  const keys = ["A", "B", "C"] as const;
  const [active, setActive] = useState<(typeof keys)[number]>("A");
  const d = DIRECTIONS[active];
  return (
    <div>
      <div className="ss-fork-tabs" role="tablist" aria-label="Colorway directions">
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
              <img src={d.upper} alt={`${d.tab} — upper & materials`} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="ss-fig">
            <div className="ss-fig-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.outsole} alt={`${d.tab} — outsole & trims`} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <p className="ss-fork-tag mono accent">{d.tab}</p>
        <p className="ss-body">{d.desc}</p>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function RabbitCase() {
  return (
    <div className="ss">
      {/* 01 — RESEARCH */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="Research" title="Reading the Field" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.research}</p></Reveal>
        <Fig src={IMG.positioning} alt="Competitive positioning map of the racing-shoe field" wide caption="The racing-shoe field, mapped by positioning — and the lane rabbit could own." />
        <div className="ss-two">
          <Fig src={IMG.trainingWeek} alt="A training week translated into footwear strategy" caption="A training week, translated into footwear strategy." />
          <Fig src={IMG.paceMapping} alt="Pace and corral mapping" caption="Pace & corral mapping — where the shoe actually races." />
        </div>
      </section>

      {/* 02 — DIRECTION */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="Direction" title="Moodboards & Concept" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.moodIntro}</p></Reveal>
        <Fig src={IMG.brandDna} alt="Brand DNA moodboard" caption="Brand DNA — the throughline for every later choice." />
        <div className="ss-two">
          <Fig src={IMG.cmf} alt="CMF inspiration — color, material, finish" caption="CMF inspiration — color, material, finish." />
          <Fig src={IMG.creative} alt="Creative inspiration board" caption="Creative inspiration." />
        </div>
        <Fig src={IMG.conceptOverview} alt="Three concepts side by side — A, B, C" wide caption="Three concepts, side by side — A · B · C." />
        <Fig src={IMG.conceptB} alt="Concept B — the chosen direction" caption="Concept B — the direction carried forward." />
      </section>

      {/* 03 — TECH PACK */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Making" title="The Tech Pack" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.techPack}</p></Reveal>
        <Fig src={IMG.techConstruction} alt="Full tech pack — construction and spec across every view" wide caption="The full technical package — every view, called out." />
        <Fig src={IMG.techViews} alt="Construction detail views" caption="Construction detail." />
      </section>

      {/* 04 — THE COLLECTION (sets the palette the shoe answers to) */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="Reference" title="The Cadence Collection" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.collection}</p></Reveal>
        <div className="ss-two">
          <Fig src={IMG.apparelWomen} alt="Cadence Collection — women's apparel" caption="Cadence Collection — women's." />
          <Fig src={IMG.apparelMen} alt="Cadence Collection — men's apparel" caption="Cadence Collection — men's." />
        </div>
      </section>

      {/* 05 — COLOR DESIGN (matched back to the collection) */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Resolution" title="Color Design" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.colorIntro}</p></Reveal>
        <Fig src={IMG.colorOverview} alt="Colorway concepts — men's, women's, and core" wide caption="Colorway concepts — men's, women's, and core, A–C." />
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Color directions — select one</p>
          <ColorwaySwitcher />
        </Reveal>
        <Reveal className="ss-lede"><p className="ss-body">{COPY.outsole}</p></Reveal>
        <div className="ss-two">
          <Fig src={IMG.outsoleA} alt="Outsole color study — Direction A" caption="Outsole study — Direction A." />
          <Fig src={IMG.outsoleB} alt="Outsole color study — Direction B" caption="Outsole study — Direction B." />
        </div>
        <Reveal className="ss-closing">
          <p className="ss-closing-big display">Head to toe, one story.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
