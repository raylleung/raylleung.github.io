import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="ticker" style={{ borderTop: 0 }}>
        <div>Open to opportunities</div>
        <div>Footwear · Product</div>
        <div>Based in {site.location.split("→").pop()?.trim()}</div>
        <div>2025</div>
      </div>

      <div className="edge" style={{ paddingBlock: "clamp(40px,7vw,84px)" }}>
        <p className="mono" style={{ color: "var(--accent)", marginBottom: 18 }}>
          Let&rsquo;s build something fast
        </p>
        <Link href="/contact" className="big" style={{ display: "inline-block" }}>
          Get in touch
        </Link>

        <div
          style={{
            marginTop: "clamp(32px,5vw,56px)",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div className="foot-soc">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <p className="mono-sm" style={{ color: "rgba(242,238,229,0.55)" }}>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
