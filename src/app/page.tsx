import Link from "next/link";
import Reveal from "@/components/Reveal";

type Entry = { role: string; org: string; year: string };

const EDUCATION: Entry[] = [
  { role: "Parsons School of Design", org: "BFA Product Design", year: "2020–2024" },
  { role: "George Brown College", org: "Design Management", year: "2024–2025" },
];

const EXPERIENCE: Entry[] = [
  { role: "Freelance Footwear Designer", org: "The Directive Collective", year: "2025–Present" },
  { role: "Art & Design Director", org: "HDNTRACK", year: "2025–Present" },
];

function CvColumn({ label, items, base }: { label: string; items: Entry[]; base: number }) {
  return (
    <div className="home-cv-col">
      <p className="home-cv-label mono muted">{label}</p>
      <ul className="home-cv-list">
        {items.map((it, i) => (
          <li className="home-cv-item" key={it.role}>
            <Reveal className="home-cv-inner" delay={base + i * 90}>
              <span className="home-cv-role">{it.role}</span>
              <span className="home-cv-sub">
                <span className="home-cv-org">{it.org}</span>
                <span className="home-cv-year mono-sm">{it.year}</span>
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <section className="home">
      <div className="home-lede">
        <Link href="/work" className="hero-line hero-swap">
          <span className="hero-swap-from">freelance</span>
          <span className="hero-swap-to" aria-hidden="true">work</span>
        </Link>
        <h1 className="hero-line">
          <Link href="/about" className="hero-swap">
            <span className="hero-swap-from">
              <span className="hero-nb">designing things</span>{" "}
              <span className="hero-nb">that perform<span className="hl">.</span></span>
            </span>
            <span className="hero-swap-to" aria-hidden="true">about</span>
          </Link>
        </h1>
        <Link href="/contact" className="hero-line hero-swap">
          <span className="hero-swap-from">
            <span className="hero-nb">toronto based</span>{" "}
            <span className="hero-nb">© 2026</span>
          </span>
          <span className="hero-swap-to" aria-hidden="true">contact</span>
        </Link>
      </div>

      <div className="home-cv">
        <CvColumn label="Education" items={EDUCATION} base={60} />
        <CvColumn label="Experience" items={EXPERIENCE} base={180} />
      </div>
    </section>
  );
}
