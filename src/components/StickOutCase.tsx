"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const IMG = {
  night: "/img/stick-out/24310d3f-5a5a-46bb-a437-d1a0514599d7.jpg",
  studer: "/img/stick-out/6f6c6920-2fc0-4cd4-a703-3406a1f697af.jpg",
  sketches: "/img/stick-out/ba7ad15c-8d57-4b40-8b9c-44098cdbc410.jpg",
  proto: "/img/stick-out/708cd093-cede-4934-a7e3-4b6b62f22a59.jpg",
  variants: "/img/stick-out/293bfe0b-0588-4a98-a61c-133fb6689298.jpg",
  exploded: "/img/stick-out/ff43a116-775e-414e-aabf-30b7668fe3e0.png",
  hands: "/img/stick-out/589dba70-a473-4e64-bb6f-5586b9917184.jpg",
};

const COPY = {
  context:
    "Running in a low light environment without reflective or illuminating gear puts runners at a higher risk of getting injured. Approaching cars are less likely to spot a runner — and the runner is less likely to spot the danger on the pavement they are running on.",
  form:
    "Improper arm swing is one of many causes of bad running form. In the dark the two compound each other: you cannot see the ground, and your body is not balanced over it.",
  dowels:
    "The fix is old and low-tech. You run with short wooden dowels — roughly 10cm long, about the width of a broomstick — held in your palms with your thumbs over the ends. Holding them keeps your arms by your side and minimizes twisting arm movements.",
  landscape:
    "Runners already have options. Every one of them solves being seen; none of them solve how you run. And each is one more thing to carry, charge, or remember.",
  knuckle:
    "Knuckle Lights is a brand that makes dowel-like handheld running lights — the closest thing on the shelf to the idea. Its reviews read as a list of failure points.",
  briefObjective:
    "Design a product for runners that provides illumination and corrects their arm swing.",
  brief:
    "Make running at night or in low light safer by giving runners both passive and active lighting, while helping them maintain good balance. A better arm swing results in better balance — which reduces the risk of tripping and falling on ground you cannot see.",
  ideation:
    "Sketching started from the failures. Cylindrical and sold as a set, with a replaceable lamp, a casing that can be cleaned, and a battery instead of a charging dock. The detachable grip took its cue from LEKI ski poles and their glove system.",
  prototyping:
    "Cardboard and a spare flashlight first, to find the diameter a closed fist actually wants. Then 3D-printed grips and casings — held, cut down, and printed again.",
  formIntro:
    "Two tops, one body. The grip is where the dowel technique lives, so it got two answers — and the light was resolved to do two jobs at once.",
  lights:
    "The casing diffuses the bulb into ambient light so the runner is seen from any angle, while the tip throws a directional beam onto the ground ahead.",
  construction:
    "Designed with disassembly and replaceable parts in mind. Every part that failed on the shelf product is a part you can pull out and swap here.",
  closing: "Your new essential running gear. Better visibility, better form, safer runs.",
};

const STATS = [
  {
    to: 35000,
    suffix: "",
    label:
      "runners got into accidents with injuries requiring a hospital trip. The injury time of day shows peak times are after dark.",
    source: "Department of Transportation, 2012",
  },
  {
    to: 79,
    suffix: "%",
    label:
      "of all runners will sustain a running-related injury during any given year. Poor running mechanics may contribute to these injuries.",
    source: "Journal of Orthopaedic & Sports Physical Therapy",
  },
];

const EXISTING = ["Headlamps", "Reflective vests", "Reflective features on clothing"];

const GAPS = [
  { k: "Added weight", v: "Every extra piece of kit is one more thing to carry for the length of a run." },
  { k: "Battery lifetime", v: "A light that dies mid-run stops being a light and stays being weight." },
  { k: "Piecemeal coverage", v: "Different products for different garments and body parts — more dead weight." },
  { k: "Inconsistent", v: "Not all apparel or shoes have reflective features to begin with." },
];

const FLAWS = [
  { n: "01", title: "It won't charge", body: "Won't charge due to improper contact with charging dock." },
  { n: "02", title: "The casing cracks", body: "Shortly into using them, the casing around the lamp cracked." },
  {
    n: "03",
    title: "Sweat gets inside",
    body: "After wearing them for the first time, one had a noticeable amount of water in it from my sweat and the other was full of condensation.",
  },
];

