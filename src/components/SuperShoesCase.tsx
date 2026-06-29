"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const IMG = {
  plate: "/img/super-shoes/505c5df5-ce5f-4393-91b2-242c5c33f20b.jpg",
  wireframes: "/img/super-shoes/69aed521-ea31-40d6-97b2-2fec8e54e226.jpg",
  landscape: "/img/super-shoes/89b8fb66-bb66-4d24-bbe2-f2be56b2a385.jpg",
  prototypes: "/img/super-shoes/95c25be5-d842-4067-aeae-b24bc50db887.jpg",
  community: "/img/super-shoes/b2c775ae-efb1-4741-920f-d0390133ee95.jpg",
  interview: "/img/super-shoes/b4eefcec-35d0-4430-8ef0-84fde45edfef.jpg",
  exploded: "/img/super-shoes/ca3ff91e-a3d7-462f-bc2b-76b3c68bad41.jpg",
  process: "/img/super-shoes/e04b2f8b-bc3c-449c-aa3b-fd3d1e0e175b.jpg",
};

// Prose kept in constants (regular apostrophes are safe inside JS strings).
const COPY = {
  myth:
    "It's a common misconception that there's one perfect running technique every runner should chase. An analysis in the International Journal of Sports Physiology and Performance found no single style is better than another — every runner is built differently and settles into the form that works for them. Deliberately changing your form or footstrike tends to invite injury rather than efficiency.",
  pronationIntro:
    "Gait analysis sorts runners by how much the foot rolls inward through a stride. The vast majority are either neutral or they pronate.",
  fatigue:
    "Footstrike isn't fixed — it shifts with sex, speed, and fatigue. In one 15 km road race, most runners who started on their forefoot had collapsed onto their heel by the finish as their calves tired.",
  question:
    "How can runners become more efficient and faster — without deliberately changing the way they naturally run?",
  superShoeDef:
    "Super shoes (n.) — marathon racing shoes built around a resilient, responsive foam (usually Pebax) with a carbon-fiber plate embedded in the midsole.",
  breaking2:
    "The first super shoe arrived at Nike's Breaking2 in 2017. Unlike a traditional racing flat, the Vaporfly Elite paired deep cushioning with an articulated carbon plate. Eliud Kipchoge ran 2:00:25 — just 25 seconds from the once-impossible two-hour barrier.",
  marketObj:
    "To understand what the leading products actually offer, I tested the major super shoes with five competitive runners and surveyed many more — rating each as works best, kind of working, or not working.",
  expertLead:
    "When we develop shoes, we look at both scientific data and subjective feedback from athletes. Sometimes they correlate — and sometimes they don't.",
  expertQuote:
    "Brands aren't listening to what athletes want because they're too blinded by numbers and data.",
  stalling:
    "Midsole construction and plate configurations have barely changed in eight years. They don't accommodate a running gait that is dynamic and constantly changing. The industry mantra: if it's working, don't fix it.",
  briefObjective:
    "Design a conceptual high-performance super shoe — a blueprint for the industry to push future innovation.",
  brief:
    "Taking cues from current super-shoe technology, this concept is built to accommodate the competitive needs of every kind of runner: more forgiving, yet still relentlessly propulsive.",
  plateIdeation:
    "From the traditional Vaporfly plate to cutouts for flex, carbon rods mimicking metatarsal bones, and an extended toe replicating the plantar fascia — ideation converged on a “forked” plate drawn from animal anatomy.",
  prototypes:
    "3D-printed and thermoplastic plates, foam-clay and EVA midsoles — testing decoupled versus continuous geometry and dialing in the optimal position for the windlass cushioning system.",
  windlass:
    "At mid-stance the plate and midsole compress during roll-in. An arch feature under the ball of the foot mimics the windlass effect — storing and returning energy for an explosive toe-off.",
  closing: "A concept designed and developed by runners, with runners.",
};

const PRONATION = [
  { label: "Supination", pct: 10, desc: "Lands on the lateral side and keeps rolling outward through the stride." },
  { label: "Neutral", pct: 30, desc: "Lands on the lateral side, then rolls inward to absorb shock." },
  { label: "Pronation", pct: 60, desc: "Lands on the lateral side, then rolls excessively inward." },
];

