"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const IMG = {
  fieldObs: "/img/on-case-study/5e0f01af-35e0-4243-855a-174fe9e6bf31.jpg",
  athlete: "/img/on-case-study/d7e42cb9-b934-4e7b-a63a-aa9adbdabca0.jpg",
  sponsor: "/img/on-case-study/f2d2d978-5eef-4dab-b496-059a0f82b7a4.jpg",
  refShoes: "/img/on-case-study/ed0f7fc6-b25a-4835-ad3e-1c4e2d9ba778.jpg",
  macroTrends: "/img/on-case-study/508a7887-b329-4017-8420-478bd669dc3e.jpg",
  marketTrends: "/img/on-case-study/b0af0ddb-411b-4fbf-b53c-f28b9d3fa8dd.jpg",
  dna: "/img/on-case-study/6859a3a7-1e78-4d9d-bbf5-f4e15b0e83bf.jpg",
  language: "/img/on-case-study/d5155bd5-46c5-45bd-adb1-8f4fc5850d03.jpg",
  anatomy: "/img/on-case-study/813650bd-9a6b-41eb-ac1e-d37fee822f2d.jpg",
  upperMaterials: "/img/on-case-study/25ad6d6c-2247-45c4-acfb-08497dae4791.jpg",
  midsoleMaterials: "/img/on-case-study/58d52dd7-5d73-443e-9904-14c70e3a1963.jpg",
  sketches: "/img/on-case-study/b71e0ecd-130d-45bb-9d35-1e8298c67af3.jpg",
  mockupSide: "/img/on-case-study/dd28483e-de69-40a2-854c-b2826b336720.jpeg",
  upperBreakdown: "/img/on-case-study/1033f7be-f07e-4a75-82e8-c9c512dbdbc7.jpg",
  midsoleBreakdown: "/img/on-case-study/93e019d9-4873-43a9-ab3e-8bc683fb4fc6.jpg",
  components: "/img/on-case-study/60b29944-b47f-4e1e-bca3-b00d6911c6b1.jpg",
  stack: "/img/on-case-study/846f2c80-aff4-4f0c-ac26-cfdcbf27fad0.jpg",
};

const COPY = {
  context:
    "Distance runners keep getting faster, and footwear advancement is a big part of why. As the tools improve, the question becomes who comes next — and how we equip them.",
  question:
    "How can we maximize the potential of the next generation of runners through performance footwear?",
  genAlpha:
    "Generation Alpha — the children of Millennials, born between 2010 and 2025 — is the next wave of athletes. Their values and buying habits are heavily shaped by their Millennial parents.",
  fieldObs:
    "Field observation and interviews at On's Williamsburg store (NYC, April 2024) surfaced a clear dynamic: parents increasingly let Gen Alpha make their own calls, while still steering toward what is comfortable and functional.",
  targetIntro:
    "Two people decide on a pair of shoes — the one who runs in them, and the one who pays for them. Designing for Gen Alpha means designing for both.",
  positioningIntro:
    "On's performance range spans three rotations. But between the daily trainer and the super shoe sits a gap — and that gap is exactly where a developing Gen Alpha athlete lives.",
  midpacker:
    "The Midpacker — versatile, propulsive, fast. More durable than an elite race-day model, with more energy return than a workhorse. Built to support a still-developing stride across tempo runs, intervals, and races without compromising foot health.",
  reviewLead:
    "Two On models marginally fit that gap. Studying what to carry over — and what to improve — set the brief for the concept.",
  trendsLead:
    "WGSN forecasts pointed to the same place: products that last across life-stages, are built to be repaired, and feel highly individual.",
  briefObjective:
    "Design a high-performance running shoe for the future stars of the sport.",
  brief:
    "By refining key elements from On's Cloudboom Echo 3 and Cloudmonster Hyper, this shoe accommodates the needs of young competitive runners aged 10–15 — bodies still developing and growing — while reflecting the values the brand, the Athlete, and the Sponsor all share.",
  inspoLead:
    "On's DNA, a minimal Swiss design language, and the propulsive geometry of natural anatomy set the visual and material direction.",
  ideationLead:
    "Ideation circled one idea: a shoe a young runner could customize and keep. Different rides from a drop-in midsole, a removable plate, and a heat-shrink upper that adapts as feet grow.",
  conceptOverview:
    "Built for Gen Alpha athletes, the Cloudboom Pulse adapts seamlessly between training and racing. A heat-shrink bootie upper molds to the foot for a laceless fit, a modular Helion-HF drop-in midsole tunes the ride, and a magnetized half-length carbon plate adds propulsion you can remove for easy days.",
  upperLead:
    "A double-lasted upper, fused to the Helion Superfoam chassis — built from a translucent knit and a heat-shrink overlay that forms to the foot.",
  midsoleLead:
    "The heart of the Pulse: a magnetized, swappable system. Tune the foam, add or remove the plate — and replace a worn part instead of the whole shoe.",
  sizing:
    "Because the heat-shrink upper forms to the foot, the Pulse drops traditional sizing for just four sizes — each spanning a range of foot lengths, so one pair grows with a young runner.",
  closing: "A shoe the next generation can tune, and keep.",
};