const CRITERIA = [
  { k: "Provides illumination", v: "Ambient light to be seen from any angle, directional light to see the ground." },
  { k: "Improves arm swing", v: "Works as a dowel, so the form correction is a side effect of simply holding it." },
  { k: "Replaceable parts", v: "Every failure point on the shelf product can be swapped out, not binned." },
  { k: "Good grip", v: "Held vertically, one in each hand, thumb over the end." },
];

const GRIPS = {
  slanted: {
    tag: "DWG 02",
    title: "Slanted top",
    body: "An angled crown that follows the cant of a closed fist, so the thumb sits over the end the way the dowel technique asks for.",
  },
  flat: {
    tag: "DWG 01",
    title: "Flat top",
    body: "An elongated flat top that sits flatter against the hand, and gives the thumb a broader surface to press down on.",
  },
} as const;

const PARTS = [
  {
    n: "01",
    title: "Light casing",
    body: "A translucent case that diffuses the bulb into ambient light. It twists off the grip, so it can be cleaned and dried out instead of trapping sweat inside.",
  },
  { n: "02", title: "LED light bulb", body: "The directional source, pointed at the ground ahead. Replaceable — a dead bulb doesn't kill the product." },
  { n: "03", title: "LED light strip", body: "Runs the length of the casing, turning the body itself into an ambient, 360° marker." },
  { n: "04", title: "Electrical components housing", body: "Holds the electronics in their own core, away from the grip surface where sweat collects." },
  { n: "05", title: "Replaceable battery", body: "Battery powered, no charging required — so there is no dock to make improper contact with." },
  { n: "06", title: "Silicone sleeve", body: "The rubber grip. It detaches from the light casing, so the part you sweat into is the part you can pull off and wash." },
];

const DRAWINGS = ["DWG 01 — Flat Top Grip", "DWG 02 — Slanted Top Grip", "DWG 03 — Light Casing", "DWG 04 — Internal Housing"];

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

function GripSelector() {
  const keys = ["slanted", "flat"] as const;
  const [active, setActive] = useState<(typeof keys)[number]>("slanted");
  const g = GRIPS[active];
  return (
    <div>
      <div className="ss-fork-tabs" role="tablist" aria-label="Grip tops">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={active === k}
            className={`ss-fork-tab${active === k ? " active" : ""}`}
            onClick={() => setActive(k)}
          >
            {GRIPS[k].title}
          </button>
        ))}
      </div>
      <div className="ss-fork-body" key={active}>
        <p className="ss-fork-tag mono accent">{g.tag}</p>
        <h4 className="ss-fork-title">{g.title}</h4>
        <p className="ss-body">{g.body}</p>
      </div>
    </div>
  );
}

