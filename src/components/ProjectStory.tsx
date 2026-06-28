import type { Story } from "@/lib/projects";
import Reveal from "./Reveal";

export default function ProjectStory({ story }: { story: Story }) {
  return (
    <section className="story">
      {story.challenge ? (
        <div className="edge story-pad">
          <Reveal>
            <p className="mono accent" style={{ marginBottom: 18 }}>
              The challenge
            </p>
            <p className="display story-challenge">{story.challenge}</p>
          </Reveal>
        </div>
      ) : null}

      {story.stats?.length ? (
        <div className="story-stats">
          {story.stats.map((s, i) => (
            <Reveal key={i} className="story-stat" delay={i * 80}>
              <div className="story-stat-num display">{s.value}</div>
              <p className="story-stat-text">{s.text}</p>
              <p className="mono-sm muted">{s.source}</p>
            </Reveal>
          ))}
        </div>
      ) : null}

      {story.insights?.length ? (
        <div className="edge story-pad story-insights">
          {story.insights.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="display story-insight">{it.lead}</p>
              {it.sub ? <p className="muted story-insight-sub">{it.sub}</p> : null}
            </Reveal>
          ))}
        </div>
      ) : null}

      {story.quote ? (
        <div className="edge story-pad story-quote-wrap">
          <Reveal>
            <p className="story-quote">
              <span className="accent" aria-hidden="true">
                &ldquo;
              </span>
              {story.quote.text}
            </p>
            <p className="mono-sm muted" style={{ marginTop: 18 }}>
              {story.quote.author}
            </p>
          </Reveal>
        </div>
      ) : null}

      {story.brief || story.specs?.length ? (
        <div className="edge story-pad story-brief-grid">
          {story.brief ? (
            <div>
              <p className="mono accent" style={{ marginBottom: 16 }}>
                Design brief
              </p>
              <p className="story-brief">{story.brief}</p>
            </div>
          ) : null}
          {story.specs?.length ? (
            <div className="story-specs">
              {story.specs.map((sp) => (
                <div key={sp.k} className="story-spec">
                  <div className="mono-sm muted" style={{ marginBottom: 6 }}>
                    {sp.k}
                  </div>
                  <div className="story-spec-v">{sp.v}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