const STATS = [
  { to: 34, label: "world records in distance events fell between 2020 and 2024" },
  { to: 69, label: "American men broke four minutes in the mile in 2023 alone" },
  { to: 16, label: "of the 32 US high-schoolers ever to break four did so in 2020–2024" },
];

const FINDINGS = [
  "We start encouraging them to make decisions for themselves — they're mature enough to decide what's best for them.",
  "We're there just to guide them and give a second opinion.",
  "We always ask for their opinion, but we go for the one we think is most comfortable and functional.",
];

const PERSONAS = {
  athlete: {
    tag: "Generation Alpha",
    role: "The Athlete — uses the product",
    img: IMG.athlete,
    points: [
      "Competitive runners aged 10–15 in the later stages of Gen Alpha — and hardcore fans of the sport.",
      "Aiming to push their physical limits and build a foundation for a long running career.",
      "Driven by what feels cool, looks good, and creates a sense of belonging.",
    ],
  },
  sponsor: {
    tag: "Millennials",
    role: "The Sponsor — buys the product",
    img: IMG.sponsor,
    points: [
      "Parents, coaches, and siblings — the support system and mentors, often runners themselves.",
      "Want to inspire the next generation and provide high-performing gear that lasts.",
      "Motivated to run to inspire, juggling multiple identities and roles.",
    ],
  },
};

const ROTATION = [
  { type: "Max Cushion", model: "Cloudmonster Hyper", desc: "Plush · Comfort · Compliant" },
  { type: "Daily Trainer", model: "Cloudflow 4", desc: "Durable · Versatile · Balanced" },
  { type: "Super Shoe", model: "Cloudboom Echo 3", desc: "Fast · Aggressive · Propulsive" },
];

const MACRO = [
  { cat: "Society", title: "Intergenerational World", sub: "Life-stage designs" },
  { cat: "Industry", title: "Circular Economy", sub: "Repair & reuse" },
  { cat: "Creativity", title: "Multisensory Interfaces", sub: "Highly individual products" },
];

const MARKET = [
  { title: "Minimalism", sub: "Monomateriality · Simplified silhouettes" },
  { title: "Second Life", sub: "Non-gendered · Minimal hardware" },
  { title: "Soft Futurism", sub: "Fabric manipulation · Removable elements" },
];

const DESIGN_FOR = [
  { k: "Upper", v: "Dynamic and form-fitting." },
  { k: "Midsole", v: "Customizable for more use cases." },
  { k: "Plate", v: "A removable plate system." },
  { k: "Outsole", v: "Traction and coverage in high-wear areas." },
];