const TESTERS = [
  { tag: "01 · Me", name: "Ray Leung", disc: "Middle / Long Distance", pbs: ["Mile 4:36", "5000m 15:46", "Half 1:13:41"], strike: "Forefoot / Midfoot" },
  { tag: "02", name: "Owen Hoeft", disc: "Middle Distance", pbs: ["1500m 3:42", "Mile 4:01", "5000m 13:51"], strike: "Forefoot / Midfoot" },
  { tag: "03", name: "Liam Dee", disc: "Middle / Long Distance", pbs: ["Mile 3:58", "5000m 13:46", "Half 1:04:57"], strike: "Forefoot / Midfoot" },
  { tag: "04", name: "Alex Nguyen", disc: "Middle Distance", pbs: ["800m 2:02", "Mile 4:26", "5000m 16:12"], strike: "Rearfoot" },
  { tag: "05", name: "Amanda Gauthier", disc: "Middle / Long Distance", pbs: ["5000m 17:47", "Half 1:23:07", "Marathon 3:00:28"], strike: "Midfoot" },
];

const REASONS = [
  { n: "01", title: "The carbon plate is too stiff", quote: "I'm a lighter runner, so I can't fully activate the plate when it's too stiff and aggressive." },
  { n: "02", title: "The midsole is too plush", quote: "I feel like I'm sinking into the foam and have to climb back out — it wastes a lot of energy." },
  { n: "03", title: "The geometry is too aggressive", quote: "It makes the shoe unstable and hard to feel any energy return. I waste effort just staying centered — worse when I'm fatigued." },
];

const FORK = {
  lateral: {
    tag: "Plush landings",
    title: "Lateral side — closer to the foot",
    body: "During landing, runners load and compress more midsole foam underfoot for a softer, bouncier sensation.",
  },
  medial: {
    tag: "Explosive take-offs",
    title: "Medial side — closer to the ground",
    body: "During toe-off, runners ride the curvature of the plate for a more aggressive sensation. The plate arches up under the ball of the foot, creating the windlass cushioning system that delivers a propulsive pop.",
  },
};

const LAYERS = [
  { n: "01", title: "Top-layer midsole", body: "Pebax-based. Thinner on the lateral side, thicker on the medial. A cutout on the medial side works with the plate's arch to form a suspension cushioning system." },
  { n: "02", title: "Dynamic carbon-fiber plate", body: "Full-length and fork-shaped. The cutout adds flexibility; the lateral side sits closer to the foot, the medial side closer to the ground. An arch under the ball of the foot acts as a suspension system for extra pop." },
  { n: "03", title: "Bottom-layer midsole", body: "Pebax-based. Cutouts on the underside reduce overall weight and help guide the runner's footstrike pattern." },
  { n: "04", title: "Rubber outsole", body: "Climbing-shoe and race-tire inspired. Laser-cut holes shave weight and add traction across the high-wear heel and forefoot." },
];

/* ---------- helpers ---------- */

