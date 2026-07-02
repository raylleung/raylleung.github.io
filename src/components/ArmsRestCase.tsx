"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const IMG = {
  research: "/img/armsrest/9babd771-2c35-4730-8e78-69501fae93b5.jpg",
  paperclip: "/img/armsrest/a5818ec5-e517-496a-ae67-7e0361b391ef.jpg",
  sketches: "/img/armsrest/6cb88499-ba7d-4dad-807b-283cea7b314d.jpg",
  forms: "/img/armsrest/b3102daf-defd-4dc9-af47-6151ea69073e.jpg",
  cardboard: "/img/armsrest/264820a7-20b7-4a32-89a9-ba79a2894292.png",
  progression: "/img/armsrest/546d7e18-b648-4794-bfff-b9f38298018b.jpg",
  cardboard2: "/img/armsrest/f8031d64-b428-493d-8461-143a24ddddf9.png",
  designsFront: "/img/armsrest/995b58ac-1ca6-48ac-abf0-2ce9312e730f.png",
  designsFront2: "/img/armsrest/813974fe-446d-42aa-b3e8-26320b51e8be.png",
  designsSide: "/img/armsrest/c3903d0d-52b5-483b-b946-4a53a7c03d73.png",
  rig: "/img/armsrest/d096a157-a5f2-4afa-9561-5a4f4e4f149c.jpg",
  testing: "/img/armsrest/ea9a935b-fa33-4258-a611-d4e2589cc705.jpg",
};

const COPY = {
  problem:
    "Airplane seats keep getting narrower as airlines fit more passengers into the same cabin. The armrest — a thin strip that divides two people's space and offers a sliver of privacy — becomes the flashpoint. Nobody quite agrees on who gets it.",
  problemReal:
    "The fight is real enough to make the news and go viral: a USA TODAY column reminding flyers that \"nobody owns the armrests,\" and a tweet about two passengers whose flight was turned back to the gate over an elbow.",
  surveyIntro:
    "A short survey mapped how travelers actually feel about the armrest — where they sit, how fast they get uncomfortable, and whether they end up fighting for elbow room.",
  paperclip:
    "One patented answer already exists: the Paperclip armrest by James Lee. Its double-deck geometry lets two people share by stacking their elbows on separate levels — a neat idea, with real problems.",
  briefObjective: "Redesign the armrest to end the fight — without touching the seat.",
  brief:
    "Adding material to build a second level would mean redesigning the whole seat. So the move was the opposite: cut material away from the existing armrest to open up usable space, keeping the exact same footprint.",
  ideation:
    "Sketching explored ways to carve a single armrest into two clearly-owned zones — testing cutouts and curves, and how the shape itself could signal where each elbow belongs. Ten forms went out for feedback.",
  prototyping:
    "Low-fidelity models in cardboard and MDF, tested and refined round after round. The cutout from design 5 kept testing as the most comfortable — and use-testers gravitated toward three forms.",
  why3:
    "Three finalists, kept for both aesthetics and function. Patented and produced, an airline could pick whichever of the three best suits the seats it flies.",
  prototype:
    "A 1:1 high-fidelity prototype on a seat rig. All three allocate a specific zone per person, with enough room to rest an arm or elbow in different positions.",
  beyond:
    "Designed for air travel — but not limited to it. Anywhere people sit shoulder-to-shoulder in close quarters, the same forms apply.",
  closing: "The arm as the idea, not the afterthought.",
};

const SURVEY = [
  "What class do you usually travel in?",
  "How many hours before you feel uncomfortable in your seat?",
  "Do you often find yourself fighting for the armrest?",
  "Would you want to see the armrest redesigned?",
];

const FLAWS = [
  { n: "01", title: "Uneven elbows", body: "The double deck lifts one elbow higher than the other. A shorter passenger's shoulder is forced to an unnatural height — uncomfortable on a long flight." },
  { n: "02", title: "It won't fold", body: "Many seats need the armrest to fold up. The raised upper deck protrudes through the seat and obstructs the row behind when folded." },
  { n: "03", title: "A new fight", body: "It just starts a different argument: who gets the top level, and who gets the bottom?" },
];

const SPECS = [
  { k: "Same level", v: "Both elbows rest at the same or a similar height." },
  { k: "No excess material", v: "No stacked, two-level double-deck build-up." },
  { k: "Same footprint", v: "No change to the seat's overall dimension, design, or function." },
];

