"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const IMG = {
  sketches: "/img/pi-stool/02deafbc-92f9-41c0-9fc6-dbf7448b3c86.jpg",
  cncSheet: "/img/pi-stool/6635a087-abc7-4209-b508-39871c542bff.jpg",
  render: "/img/pi-stool/90d0a320-1953-4fe3-ba87-e388abbf2b15.jpg",
  atHome: "/img/pi-stool/be19e28e-5de6-4a8c-801f-db87458e3af4.jpg",
  workshop: "/img/pi-stool/f938c985-4e1a-488a-b31e-c7319ad74e00.jpg",
};

const COPY = {
  concept:
    "The stool takes its name — and its side profile — from π. In mathematics the symbol stands for simplicity and balance, and the stool borrows both: a clean, minimal shape that stays functional and modern, reduced until only the essential geometry is left.",
  ideation:
    "Sketching searched for a silhouette that reads as the symbol from the side — a flat seat carried on two legs — while staying stable enough to sit on and simple enough to build. Thumbnail after thumbnail tuned the proportions, the curve of the legs, and where a shelf could tie the form together.",
  design:
    "In CAD the silhouette resolved into one continuous profile: a cantilevered seat over two curved legs, with a low shelf between them. A woven cushion softens the top without breaking the line.",
  makingLede:
    "The π looks effortless; the legs are where it gets hard. One continuous curve can be made two very different ways — and the workshop, not the drawing, decided which.",
  fabrication:
    "The built method is honest about its trade-offs. Identical profiles were CNC-milled from a single sheet on the ShopBot, then glued up into each leg, and the whole stool was hand-assembled and sanded smooth. More material and a little hand-done unevenness — in exchange for a form that could actually be made in the time available.",
  payoff:
    "Finished, cushioned, and slid into a corner of a small apartment — table height, backless, out of the way until it is needed. Its first and most honest review came fast.",
  closing: "Quiet, balanced, and made to be built.",
};

const PARTS = [
  { n: "01", title: "Seat top", body: "The bar of the π — a flat plane cantilevered over the legs, wide enough to sit on and to set something down." },
  { n: "02", title: "Cushion", body: "A woven, padded top that adds sit-comfort without interrupting the clean horizontal line of the seat." },
  { n: "03", title: "The π legs", body: "The two curved side legs that give the stool its symbol silhouette — each built up from stacked birch-ply laminations." },
  { n: "04", title: "Lower shelf", body: "A horizontal plane set between the legs. It stiffens the whole form and doubles as a spot to stash a book or a bag." },
];

const METHODS = {
  bend: {
    tag: "PLAN A",
    title: "Mold + kerf bend",
    body: "The first plan bent a single sheet of ply around a mold, with kerf cuts on the inside face letting it wrap the curve in one continuous piece. The cleanest possible version of the form — but the time and the support needed to hold the bend made it unfeasible in the shop, and the sketches flagged a possible weak point right at the bend.",
  },
  stack: {
    tag: "PLAN B",
    title: "Stacked CNC",
    body: "The built answer: CNC-cut a stack of identical profiles that trace the leg outline, then glue them up to the width and thickness the design calls for. Buildable in the time available and structurally sound — at the cost of more material, more waste, and the small unevenness that comes from stacking by hand.",
  },
} as const;

const SPECS = [
  { k: "Fabrication", v: "CNC-milled on a ShopBot, then hand-assembled and sanded." },
  { k: "Material", v: "Baltic birch ply · ¾″ furniture-grade plywood." },
  { k: "Type", v: "A backless, table-height stool." },
];

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

function MakeSelector() {
  const keys = ["bend", "stack"] as const;
  const [active, setActive] = useState<(typeof keys)[number]>("bend");
  const m = METHODS[active];
  return (
    <div>
      <div className="ss-fork-tabs" role="tablist" aria-label="Leg fabrication methods">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={active === k}
            className={`ss-fork-tab${active === k ? " active" : ""}`}
            onClick={() => setActive(k)}
          >
            {METHODS[k].title}
          </button>
        ))}
      </div>
      <div className="ss-fork-body" key={active}>
        <p className="ss-fork-tag mono accent">{m.tag}</p>
        <h4 className="ss-fork-title">{m.title}</h4>
        <p className="ss-body">{m.body}</p>
      </div>
    </div>
  );
}

