import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, adjacent } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import ProjectStory from "@/components/ProjectStory";
import RabbitCase from "@/components/RabbitCase";
import SoarCase from "@/components/SoarCase";
import SuperShoesCase from "@/components/SuperShoesCase";
import OnCase from "@/components/OnCase";
import Lightbox from "@/components/Lightbox";
import ArmsRestCase from "@/components/ArmsRestCase";
import StickOutCase from "@/components/StickOutCase";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Not found" };
  return { title: p.title, description: p.blurb };
}

function buildRows(gallery: string[]) {
  const rows: string[][] = [];
  let i = 0;
  let toggle = 0;
  while (i < gallery.length) {
    if (toggle % 2 === 0) {
      rows.push([gallery[i]]);
      i += 1;
    } else {
      rows.push(gallery.slice(i, i + 2));
      i += 2;
    }
    toggle += 1;
  }
  return rows;
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const { prev, next } = adjacent(slug);
  const rows = buildRows(p.gallery);

  return (
    <>
      {/* HERO */}
      <section className="proj-hero">
        <div className="edge" style={{ paddingBlock: "clamp(30px,5vw,64px)" }}>
          <p className="mono accent" style={{ marginBottom: 16 }}>
            {p.index} / {p.category}
          </p>
          {/* rabbit + super-shoes use the landing-page hero text style (size/weight);
              rabbit stays lowercase, super-shoes keeps its title case; others use the big display face */}
          <h1
            className={
              p.slug === "rabbit"
                ? "hero-line"
                : p.slug === "super-shoes" || p.slug === "on-case-study" || p.slug === "armsrest" || p.slug === "stick-out" || p.slug === "soar"
                  ? "hero-line proj-title--titlecase"
                  : "display proj-hero-title"
            }
          >
            {p.title}
          </h1>
          <p style={{ marginTop: 18, maxWidth: "54ch", fontSize: "clamp(16px,1.6vw,21px)", lineHeight: 1.6 }}>
            {p.blurb}
          </p>
        </div>

        <div className="proj-meta">
          <div>
            <div className="k mono-sm">Discipline</div>
            <div className="v">{p.discipline.join(" · ")}</div>
          </div>
          <div>
            <div className="k mono-sm">Category</div>
            <div className="v">{p.category}</div>
          </div>
          <div>
            <div className="k mono-sm">Year</div>
            <div className="v">{p.year || "—"}</div>
          </div>
          <div>
            <div className="k mono-sm">{p.credit ? "Credit" : "Designer"}</div>
            <div className="v">{p.credit || "Ray Leung"}</div>
          </div>
        </div>
      </section>

      {/* COVER */}
      <div className={`proj-cover${p.slug === "super-shoes" || p.slug === "on-case-study" || p.slug === "armsrest" || p.slug === "stick-out" || p.slug === "soar" || p.slug === "rabbit" ? " proj-cover--inset" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={`${p.title} — cover`} />
      </div>

      {/* STORY */}
      {p.story ? <ProjectStory story={p.story} /> : null}

      {/* GALLERY — rabbit gets the chaptered story layout, soar the interactive deck; others use the default flow */}
      {p.slug === "rabbit" ? (
        <RabbitCase />
      ) : p.slug === "soar" ? (
        <SoarCase />
      ) : p.slug === "super-shoes" ? (
        <SuperShoesCase />
      ) : p.slug === "on-case-study" ? (
        <OnCase />
      ) : p.slug === "armsrest" ? (
        <ArmsRestCase />
      ) : p.slug === "stick-out" ? (
        <StickOutCase />
      ) : (
      <div className="gallery-wrap">
        {rows.map((row, ri) =>
          row.length === 1 ? (
            <Reveal key={ri} className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={row[0]} alt={`${p.title} — ${ri + 1}`} loading="lazy" decoding="async" />
            </Reveal>
          ) : (
            <div className="gallery two" key={ri}>
              {row.map((src, ci) => (
                <Reveal key={ci} className="shot" delay={ci * 70}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${p.title} — ${ri + 1}.${ci + 1}`} loading="lazy" decoding="async" />
                </Reveal>
              ))}
            </div>
          )
        )}
      </div>
      )}

      {/* PREV / NEXT */}
      <nav className="proj-nav" aria-label="Project navigation">
        <Link href={`/work/${prev.slug}`}>
          <span className="mono-sm muted">← Previous</span>
          <span className="t">{prev.title}</span>
        </Link>
        <Link href={`/work/${next.slug}`}>
          <span className="mono-sm muted">Next →</span>
          <span className="t">{next.title}</span>
        </Link>
      </nav>
      <Lightbox />
    </>
  );
}