const FEEDBACK = [
  "5 makes the most sense — it uses the best amount of space by simply making it two levels.",
  "Design 6 looks really sculptural and abstract — but it doesn't seem too comfortable to use.",
  "I love the curve on 7, sleek and modern. I'd make each slot a bit bigger — one higher, one lower — to use more of the armrest.",
];

const DESIGNS = {
  "01": { title: "The L-cutout", body: "A subtle double deck: one elbow rests on the raised surface, the other drops into an “L” cutout. The shape itself signals which side is yours — so no one fights over the upper deck." },
  "02": { title: "The zig-zag", body: "A zig-zag cut carves two protruding “islands” of identical area — equal space for each elbow, with the form making it obvious where each one goes." },
  "03": { title: "The conjoined islands", body: "Almost identical to the zig-zag, but the two islands merge into one continuous form — the same clear ownership, in a softer, unbroken shape." },
};

const USER_FEEDBACK = [
  "All three work exactly as promised — two people share the armrest in harmony, without making it any bigger.",
  "All three are brilliant. I love Design 2 the most — the aesthetic, and how it completely blocks any contact with the person next to you.",
  "Can't wait for airlines and seat manufacturers to build these into their seats.",
];

const BEYOND = ["Trains & transit", "Terminals", "Cinemas", "Lecture halls"];

/* ---------- helpers ---------- */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            io.disconnect();
            if (reduce) { setVal(to); return; }
            const t0 = performance.now();
            const dur = 1400;
            const tick = (now: number) => {
              const t = Math.min((now - t0) / dur, 1);
              setVal(to * (1 - Math.pow(1 - t, 3)));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{Math.round(val).toLocaleString()}{suffix}</span>;
}

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

