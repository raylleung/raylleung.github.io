import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About" };

// equal vertical rhythm between subtitle → bio → links
const GAP = "clamp(28px, 3.6vw, 44px)";

export default function AboutPage() {
  return (
    <section className="edge" style={{ paddingBlock: "clamp(40px,7vw,84px)" }}>
      <p className="mono accent" style={{ marginBottom: 16 }}>
        About
      </p>
      <h1 className="hero-line proj-title--titlecase">My name is Ray Leung.</h1>
      <p style={{ margin: "18px 0 0", maxWidth: "54ch", fontSize: "clamp(16px,1.6vw,21px)", lineHeight: 1.6 }}>
        A BFA Product Design graduate at Parsons School of Design.
      </p>

      <div className="prose" style={{ marginTop: GAP }}>
        {site.bio.map((para, i) => (
          <Reveal key={i} as="p" delay={i * 40}>
            {para}
          </Reveal>
        ))}
      </div>

      <div style={{ marginTop: GAP, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
          Full Résumé / CV <span aria-hidden="true">↗</span>
        </a>
        <Link href="/contact" className="btn">
          Contact <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