function Anatomy() {
  const [active, setActive] = useState(0);
  return (
    <div className="ss-build">
      <Reveal className="ss-build-fig">
        <div className="ss-fig-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.render} alt="CAD render of the PI Stool from three angles — seat, curved legs and lower shelf" loading="lazy" decoding="async" />
        </div>
      </Reveal>
      <div className="ss-build-panel">
        <ol className="ss-build-list">
          {PARTS.map((p, i) => (
            <li key={p.n}>
              <button
                type="button"
                className={`ss-build-btn${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
                aria-expanded={i === active}
              >
                <span className="ss-build-n mono">{p.n}</span>
                <span className="ss-build-t">{p.title}</span>
              </button>
              {i === active && <p className="ss-build-body">{p.body}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function PiStoolCase() {
  return (
    <div className="ss">
      {/* 01 — CONCEPT */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="Concept" title="The Symbol π" />
        <Reveal className="ss-lede">
          <p className="ss-def">A backless table stool with a minimalistic design.</p>
          <p className="ss-body">{COPY.concept}</p>
        </Reveal>
        <Reveal as="blockquote" className="ss-bigq"><p>Simplicity and balance — reduced to a single line.</p></Reveal>
      </section>

      {/* 02 — IDEATION */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="Ideation" title="Finding the Form" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.ideation}</p></Reveal>
        <Fig
          src={IMG.sketches}
          alt="Ideation sheet — silhouette thumbnails, isometric concepts and dimensioned drawings for the PI Stool"
          wide
          caption="Silhouette studies, a stackable concept, and the first dimensioned drawings — all on one sheet"
        />
      </section>

      {/* 03 — DESIGN */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Design" title="The Resolved Form" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.design}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Anatomy of the π — select a part</p>
          <Anatomy />
        </Reveal>
      </section>

      {/* 04 — MAKING */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="Making" title="Two Ways to Make a Leg" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.makingLede}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">The fork in the road — select a method</p>
          <MakeSelector />
        </Reveal>
      </section>

      {/* 05 — FABRICATION */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Fabrication" title="Cut, Stack, Sand" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.fabrication}</p></Reveal>
        <Fig
          src={IMG.cncSheet}
          alt="Baltic birch sheet on the ShopBot CNC bed, nested with the stool's stacked leg profiles"
          wide
          caption="One sheet, nested tight — every identical profile the legs stack up from"
        />
        <Fig
          src={IMG.workshop}
          alt="The raw plywood stool assembled on the workbench, its stacked-ply laminations visible, beside a sander"
          wide
          caption="Off the ShopBot and glued up — the stacked laminations reading straight through the raw ply"
        />
        <div className="ss-brief">
          {SPECS.map((s, i) => (
            <Reveal className="ss-brief-row" key={s.k} delay={i * 70}>
              <span className="ss-brief-k mono accent">{s.k}</span>
              <span className="ss-brief-v">{s.v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — PAYOFF */}
      <section className="ss-chapter">
        <ChapterHead num="06" kicker="Payoff" title="At Home" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.payoff}</p></Reveal>
        <Fig
          src={IMG.atHome}
          alt="The finished PI Stool at home in a studio apartment — cushioned, and with a cat sitting on top"
          wide
          caption="In a studio, cushioned, and immediately claimed by the client"
        />
        <Reveal className="ss-block">
          <blockquote className="ss-quote">{`“I love it, it is very comfortable. I am very happy.”`}</blockquote>
          <p className="ss-attrib mono-sm muted">Toph · the designer&rsquo;s cat, and the stool&rsquo;s first and most honest reviewer</p>
        </Reveal>
        <Reveal className="ss-closing">
          <p className="ss-closing-big display">Simple as π.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
