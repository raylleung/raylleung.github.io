// Narrative ordering of the rabbit gallery — groups the raw images into the
// project's actual phases so the page reads as a story rather than a flat grid.
// Image paths intentionally mirror projects.ts (which is auto-generated); this
// file is the hand-authored storyboard layered on top of that data.

export type StoryPlate = {
  src: string;
  /** "half" plates pair up two-across; "full" (default) spans the column. */
  layout?: "full" | "half";
  caption?: string;
};

export type StoryChapter = {
  num: string;
  title: string;
  note: string;
  plates: StoryPlate[];
};

const img = (file: string) => `/img/rabbit/${file}`;

export const rabbitChapters: StoryChapter[] = [
  {
    num: "01",
    title: "Research & Strategy",
    note: "Every fast shoe starts with the runner. I mapped the competitive field, the rhythm of a training week, and the paces runners actually race — pinpointing where a new super-trainer could earn its place.",
    plates: [
      { src: img("3a6c0199-2e0b-4803-80b5-6d4aedc6c1fd.jpg"), caption: "Competitive positioning" },
      { src: img("2ee52bff-2081-4891-816c-eb2acf384dfd.jpg"), caption: "Training week → footwear strategy" },
      { src: img("55178ab8-1946-40d4-b5ba-16df129bc33c.jpg"), caption: "Pace & corral mapping" },
    ],
  },
  {
    num: "02",
    title: "Moodboards",
    note: "From the brand's DNA to color, texture, and form references — translating a feeling into a clear creative direction, then pushing it into the first concept sketches.",
    plates: [
      { src: img("63f5b544-fca8-4a9c-8105-8bec5100e699.jpg"), caption: "Brand DNA" },
      { src: img("016de4a5-6d23-493c-be13-d5b255140b6f.jpg"), caption: "CMF inspiration" },
      { src: img("d705fa93-c154-4d6e-b187-07245c45afad.jpg"), caption: "Creative inspiration" },
      { src: img("4bbd162a-bc2d-4438-917d-4361d13166a9.jpg"), caption: "Concept overview — A · B · C" },
      { src: img("73626e1c-64fd-429d-a562-08dd0b51a8fc.jpg"), caption: "Concept B — direction" },
    ],
  },
  {
    num: "03",
    title: "Tech Pack",
    note: "Turning the chosen concept into something buildable: construction, materials, and dimensioned detail, ready to hand to a factory.",
    plates: [
      { src: img("0fe80fc2-e24f-47af-a075-e7adfd40ff96.jpg"), caption: "Construction & spec" },
      { src: img("6e6c9747-7b7f-4683-abb3-14c5c02e1c2e.jpg"), caption: "Construction views" },
    ],
  },
  {
    num: "04",
    title: "Color Design",
    note: "Three color directions explored end to end — a full colorway grid, upper and outsole call-outs for each, dedicated outsole studies, and a matching apparel collection to complete the story.",
    plates: [
      { src: img("6b185407-3261-418f-81ed-5d01ada9eaaa.jpg"), caption: "Colorway concepts — men's · women's · core" },
      { src: img("666df22a-fabf-4c7a-933d-0a0715428b5e.jpg"), layout: "half", caption: "Direction A — upper & materials" },
      { src: img("0626fb9b-3b71-492e-9335-b5c008977e45.jpg"), layout: "half", caption: "Direction A — outsole & trims" },
      { src: img("1a47cef5-bdc0-44b7-b541-04931a41e932.jpg"), layout: "half", caption: "Direction B — upper & materials" },
      { src: img("ca0884a1-1b4e-43b2-9fdd-e2604d530e72.jpg"), layout: "half", caption: "Direction B — outsole & trims" },
      { src: img("174456c6-2a75-4534-a012-e8c4757d301c.jpg"), layout: "half", caption: "Direction C — upper & materials" },
      { src: img("2194794d-3dfc-4c1f-9af6-d3caf6629a3a.jpg"), layout: "half", caption: "Direction C — outsole & trims" },
      { src: img("7300ce31-c2aa-451b-a243-85c8c0506607.jpg"), caption: "Outsole color study — Direction A" },
      { src: img("e5cd71e6-6751-4ee4-929c-a6a138e889d4.jpg"), caption: "Outsole color study — Direction B" },
      { src: img("413f7dd1-2dee-425c-9df3-158ac7a49082.jpg"), caption: "Cadence collection — women" },
      { src: img("f91d7934-305b-4f7e-9291-63a97d570e82.jpg"), caption: "Cadence collection — men" },
    ],
  },
];
