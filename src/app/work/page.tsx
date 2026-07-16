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
      <ProjectGrid projects={projects} />
    </section>
  );
}