function DesignSelector() {
  const keys = ["01", "02", "03"] as const;
  const [active, setActive] = useState<(typeof keys)[number]>("01");
  const d = DESIGNS[active];
  return (
    <div>
      <div className="ss-fork-tabs" role="tablist" aria-label="Final designs">
        {keys.map((k) => (
          <button key={k} type="button" role="tab" aria-selected={active === k} className={`ss-fork-tab${active === k ? " active" : ""}`} onClick={() => setActive(k)}>
            Design {k}
          </button>
        ))}
      </div>
      <div className="ss-fork-body" key={active}>
        <p className="ss-fork-tag mono accent">Design {active}</p>
        <h4 className="ss-fork-title">{d.title}</h4>
        <p className="ss-body">{d.body}</p>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function ArmsRestCase() {
  return (
    <div className="ss">
      {/* 01 — THE PROBLEM */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="Context" title="The Problem" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.problem}</p></Reveal>
        <Fig src={IMG.research} alt="News article and a viral tweet about fighting over airplane armrests" caption="The armrest fight, in the wild — USA TODAY and a tweet seen thousands of times" />
        <div className="ss-statband">
          <Reveal className="ss-stat">
            <div className="ss-stat-num display"><CountUp to={5637} /></div>
            <p className="ss-stat-label">likes on a single tweet about two flyers escorted off a plane over an elbow</p>
          </Reveal>
          <Reveal className="ss-stat" delay={90}>
            <div className="ss-stat-num display"><CountUp to={1} /></div>
            <p className="ss-stat-label">narrow strip, two passengers, and no agreed rule for who gets it</p>
          </Reveal>
        </div>
        <Reveal as="blockquote" className="ss-bigq"><p>Who owns the armrest?</p></Reveal>
      </section>

      {/* 02 — THE SURVEY */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="Research" title="The Survey" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.surveyIntro}</p></Reveal>
        <div className="ss-brief">
          {SURVEY.map((q, i) => (
            <Reveal className="ss-brief-row" key={q} delay={i * 60}>
              <span className="ss-brief-k mono accent">{`Q0${i + 1}`}</span>
              <span className="ss-brief-v">{q}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 — A PATENTED ANSWER */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Precedent" title="A Patented Answer" />
        <div className="ss-two">
          <Fig src={IMG.paperclip} alt="The Paperclip double-deck armrest by James Lee" caption="The Paperclip armrest — a double-deck design for sharing" />
          <Reveal className="ss-two-text" delay={90}><p className="ss-body">{COPY.paperclip}</p></Reveal>
        </div>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Where it falls short</p>
          <div className="ss-reasons">
            {FLAWS.map((f, i) => (
              <Reveal className="ss-reason" key={f.n} delay={i * 80}>
                <span className="ss-reason-n display">{f.n}</span>
                <h4 className="ss-reason-t">{f.title}</h4>
                <p className="ss-reason-q">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 04 — THE BRIEF */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="Direction" title="The Brief" />
        <Reveal className="ss-lede">
          <p className="ss-def">{COPY.briefObjective}</p>
          <p className="ss-body">{COPY.brief}</p>
        </Reveal>
        <div className="ss-brief">
          {SPECS.map((s, i) => (
            <Reveal className="ss-brief-row" key={s.k} delay={i * 70}>
              <span className="ss-brief-k mono accent">{s.k}</span>
              <span className="ss-brief-v">{s.v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 — IDEATION */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Exploration" title="Ideation" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.ideation}</p></Reveal>
        <Fig src={IMG.sketches} alt="Armrest ideation sketches" caption="Sketching — carving one armrest into two owned zones" />
        <Fig src={IMG.forms} alt="Ten numbered armrest form studies" caption="Ten forms, rendered for feedback" />
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Initial feedback</p>
          <div className="ss-reasons">
            {FEEDBACK.map((f, i) => (
              <Reveal className="ss-reason" key={i} delay={i * 80}>
                <span className="ss-reason-n display">{`0${i + 5}`}</span>
                <p className="ss-reason-q">{`“${f}”`}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 06 — PROTOTYPING */}
      <section className="ss-chapter">
        <ChapterHead num="06" kicker="Making" title="Prototyping" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.prototyping}</p></Reveal>
        <Fig src={IMG.progression} alt="Model progression from cardboard to MDF to resin" caption="From cardboard to MDF to resin — refining the cutout" />
        <div className="ss-two">
          <Fig src={IMG.cardboard} alt="Cardboard armrest study models" caption="Low-fidelity cardboard studies" />
          <Fig src={IMG.cardboard2} alt="Cardboard armrest cutout models" caption="Testing where to cut material away" />
        </div>
      </section>

      {/* 07 — THE THREE DESIGNS */}
      <section className="ss-chapter">
        <ChapterHead num="07" kicker="Resolution" title="The Three Designs" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.why3}</p></Reveal>
        <Fig src={IMG.designsFront} alt="The three final armrest designs, front view" wide caption="Three finals — each carves out a clearly-owned zone for two elbows" />
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">The three approaches — select one</p>
          <DesignSelector />
        </Reveal>
        <div className="ss-two">
          <Fig src={IMG.designsSide} alt="The three designs, side profile" caption="Side profile — material cut away, footprint kept" />
          <Fig src={IMG.designsFront2} alt="The three designs, alternate view" caption="The cutouts semantically show where each elbow rests" />
        </div>
      </section>

      {/* 08 — PROTOTYPE & TESTING */}
      <section className="ss-chapter">
        <ChapterHead num="08" kicker="Validation" title="Prototype & Testing" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.prototype}</p></Reveal>
        <div className="ss-two">
          <Fig src={IMG.rig} alt="1:1 high-fidelity prototypes on a seat rig" caption="1:1 prototypes on a seat rig" />
          <Fig src={IMG.testing} alt="Users testing the three armrest designs" caption="User testing — a specific zone for each person" />
        </div>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">What testers said</p>
          <div className="ss-reasons">
            {USER_FEEDBACK.map((f, i) => (
              <Reveal className="ss-reason" key={i} delay={i * 80}>
                <span className="ss-reason-n display">{`0${i + 1}`}</span>
                <p className="ss-reason-q">{`“${f}”`}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 09 — BEYOND AIR TRAVEL */}
      <section className="ss-chapter">
        <ChapterHead num="09" kicker="Reach" title="Beyond Air Travel" />
        <Reveal className="ss-lede"><p className="ss-body ss-narrow">{COPY.beyond}</p></Reveal>
        <Reveal className="ss-block">
          <div className="ss-chip-row">
            {BEYOND.map((c) => <span className="ss-chip" key={c}>{c}</span>)}
          </div>
        </Reveal>
        <Reveal className="ss-closing">
          <p className="ss-closing-big display">Room for two.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
