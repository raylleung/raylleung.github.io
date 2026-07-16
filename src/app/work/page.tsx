import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected footwear, product, and furniture design projects by Ray Leung.",
};

export default function Work() {
  return (
    <section id="work">
      <div className="ticker">
        <div>Selected work</div>
        <div>{String(projects.length).padStart(2, "0")} Projects</div>
        <div>Footwear / Product / Furniture</div>
        <div>Scroll ↓</div>
      </div>
      <ProjectGrid projects={projects} />
    </section>
  );
}