function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1300 }: {
  to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number;
}) {
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
            const tick = (now: number) => {
              const t = Math.min((now - t0) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(to * eased);
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
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

function Fig({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <Reveal className="ss-fig">
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

function PronationChart() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="ss-prona" ref={ref}>
      {PRONATION.map((p) => (
        <div className="ss-prona-row" key={p.label}>
          <div className="ss-prona-top">
            <span className="ss-prona-label">{p.label}</span>
            <span className="ss-prona-pct display">{seen ? <CountUp to={p.pct} suffix="%" /> : "0%"}</span>
          </div>
          <div className="ss-prona-track">
            <div className="ss-prona-fill" style={{ width: seen ? `${p.pct}%` : "0%" }} />
          </div>
          <p className="ss-prona-desc">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function ForkToggle() {
  const [side, setSide] = useState<"lateral" | "medial">("lateral");
  const s = FORK[side];
  return (
    <div className="ss-fork">
      <div className="ss-fork-tabs" role="tablist" aria-label="Plate sides">
        <button type="button" role="tab" aria-selected={side === "lateral"} className={`ss-fork-tab${side === "lateral" ? " active" : ""}`} onClick={() => setSide("lateral")}>Lateral side</button>
        <button type="button" role="tab" aria-selected={side === "medial"} className={`ss-fork-tab${side === "medial" ? " active" : ""}`} onClick={() => setSide("medial")}>Medial side</button>
      </div>
      <div className="ss-fork-body" key={side}>
        <p className="ss-fork-tag mono accent">{s.tag}</p>
        <h4 className="ss-fork-title">{s.title}</h4>
        <p className="ss-body">{s.body}</p>
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
          <img src={IMG.exploded} alt="Exploded view of the super-shoe midsole construction" loading="lazy" decoding="async" />
        </div>
      </Reveal>
      <div className="ss-build-panel">
        <ol className="ss-build-list">
          {LAYERS.map((l, i) => (
            <li key={l.n}>
              <button
                type="button"
                className={`ss-build-btn${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
                aria-expanded={i === active}
              >
                <span className="ss-build-n mono">{l.n}</span>
                <span className="ss-build-t">{l.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="ss-build-body" key={active}>{LAYERS[active].body}</p>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function SuperShoesCase() {
  return (
    <div className="ss">
      {/* 01 — RUNNING FORM */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="The Problem" title="Running Form" />
        <Reveal className="ss-lede">
          <p className="ss-body">{COPY.myth}</p>
        </Reveal>

        <div className="ss-gait">
          {[
            { n: "01", t: "Landing", d: "The foot contacts the ground on the lateral side, driving force in and storing energy." },
            { n: "02", t: "Mid stance", d: "The foot rolls inward to distribute force and absorb shock." },
            { n: "03", t: "Push off", d: "The foot rolls to the forefoot and leaves the ground at the big toe." },
          ].map((g, i) => (
            <Reveal className="ss-gait-step" key={g.n} delay={i * 90}>
              <span className="ss-gait-n display">{g.n}</span>
              <h4 className="ss-gait-t">{g.t}</h4>
              <p className="ss-gait-d">{g.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Degree of pronation — share of runners</p>
          <p className="ss-body ss-narrow">{COPY.pronationIntro}</p>
          <PronationChart />
        </Reveal>

        <div className="ss-statband">
          <Reveal className="ss-stat">
            <div className="ss-stat-num display"><CountUp to={61} suffix="%" /></div>
            <p className="ss-stat-label">of runners who started forefoot in a 15 km race had switched to a heel strike by 13 km</p>
          </Reveal>
          <Reveal className="ss-stat" delay={90}>
            <div className="ss-stat-num display"><CountUp to={3} suffix="×" /></div>
            <p className="ss-stat-label">footstrike shifts with sex, speed, and fatigue — it is never fixed</p>
          </Reveal>
        </div>

        <Reveal as="blockquote" className="ss-bigq">
          <p>{COPY.question}</p>
        </Reveal>
      </section>

      {/* 02 — SUPER SHOES */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="What Is Fast" title="Super Shoes" />
        <div className="ss-two">
          <Reveal className="ss-two-text">
            <p className="ss-def">{COPY.superShoeDef}</p>
            <p className="ss-body">{COPY.breaking2}</p>
          </Reveal>
          <Reveal className="ss-barrier" delay={90}>
            <p className="ss-eyebrow mono muted">The two-hour barrier</p>
            <div className="ss-barrier-row"><span className="ss-barrier-k mono-sm muted">Marathon WR</span><span className="ss-barrier-v display">2:00:35</span></div>
            <div className="ss-barrier-row"><span className="ss-barrier-k mono-sm muted">Kipchoge, Breaking2</span><span className="ss-barrier-v display">2:00:25</span></div>
            <div className="ss-barrier-row ss-barrier-goal"><span className="ss-barrier-k mono-sm">The barrier</span><span className="ss-barrier-v display">2:00:00</span></div>
            <p className="ss-barrier-note"><CountUp to={4} suffix="%" /> claimed gain in running economy — and just 25 seconds from history.</p>
          </Reveal>
        </div>

        <Fig src={IMG.plate} alt="Low position plate versus high position plate" caption="Every super shoe makes one choice: plate low, or plate high" />

        <div className="ss-compare">
          <Reveal className="ss-compare-col">
            <p className="ss-compare-n mono accent">01 / Low position</p>
            <h4 className="ss-compare-t">More aggressive toe-off</h4>
            <p className="ss-body">More foam under the foot; the plate sits closer to the ground.</p>
          </Reveal>
          <Reveal className="ss-compare-col" delay={90}>
            <p className="ss-compare-n mono accent">02 / High position</p>
            <h4 className="ss-compare-t">More bounce</h4>
            <p className="ss-body">More foam under the plate; the plate sits closer to the foot.</p>
          </Reveal>
        </div>
      </section>

      {/* 03 — MARKET RESEARCH */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Product Testing" title="Market Research" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.marketObj}</p></Reveal>

        <Fig src={IMG.landscape} alt="The current landscape of super shoes" caption="The current landscape — eight years of near-identical construction" />

        <div className="ss-testers">
          {TESTERS.map((t, i) => (
            <Reveal className="ss-tester" key={t.name} delay={(i % 3) * 70}>
              <p className="ss-tester-tag mono-sm accent">Tester {t.tag}</p>
              <h4 className="ss-tester-name">{t.name}</h4>
              <dl className="ss-tester-dl">
                <dt className="mono-sm muted">Discipline</dt>
                <dd>{t.disc}</dd>
                <dt className="mono-sm muted">Personal bests</dt>
                <dd>{t.pbs.join(" · ")}</dd>
                <dt className="mono-sm muted">Footstrike</dt>
                <dd>{t.strike}</dd>
              </dl>
            </Reveal>
          ))}
        </div>

        <Fig src={IMG.community} alt="Runners and testers from the research process" caption="Testing nights, track meets, and the runners behind the data" />

        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Why some super shoes don't work</p>
          <div className="ss-reasons">
            {REASONS.map((r, i) => (
              <Reveal className="ss-reason" key={r.n} delay={i * 80}>
                <span className="ss-reason-n display">{r.n}</span>
                <h4 className="ss-reason-t">{r.title}</h4>
                <p className="ss-reason-q">{`“${r.quote}”`}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 04 — EXPERT INTERVIEW */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="The Insight" title="Expert Interview" />
        <div className="ss-two">
          <Fig src={IMG.interview} alt="Interview with Jordan Donnelly, ON Innovation Lead" caption="Jordan Donnelly — Innovation Lead, ON" />
          <Reveal className="ss-two-text" delay={90}>
            <p className="ss-body">{COPY.expertLead}</p>
            <blockquote className="ss-quote">{`“${COPY.expertQuote}”`}</blockquote>
            <p className="ss-attrib mono-sm muted">Jordan Donnelly · ON, Athlete Product Creation</p>
          </Reveal>
        </div>

        <div className="ss-statband">
          <Reveal className="ss-stat ss-stat-wide">
            <div className="ss-stat-num display"><CountUp to={8} suffix=" yrs" /></div>
            <p className="ss-stat-label">{COPY.stalling}</p>
          </Reveal>
        </div>
      </section>

      {/* 05 — THE BRIEF */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Design Objective" title="The Brief" />
        <Reveal className="ss-lede">
          <p className="ss-def">{COPY.briefObjective}</p>
          <p className="ss-body">{COPY.brief}</p>
        </Reveal>
        <div className="ss-brief">
          {[
            { k: "Plate structure", v: "Unique, dynamic, and ergonomic." },
            { k: "Midsole geometry", v: "Cushioning only where it's needed — working with the plate." },
            { k: "Aesthetics", v: "Look good, feel good: a fast, aggressive vibe." },
          ].map((b, i) => (
            <Reveal className="ss-brief-row" key={b.k} delay={i * 80}>
              <span className="ss-brief-k mono accent">{b.k}</span>
              <span className="ss-brief-v">{b.v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — DESIGN PROCESS */}
      <section className="ss-chapter">
        <ChapterHead num="06" kicker="From Insight to Form" title="Design Process" />
        <div className="ss-chips">
          <Reveal className="ss-chips-group">
            <p className="ss-eyebrow mono muted">Anatomy</p>
            <div className="ss-chip-row">
              {["Windlass effect", "Plantar fascia", "Metatarsals", "Camel feet", "Ostrich feet", "Cheetah"].map((c) => (
                <span className="ss-chip" key={c}>{c}</span>
              ))}
            </div>
          </Reveal>
          <Reveal className="ss-chips-group" delay={80}>
            <p className="ss-eyebrow mono muted">Form &amp; speed</p>
            <div className="ss-chip-row">
              {["Peregrine falcon", "Aerospace", "Fighter jets", "Automobiles"].map((c) => (
                <span className="ss-chip" key={c}>{c}</span>
              ))}
            </div>
          </Reveal>
        </div>

        <Fig src={IMG.process} alt="Plate and midsole ideation sketches" caption="Plate and midsole ideation — toward a forked, dynamic geometry" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.plateIdeation}</p></Reveal>

        <Fig src={IMG.prototypes} alt="Physical plate and midsole prototypes" caption="Key prototypes — 3D-printed plates, foam-clay and EVA midsoles" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.prototypes}</p></Reveal>
      </section>

      {/* 07 — THE CONCEPT */}
      <section className="ss-chapter">
        <ChapterHead num="07" kicker="The Concept" title="The Future of Super Shoes" />

        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Plate geometry — a two-in-one configuration</p>
          <p className="ss-body ss-narrow">A single forked plate that bends and sits at two levels at once — plush landings and explosive take-offs from the same shoe. Switch sides:</p>
          <ForkToggle />
        </Reveal>

        <Reveal as="blockquote" className="ss-bigq ss-bigq-sm">
          <p>{COPY.windlass}</p>
        </Reveal>

        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Midsole construction — select a layer</p>
          <Construction />
        </Reveal>

        <Fig src={IMG.wireframes} alt="Technical orthographic drawings of the final concept" caption="The resolved geometry — top, side, and section views" />

        <Reveal className="ss-closing">
          <p className="ss-closing-big display">Designed by runners, with runners.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