function Construction() {
  const [active, setActive] = useState(0);
  return (
    <div className="ss-build">
      <Reveal className="ss-build-fig">
        <div className="ss-fig-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.exploded} alt="Exploded view of the Stick Out light — casing, bulb, strip, housing, battery and sleeve" loading="lazy" decoding="async" />
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
            </li>
          ))}
        </ol>
        <p className="ss-build-body" key={active}>{PARTS[active].body}</p>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function StickOutCase() {
  return (
    <div className="ss">
      {/* 01 — RUNNING IN THE DARK */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="Context" title="Running in the Dark" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.context}</p></Reveal>
        <Fig src={IMG.night} alt="Runners at night wearing headlamps and reflective vests in low light" wide caption="Low light, high traffic — the gear runners already reach for" />
        <div className="ss-statband">
          {STATS.map((s, i) => (
            <Reveal className="ss-stat" key={s.source} delay={i * 90}>
              <div className="ss-stat-num display"><CountUp to={s.to} suffix={s.suffix} /></div>
              <p className="ss-stat-label">{s.label}</p>
              <p className="ss-cap mono-sm muted">{s.source}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02 — DARK + BAD FORM */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="Research" title="Dark Environment + Bad Form" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.form}</p></Reveal>
        <Reveal className="ss-block">
          <blockquote className="ss-quote">{`“Everything needs to line up at the center of your body so you don't fall over... you are more efficient and use less energy.”`}</blockquote>
          <p className="ss-attrib mono-sm muted">Ian Hankins · Head men&rsquo;s cross-country and track and field coach, Catholic University of America</p>
        </Reveal>
        <Reveal as="blockquote" className="ss-bigq"><p>Dark environment + bad form = injuries.</p></Reveal>
      </section>

      {/* 03 — RUNNING WITH DOWELS */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Precedent" title="Running with Dowels" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.dowels}</p></Reveal>
        <Fig src={IMG.studer} alt="Max Studer racing while gripping short dowels in each hand" wide caption="Max Studer races with them — the technique, already proven at the top of the sport" />
        <Reveal className="ss-block">
          <blockquote className="ss-quote">{`“This technique keeps your arms by your side, and minimizes twisting arm movements.”`}</blockquote>
          <p className="ss-attrib mono-sm muted">Max Studer · Swiss triathlete, 9th at the Tokyo Olympics</p>
        </Reveal>
      </section>

      {/* 04 — EXISTING PRODUCTS */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="Landscape" title="Existing Products" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.landscape}</p></Reveal>
        <Reveal className="ss-block">
          <div className="ss-chip-row">
            {EXISTING.map((c) => <span className="ss-chip" key={c}>{c}</span>)}
          </div>
        </Reveal>
        <div className="ss-brief">
          {GAPS.map((g, i) => (
            <Reveal className="ss-brief-row" key={g.k} delay={i * 60}>
              <span className="ss-brief-k mono accent">{g.k}</span>
              <span className="ss-brief-v">{g.v}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="ss-lede"><p className="ss-body">{COPY.knuckle}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Knuckle Lights are flawed</p>
          <div className="ss-reasons">
            {FLAWS.map((f, i) => (
              <Reveal className="ss-reason" key={f.n} delay={i * 80}>
                <span className="ss-reason-n display">{f.n}</span>
                <h4 className="ss-reason-t">{f.title}</h4>
                <p className="ss-reason-q">{`“${f.body}”`}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 05 — THE BRIEF */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Direction" title="The Brief" />
        <Reveal className="ss-lede">
          <p className="ss-def">{COPY.briefObjective}</p>
          <p className="ss-body">{COPY.brief}</p>
        </Reveal>
        <div className="ss-brief">
          {CRITERIA.map((c, i) => (
            <Reveal className="ss-brief-row" key={c.k} delay={i * 70}>
              <span className="ss-brief-k mono accent">{c.k}</span>
              <span className="ss-brief-v">{c.v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — IDEATION */}
      <section className="ss-chapter">
        <ChapterHead num="06" kicker="Exploration" title="Ideation" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.ideation}</p></Reveal>
        <Fig src={IMG.sketches} alt="Ideation sheet — form studies and the LEKI ski pole inspired handheld light stick concept" wide caption="Every criterion on the sheet traces back to a review of the thing it replaces" />
      </section>

      {/* 07 — PROTOTYPING */}
      <section className="ss-chapter">
        <ChapterHead num="07" kicker="Making" title="Prototyping" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.prototyping}</p></Reveal>
        <Fig src={IMG.proto} alt="Cardboard mockup with a flashlight, alongside 3D-printed grips and casings" wide caption="Cardboard for the diameter, prints for the grip" />
      </section>

      {/* 08 — THE FORM */}
      <section className="ss-chapter">
        <ChapterHead num="08" kicker="Resolution" title="The Form" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.formIntro}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Two grip tops — select one</p>
          <GripSelector />
        </Reveal>
        <Fig src={IMG.variants} alt="Slanted and flat grip variants, and the light shown as both ambient and directional" wide caption="Slanted and flat — and the light doing both jobs: ambient and directional" />
        <Reveal className="ss-lede"><p className="ss-body ss-narrow">{COPY.lights}</p></Reveal>
      </section>

      {/* 09 — INSIDE THE STICK */}
      <section className="ss-chapter">
        <ChapterHead num="09" kicker="Construction" title="Inside the Stick" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.construction}</p></Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Exploded view — select a part</p>
          <Construction />
        </Reveal>
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Technical drawings</p>
          <div className="ss-chip-row">
            {DRAWINGS.map((d) => <span className="ss-chip" key={d}>{d}</span>)}
          </div>
        </Reveal>
      </section>

      {/* 10 — NO BLIND SPOTS */}
      <section className="ss-chapter">
        <ChapterHead num="10" kicker="Payoff" title="No Blind Spots" />
        <Fig src={IMG.hands} alt="Two Stick Out lights held vertically, one in each hand, in the dark" wide caption="One in each hand, thumbs over the ends — lighting the road and holding the form" />
        <Reveal className="ss-closing">
          <p className="ss-closing-big display">360° of light. None of the blind spots.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
