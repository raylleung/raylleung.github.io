import { projects } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";

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
          <p className="hero-line">toronto based © 2026</p>
        </div>
      </section>

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
