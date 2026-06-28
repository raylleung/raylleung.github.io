import Link from "next/link";
import Reveal from "./Reveal";
import type { Project } from "@/lib/projects";

const COLS = 4;

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const ghosts = (COLS - (projects.length % COLS)) % COLS;

  return (
    <div className="grid">
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={(i % COLS) * 70}>
          <Link href={`/work/${p.slug}`} className="tile" style={{ height: "100%" }}>
            <div className="tile-media">
              <span className="tile-idx">{p.index}</span>
              <span className="tile-arrow" aria-hidden="true">
                ↗
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover} alt={`${p.title} — ${p.category}`} loading="lazy" decoding="async" />
            </div>
            <div className="tile-body">
              <div>
                <div className="tile-title">{p.title}</div>
                <div className="tile-cat mono-sm muted">{p.category}</div>
              </div>
              {p.year ? <span className="mono-sm muted">{p.year}</span> : null}
            </div>
          </Link>
        </Reveal>
      ))}

      {Array.from({ length: ghosts }).map((_, i) => (
        <div className="grid-ghost" key={`ghost-${i}`} aria-hidden="true" />
      ))}
    </div>
  );
}
