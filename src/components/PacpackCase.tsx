"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const IMG = {
  terminal: "/img/pacpack/c8abd028-e47a-46e8-80dd-2af5188ad3a0.jpg",
  research: "/img/pacpack/c4662e73-fd2c-42db-9124-0ff2de3e6e44.jpg",
  ideation: "/img/pacpack/149043f1-1d1f-4505-b8a3-fbb4efe5c05d.jpg",
  prototypes: "/img/pacpack/4499fdb8-4c98-4a42-8a5c-dce146ff799c.jpg",
  carry: "/img/pacpack/67ed8943-796e-4af1-a1dd-7991ca1d02e9.png",
  rest: "/img/pacpack/af710884-e9c1-48ec-be02-841d3ea2b705.png",
  bin: "/img/pacpack/ccad7947-bb37-4d7c-93ee-83aa6d9f439e.png",
  exploded: "/img/pacpack/d1dc90e7-d8b0-4e89-bf13-8c97768b93c0.jpg",
  messenger: "/img/pacpack/3cac3432-070d-4636-8695-88e24d16ec12.png",
};

const COPY = {
  context:
    "PACpack started with a bad night at Haneda. A heavy snowstorm grounded the flights, the terminal filled past capacity, and there was nowhere comfortable to wait it out — just a cold floor and a carry-on that was no help at all.",
  research:
    "Layovers turn everyone into the same person: someone trying to get horizontal in a place built to keep them upright. Studying how travelers cope — curled on benches, stretched out on floors — ran alongside a look at one-bag travel, where a single carry-on has to hold, organize, and adapt to a whole trip.",
  briefObjective: "Design a carry-on-friendly backpack that makes traveling more pleasant.",
  brief:
    "One bag for the whole trip — but one that gives something back. The idea: a weather-resistant exterior cover that folds out into a padded resting area, on a pack still sized to fly as a carry-on.",
  ideation:
    "Sketching worked two problems at once: a silhouette that carries like a proper one-bag pack, and an outer shell that could fold out flat — into a mat, a seat, a headrest — and fold back without fighting the bag it wraps.",
  prototyping:
    "Origami paper studies found the fold first — how flat panels could collapse and open predictably. Foam-and-fabric mockups then took it into soft goods, testing the shell, the padding, and the fold-out on something you could actually lie on.",
  modesLede: "The result is one bag with two modes. Cinched, it flies. Opened, it rests.",
  anatomyLede: "Every part earns its place in a one-bag build — then folds back into a shape that still flies.",
  messengerLede:
    "THE MESSENGER is PACpack's companion — an accessory folded, origami-style, from flat panels into a structured bag. Carry it on its own as a shoulder bag, or dock it onto the pack as the detachable upper compartment.",
  closing: "The perfect bag for one-carry travel — layovers, weekend trips, and picnics included.",
};

const FEATURES = [
  { k: "Fold-out cover", v: "A weather-resistant exterior cover that folds out into a resting area." },
  { k: "Padded comfort", v: "Cushioning in the cover, so the resting area is one you would actually use." },
  { k: "Main compartment", v: "A single large volume for the bigger personal items of a full trip." },
  { k: "Detachable top", v: "A removable upper compartment for smaller items that need easy access." },
  { k: "Carry-on legal", v: "Sized to comply with airline carry-on requirements." },
];

const MODES = {
  carry: {
    tag: "MODE 01",
    title: "Carry",
    body: "Cinched shut, PACpack is a compliant one-bag carry-on: a single large compartment for the bulk of a trip, a detachable upper pocket for what you need fast, and padded straps to wear it through the terminal — sized to fit the overhead bin.",
    img: IMG.carry,
    alt: "A traveler wearing PACpack as a backpack in an airport terminal",
  },
  rest: {
    tag: "MODE 02",
    title: "Rest",
    body: "At the gate, the weather-resistant cover unfolds into a padded surface — a mat to sit or stretch out on, with a firm wedge that props your head. A long delay on a cold floor turns into somewhere you can actually wait it out.",
    img: IMG.rest,
    alt: "A traveler lying at an airport gate, head resting on PACpack's folded-out padded cover",
  },
} as const;

