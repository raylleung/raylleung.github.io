import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="edge" style={{ paddingBlock: "clamp(40px,7vw,84px)" }}>
        <p className="mono accent" style={{ marginBottom: 18 }}>
          About
        </p>
        <h1 className="about-lead" style={{ maxWidth: "16ch" }}>
          My name is Ray Leung.
        </h1>
        <p
          className="display"
          style={{ marginTop: 14, fontSize: "clamp(18px,2.4vw,30px)", lineHeight: 1.05, color: "var(--ink-soft)", maxWidth: "26ch" }}
        >
          A recent BFA Product Design graduate at Parsons School of Design.
        </p>
      </section>

      <div className="ticker">
        {site.prs.map((p) => (
          <div key={p.label}>
            {p.label} — {p.num}
          </div>
        ))}
        <div>7 yrs racing</div>
      </div>

      <section
        className="edge"
        style={{ paddingBlock: "clamp(40px,6vw,72px)", display: "grid", gap: "clamp(28px,5vw,64px)", gridTemplateColumns: "minmax(0,1fr)" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: "clamp(28px,5vw,64px)", alignItems: "start" }} className="about-cols">
          <div className="prose">
            {site.bio.map((para, i) => (
              <Reveal key={i} as="p" delay={i * 40}>
                {para}
              </Reveal>
            ))}
            <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                Full Résumé / CV <span aria-hidden="true">↗</span>
              </a>
              <Link href="/contact" className="btn">
                Contact <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside style={{ borderTop: "1px solid var(--ink)", paddingTop: 18 }}>
            <Detail k="Role" v={site.role} />
            <Detail k="Education" v={site.school} />
            <Detail k="Based" v={site.location} />
            <Detail k="Focus" v="Performance running footwear" />
            <Detail k="Disciplines" v="Footwear · Product · Furniture · Tech Packs" />
          </aside>
        </div>
      </section>
    </>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ padding: "13px 0", borderBottom: "1px solid var(--line)" }}>
      <div className="mono-sm muted" style={{ marginBottom: 6 }}>
        {k}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.5 }}>{v}</div>
    </div>
  );
}
