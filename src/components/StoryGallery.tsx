import Reveal from "./Reveal";
import type { StoryChapter, StoryPlate } from "@/lib/rabbitStory";

// Group a chapter's plates into rows: two consecutive "half" plates share a
// row (e.g. an upper paired with its outsole); everything else spans full width.
function toRows(plates: StoryPlate[]): StoryPlate[][] {
  const rows: StoryPlate[][] = [];
  for (let i = 0; i < plates.length; i++) {
    if (plates[i].layout === "half" && plates[i + 1]?.layout === "half") {
      rows.push([plates[i], plates[i + 1]]);
      i++;
    } else {
      rows.push([plates[i]]);
    }
  }
  return rows;
}

function Plate({ plate, delay = 0 }: { plate: StoryPlate; delay?: number }) {
  return (
    <Reveal className="plate" delay={delay}>
      <div className="plate-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={plate.src} alt={plate.caption ?? ""} loading="lazy" decoding="async" />
      </div>
      {plate.caption ? <p className="plate-cap mono-sm muted">{plate.caption}</p> : null}
    </Reveal>
  );
}

export default function StoryGallery({ chapters }: { chapters: StoryChapter[] }) {
  return (
    <div className="story-gallery">
      {chapters.map((ch) => (
        <section className="story-chapter" key={ch.num}>
          <Reveal className="story-chapter-head">
            <p className="chapter-kicker mono accent">Phase {ch.num}</p>
            <h2 className="chapter-title display">{ch.title}</h2>
            <p className="chapter-note">{ch.note}</p>
          </Reveal>

          <div className="story-plates">
            {toRows(ch.plates).map((row, ri) =>
              row.length === 2 ? (
                <div className="plate-row" key={ri}>
                  {row.map((pl, ci) => (
                    <Plate key={pl.src} plate={pl} delay={ci * 80} />
                  ))}
                </div>
              ) : (
                <Plate key={row[0].src} plate={row[0]} />
              )
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
