import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="edge" style={{ paddingBlock: "clamp(40px,7vw,90px)" }}>
        <p className="mono accent" style={{ marginBottom: 18 }}>
          Contact
        </p>
        <h1 className="display" style={{ fontSize: "clamp(52px,13vw,180px)" }}>
          Let&rsquo;s talk<span className="accent">.</span>
        </h1>
        <p style={{ marginTop: 16, maxWidth: "46ch", fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7 }}>
          Open to footwear and product design roles, freelance, and collaborations. The fastest
          way to reach me is email.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="display link-u"
          style={{ display: "inline-block", marginTop: "clamp(28px,5vw,56px)", fontSize: "clamp(24px,5vw,64px)", borderBottomWidth: 2 }}
        >
          {site.email}
        </a>
      </section>

      <div className="ticker">
        <div>Available 2025</div>
        <div>Footwear · Product</div>
        <div>{site.location}</div>
        <div>Remote / On-site</div>
      </div>

      <section className="edge" style={{ paddingBlock: "clamp(36px,6vw,72px)" }}>
        <p className="mono muted" style={{ marginBottom: 18 }}>
          Elsewhere
        </p>
        <div style={{ borderTop: "1px solid var(--ink)" }}>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="contact-row"
            >
              <span className="display" style={{ fontSize: "clamp(26px,4vw,46px)" }}>
                {s.label}
              </span>
              <span className="mono-sm muted" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="contact-row">
            <span className="display" style={{ fontSize: "clamp(26px,4vw,46px)" }}>
              Résumé / CV
            </span>
            <span className="mono-sm muted" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