const UPPER_LAYERS = [
  { n: "01", title: "Heat-shrink knit overlay", body: "Shrinks to body heat, forming closely to the foot for a customized, laceless fit. Inspired by heat-shrink fabric tubing." },
  { n: "02", title: "Bottom-layer knit", body: "Thin, translucent knit that provides breathability and lockdown." },
  { n: "03", title: "Overlay reinforcement", body: "The same heat-shrink material, reinforced at the heel and arch where more support is needed." },
  { n: "04", title: "CPU outsole", body: "Thermoplastic polyurethane for durability, flexibility, and grip — and a canvas for future colorway graphics." },
  { n: "05", title: "Midsole cutout", body: "Saves weight and opens a window onto the modular drop-in midsole and branding." },
];

const MIDSOLE_LAYERS = [
  { n: "01", title: "Helion HF drop-in midsole", body: "Pebax-based, and offered in three softness levels — Standard, Responsive, and Plush — for a highly personalized ride." },
  { n: "02", title: "Magnetized carbon-fiber plate", body: "Half-length and H-shaped: less aggressive and more flexible for youth runners, and fully removable for a softer, more forgiving ride." },
  { n: "03", title: "Helion Superfoam chassis", body: "CloudTec in the heel for a soft landing and smooth transition, in a resilient foam built to withstand wear." },
  { n: "04", title: "Magnets", body: "Hold the carbon plate securely in place, in direct contact with the plate." },
];

const COMBOS = [
  { mode: "Easy", combo: "Plush foam · no plate" },
  { mode: "Training", combo: "Plush / Standard · plate optional" },
  { mode: "Racing", combo: "Responsive foam · plate in" },
];

const SIZES = [
  { s: "XS", us: "US 5–7" },
  { s: "S", us: "US 7–9" },
  { s: "M", us: "US 9–11" },
  { s: "L", us: "US 11–12" },
];

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
            const dur = 1300;
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
  return <span ref={ref}>{Math.round(val)}{suffix}</span>;
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

