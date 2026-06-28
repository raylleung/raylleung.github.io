import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import ProjectGrid from "@/components/ProjectGrid";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero hero--text">
        <div className="hero-left hero-left--stack">
          <p className="hero-line">freelance</p>
          <h1 className="hero-line">
            designing things that perform<span className="hl">.</span>
          </h1>
          <div className="stats">
            {site.prs.map((p) => (
              <div className="stat" key={p.label}>
                <div className="num">{p.num}</div>
                <div className="lab mono-sm muted">{p.label}</div>
              </div>
            ))}
          </div>
          <p className="hero-line">toronto based © 2026</p>
        </div>
      </section>

      <Marquee
        items={["Footwear Design", "Product Design", "Tech Packs", "Color & Materials", "Running"]}
      />

      {/* WORK */}
      <section id="work">
        <div className="ticker">
          <div>Selected work</div>
          <div>{String(projects.length).padStart(2, "0")} Projects</div>
          <div>Footwear / Product / Furniture</div>
          <div>Scroll ↓</div>
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