const PARTS = [
  { n: "01", title: "Fold-out cover", body: "The weather-resistant outer shell. Unclipped, its panels unfold and lay flat into the resting surface." },
  { n: "02", title: "Padded wedge", body: "Foam inside the cover gives the resting area its shape — a raised wedge to prop your head, firm enough to sit on." },
  { n: "03", title: "Main compartment", body: "The one-bag core: a single large volume for the bulk of a trip's belongings." },
  { n: "04", title: "Detachable top", body: "A smaller upper compartment for the things you need on hand. It unclips to become THE MESSENGER — a bag of its own." },
  { n: "05", title: "Carry straps", body: "Padded shoulder straps to wear it as a backpack through the terminal." },
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

function ModeSelector() {
  const keys = ["carry", "rest"] as const;
  const [active, setActive] = useState<(typeof keys)[number]>("carry");
  const m = MODES[active];
  return (
    <div>
      <div className="ss-fork-tabs" role="tablist" aria-label="Bag modes">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={active === k}
            className={`ss-fork-tab${active === k ? " active" : ""}`}
            onClick={() => setActive(k)}
          >
            {MODES[k].title}
          </button>
        ))}
      </div>
      <div className="ss-two ss-swap" key={active}>
        <div className="ss-fig-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.img} alt={m.alt} loading="lazy" decoding="async" />
        </div>
        <div>
          <p className="ss-fork-tag mono accent">{m.tag}</p>
          <h4 className="ss-fork-title">{m.title}</h4>
          <p className="ss-body">{m.body}</p>
        </div>
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
          <img src={IMG.exploded} alt="Exploded view of PACpack — fold-out cover, padded wedge, main compartment, detachable top and straps" loading="lazy" decoding="async" />
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

export default function PacpackCase() {
  return (
    <div className="ss">
      {/* 01 — CONTEXT */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="Context" title="A Layover Gone Wrong" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.context}</p></Reveal>
        <Fig
          src={IMG.terminal}
          alt="A crowded airport terminal full of stranded travelers during a delay"
          wide
          caption="Snowed in and past capacity — a terminal with nowhere left to rest"
        />
        <Reveal as="blockquote" className="ss-bigq"><p>Where do you rest when the airport has nowhere to sit?</p></Reveal>
      </section>

      {/* 02 — RESEARCH */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="Research" title="How Travelers Cope" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.research}</p></Reveal>
        <Fig
          src={IMG.research}
          alt="Research collage — travelers sleeping in airports, one-bag travel kits, and travel backpacks"
          wide
          caption="Layover naps, one-bag kits, and the packs people already trust — the field PACpack enters"
        />
      </section>

      {/* 03 — THE BRIEF */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Direction" title="The Brief" />
        <Reveal className="ss-lede">
          <p className="ss-def">{COPY.briefObjective}</p>
          <p className="ss-body">{COPY.brief}</p>
        </Reveal>
        <div className="ss-brief">
          {FEATURES.map((f, i) => (
            <Reveal className="ss-brief-row" key={f.k} delay={i * 70}>
              <span className="ss-brief-k mono accent">{f.k}</span>
              <span className="ss-brief-v">{f.v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — IDEATION */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="Ideation" title="Sketching the Fold" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.ideation}</p></Reveal>
        <Fig
          src={IMG.ideation}
          alt="Ideation sheet — bag silhouettes and studies of the outer shell folding out into a mat, seat and pillow"
          wide
          caption="Two problems on one sheet — how it carries, and how the shell folds out and back"
        />
      </section>

      {/* 05 — PROTOTYPING */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Making" title="Paper to Fabric" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.prototyping}</p></Reveal>
        <Fig
          src={IMG.prototypes}
          alt="Origami paper folding studies alongside foam-and-fabric mockups of the pack and its fold-out cover"
          wide
          caption="Paper found the fold; foam and fabric made it something you could lie on"
        />
      </section>

      {/* 06 — TWO MODES */}
      <section className="ss-chapter">
        <ChapterHead num="06" kicker="Resolution" title="Carry, Then Rest" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.modesLede}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">One bag, two modes — select one</p>
          <ModeSelector />
        </Reveal>
      </section>

      {/* 07 — INSIDE THE PACK */}
      <section className="ss-chapter">
        <ChapterHead num="07" kicker="Construction" title="Inside the Pack" />
        <Reveal className="ss-lede"><p className="ss-body ss-narrow">{COPY.anatomyLede}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Exploded view — select a part</p>
          <Anatomy />
        </Reveal>
        <Fig
          src={IMG.bin}
          alt="PACpack fitting inside an airplane overhead bin alongside other bags"
          wide
          caption="Still a carry-on — the whole thing fits the overhead bin"
        />
      </section>

      {/* 08 — THE MESSENGER */}
      <section className="ss-chapter">
        <ChapterHead num="08" kicker="Accessory" title="The Messenger" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.messengerLede}</p></Reveal>
        <Fig
          src={IMG.messenger}
          alt="THE MESSENGER accessory worn as a shoulder bag at a hotel reception, with PACpack standing alongside"
          wide
          caption="THE MESSENGER — on its own as a shoulder bag, or docked as the pack's upper compartment"
        />
        <Reveal className="ss-closing">
          <p className="ss-closing-big display">One bag. Somewhere to rest.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