function LayerBuild({ src, alt, layers }: { src: string; alt: string; layers: { n: string; title: string; body: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="ss-build on-build-wide">
      <Reveal className="ss-build-fig">
        <div className="ss-fig-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
      </Reveal>
      <div className="ss-build-panel">
        <ol className="ss-build-list">
          {layers.map((l, i) => (
            <li key={l.n}>
              <button type="button" className={`ss-build-btn${i === active ? " active" : ""}`} onClick={() => setActive(i)} aria-expanded={i === active}>
                <span className="ss-build-n mono">{l.n}</span>
                <span className="ss-build-t">{l.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="ss-build-body" key={active}>{layers[active].body}</p>
      </div>
    </div>
  );
}

function PersonaToggle() {
  const [who, setWho] = useState<"athlete" | "sponsor">("athlete");
  const p = PERSONAS[who];
  return (
    <div className="on-persona">
      <div className="ss-fork-tabs" role="tablist" aria-label="Personas">
        <button type="button" role="tab" aria-selected={who === "athlete"} className={`ss-fork-tab${who === "athlete" ? " active" : ""}`} onClick={() => setWho("athlete")}>The Athlete</button>
        <button type="button" role="tab" aria-selected={who === "sponsor"} className={`ss-fork-tab${who === "sponsor" ? " active" : ""}`} onClick={() => setWho("sponsor")}>The Sponsor</button>
      </div>
      <div className="ss-two on-persona-body" key={who}>
        <div className="ss-fig-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.img} alt={p.role} loading="lazy" decoding="async" />
        </div>
        <div>
          <p className="ss-fork-tag mono accent">{p.tag}</p>
          <h4 className="ss-fork-title">{p.role}</h4>
          <ul className="on-persona-list">
            {p.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function OnCase() {
  return (
    <div className="ss">
      {/* 01 — CONTEXT */}
      <section className="ss-chapter">
        <ChapterHead num="01" kicker="Context" title="Generation Alpha & Running" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.context}</p></Reveal>
        <div className="ss-statband on-stat3">
          {STATS.map((s, i) => (
            <Reveal className="ss-stat" key={s.label} delay={(i % 3) * 90}>
              <div className="ss-stat-num display"><CountUp to={s.to} /></div>
              <p className="ss-stat-label">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="blockquote" className="ss-bigq"><p>{COPY.question}</p></Reveal>
      </section>

      {/* 02 — GENERATION ALPHA */}
      <section className="ss-chapter">
        <ChapterHead num="02" kicker="Research" title="Understanding Gen Alpha" />
        <div className="ss-two">
          <Fig src={IMG.fieldObs} alt="Field observation at On Williamsburg, NYC" caption="Field observation — On Williamsburg, NYC · April 2024" />
          <Reveal className="ss-two-text" delay={90}>
            <p className="ss-body">{COPY.genAlpha}</p>
            <p className="ss-body">{COPY.fieldObs}</p>
          </Reveal>
        </div>
        <div className="ss-reasons">
          {FINDINGS.map((f, i) => (
            <Reveal className="ss-reason" key={i} delay={i * 80}>
              <span className="ss-reason-n display">0{i + 1}</span>
              <p className="ss-reason-q">{`“${f}”`}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 — THE ATHLETE & THE SPONSOR */}
      <section className="ss-chapter">
        <ChapterHead num="03" kicker="Target Consumer" title="The Athlete & The Sponsor" />
        <Reveal className="ss-lede"><p className="ss-body ss-narrow">{COPY.targetIntro}</p></Reveal>
        <Reveal className="ss-block"><PersonaToggle /></Reveal>
      </section>

      {/* 04 — POSITIONING */}
      <section className="ss-chapter">
        <ChapterHead num="04" kicker="Strategy" title="Positioning" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.positioningIntro}</p></Reveal>

        <Reveal className="on-rotation-wrap">
          <div className="on-rotation">
            {ROTATION.map((r) => (
              <div className="on-rotation-cell" key={r.type}>
                <p className="on-rotation-type mono accent">{r.type}</p>
                <p className="on-rotation-model">{r.model}</p>
                <p className="on-rotation-desc mono-sm muted">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="on-scale">
            <span className="on-scale-end mono-sm muted">Easy</span>
            <div className="on-scale-bar"><span className="on-scale-mid">Midpacker</span></div>
            <span className="on-scale-end mono-sm muted">Max effort</span>
          </div>
        </Reveal>

        <Reveal as="blockquote" className="ss-bigq ss-bigq-sm"><p>{COPY.midpacker}</p></Reveal>

        <Fig src={IMG.refShoes} alt="Cloudboom Echo 3 and Cloudmonster Hyper" caption="The two reference models — Cloudboom Echo 3 (super shoe) and Cloudmonster Hyper (max cushion)" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.reviewLead}</p></Reveal>
      </section>

      {/* 05 — TRENDS */}
      <section className="ss-chapter">
        <ChapterHead num="05" kicker="Research" title="Trends" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.trendsLead}</p></Reveal>
        <div className="on-trend-tags">
          <Reveal className="ss-block">
            <p className="ss-eyebrow mono muted">Macro — WGSN STEPIC Drivers 2026</p>
            <div className="on-trends">
              {MACRO.map((t) => (
                <div className="on-trend" key={t.title}>
                  <span className="mono-sm muted">{t.cat}</span>
                  <h4 className="on-trend-t">{t.title}</h4>
                  <p className="on-trend-sub">{t.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Fig src={IMG.macroTrends} alt="Macro trends — intergenerational world, circular economy, multisensory interfaces" />
        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Market — WGSN Kidswear A/W 25–26</p>
          <div className="on-trends">
            {MARKET.map((t) => (
              <div className="on-trend" key={t.title}>
                <h4 className="on-trend-t">{t.title}</h4>
                <p className="on-trend-sub">{t.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Fig src={IMG.marketTrends} alt="Market trends — minimalism, second life, soft futurism" />
      </section>

      {/* 06 — THE BRIEF */}
      <section className="ss-chapter">
        <ChapterHead num="06" kicker="Creative Direction" title="The Brief" />
        <Reveal className="ss-lede">
          <p className="ss-def">{COPY.briefObjective}</p>
          <p className="ss-body">{COPY.brief}</p>
        </Reveal>
        <div className="ss-brief">
          {DESIGN_FOR.map((b, i) => (
            <Reveal className="ss-brief-row" key={b.k} delay={i * 70}>
              <span className="ss-brief-k mono accent">{b.k}</span>
              <span className="ss-brief-v">{b.v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 07 — INSPIRATION */}
      <section className="ss-chapter">
        <ChapterHead num="07" kicker="Moodboards" title="Inspiration" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.inspoLead}</p></Reveal>
        <Fig src={IMG.dna} alt="On DNA moodboard" caption="On DNA — clouds, Swiss roots, community, breakthroughs" />
        <Fig src={IMG.language} alt="Design style and language moodboard" caption="Design language — minimal, geometric, sleek, functional" />
        <Fig src={IMG.anatomy} alt="Natural anatomy inspiration moodboard" caption="Natural anatomy — split toes, the windlass effect, propulsive geometry" />
        <Fig src={IMG.upperMaterials} alt="Upper design and materials moodboard" caption="Upper — heat-shrink textile, bootie construction, laceless fit" />
        <Fig src={IMG.midsoleMaterials} alt="Midsole and outsole materials moodboard" caption="Midsole & outsole — drop-in midsole, carbon plate, CloudTec, customization" />
      </section>

      {/* 08 — IDEATION */}
      <section className="ss-chapter">
        <ChapterHead num="08" kicker="Ideation" title="From Sketch to System" />
        <Reveal className="ss-lede"><p className="ss-body">{COPY.ideationLead}</p></Reveal>
        <Fig src={IMG.sketches} alt="Concept sketches of the Cloudboom Pulse" caption="Concept sketches — resolving the silhouette and the modular sole" />
      </section>

      {/* 09 — THE CONCEPT */}
      <section className="ss-chapter">
        <ChapterHead num="09" kicker="Final Concept" title="On Cloudboom Pulse" />
        <Reveal className="ss-lede"><p className="ss-def">On Cloudboom Pulse</p><p className="ss-body">{COPY.conceptOverview}</p></Reveal>

        <Fig src={IMG.stack} alt="The prototype upper alongside its On references" caption="The prototype upper, beside its Cloudboom Echo 3 and Cloudmonster Hyper references" />

        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Upper & outsole — select a part</p>
          <p className="ss-body ss-narrow">{COPY.upperLead}</p>
          <LayerBuild src={IMG.upperBreakdown} alt="Upper and outsole breakdown" layers={UPPER_LAYERS} />
        </Reveal>

        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">Modular midsole — select a part</p>
          <p className="ss-body ss-narrow">{COPY.midsoleLead}</p>
          <LayerBuild src={IMG.midsoleBreakdown} alt="Midsole tooling breakdown" layers={MIDSOLE_LAYERS} />
          <div className="on-combos">
            {COMBOS.map((c) => (
              <div className="on-combo" key={c.mode}>
                <span className="on-combo-mode mono accent">{c.mode}</span>
                <span className="on-combo-val">{c.combo}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="ss-block">
          <p className="ss-eyebrow mono muted">One pair that grows — four sizes</p>
          <p className="ss-body ss-narrow">{COPY.sizing}</p>
          <div className="on-sizes">
            {SIZES.map((z) => (
              <div className="on-size" key={z.s}>
                <span className="on-size-s display">{z.s}</span>
                <span className="on-size-us mono-sm muted">{z.us}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Fig src={IMG.components} alt="The shoe components — chassis, drop-in midsole and plate, upper" caption="Components, left to right — magnet chassis, drop-in midsole + plate, upper" />

        <Reveal className="ss-closing">
          <p className="ss-closing-big display">Tune it. Keep it.</p>
          <p className="ss-closing-sub">{COPY.closing}</p>
        </Reveal>
      </section>
    </div>
  );
}
