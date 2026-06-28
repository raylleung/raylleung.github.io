// Narrative storyboard for the SOAR case study, consumed by the interactive
// deck (src/components/SoarDeck.tsx). Phases run start → finish; the deck
// flattens them into one cyclable sequence while keeping the phase grouping
// for the progress nav. Image paths mirror projects.ts (auto-generated).

export type SoarCard = { src: string; caption: string };

export type SoarPhase = {
  num: string;
  title: string;
  note: string;
  cards: SoarCard[];
};

const img = (file: string) => `/img/soar/${file}`;

export const soarPhases: SoarPhase[] = [
  {
    num: "01",
    title: "Research & Strategy",
    note: "Reading the racing-shoe landscape and distilling the brand's DNA — the foundation every later decision is measured against.",
    cards: [
      { src: img("41e7f335-8d5a-4759-92a4-5ad23b3ca5ff.jpg"), caption: "Competitive positioning" },
      { src: img("faa2c899-ee3c-4518-af00-ab3ff3ff151e.jpg"), caption: "Brand DNA" },
    ],
  },
  {
    num: "02",
    title: "Moodboards",
    note: "Three visual directions — Future Fast, Tone Flow, Urban Form — explored through color, material, and texture, then pushed into the first concept sketches.",
    cards: [
      { src: img("34ff4d1a-d55e-4433-87c3-c5ab020a3559.jpg"), caption: "Direction A — “Future Fast”" },
      { src: img("81b70f8e-f708-4a62-8db8-cdb44afa79d3.jpg"), caption: "Direction A — materials & finish" },
      { src: img("76c6aefd-1c18-4ee6-904c-a8da42f726d9.jpg"), caption: "Direction B — “Tone Flow”" },
      { src: img("a3ef7413-8c0b-4a21-b970-e8fc85c3a327.jpg"), caption: "Direction B — graphics & texture" },
      { src: img("2a36a817-85e0-44b1-8fb3-f9953f26520f.jpg"), caption: "Direction C — “Urban Form”" },
      { src: img("e66a003f-5312-4383-a7f0-26bafa522e37.jpg"), caption: "Direction C — materials & finish" },
      { src: img("7399bd4d-083f-4fe5-901c-9e9e0b7ea55b.jpeg"), caption: "Concept sketches" },
      { src: img("d05a3b43-81e2-438a-bf8b-5fe60a4850b7.jpg"), caption: "Concept overview — A · B · C" },
      { src: img("c5167b11-366f-4191-a9bf-e1cfc41a06ed.jpg"), caption: "Concept C — direction" },
    ],
  },
  {
    num: "03",
    title: "Tech Pack",
    note: "Translating the chosen concept into a buildable package — construction, materials, and dimensioned detail, part by part.",
    cards: [
      { src: img("627fff87-8309-4a56-a907-561dfe3d53f1.jpg"), caption: "Construction & spec" },
      { src: img("bd67592f-c8d5-4fb5-9054-023d6616935f.jpg"), caption: "Upper — materials & call-outs" },
      { src: img("1fea4d1c-85eb-4815-b8b3-60320e12b3d6.jpg"), caption: "Outsole & footbed — call-outs" },
    ],
  },
  {
    num: "04",
    title: "Color Design",
    note: "Color directions taken from a broad exploration to one final story — and onto a real prototype that caught the running world's eye.",
    cards: [
      { src: img("3644d18e-8dc2-4ff3-9739-2d28002b53cc.jpg"), caption: "Colorway concepts — overview" },
      { src: img("31e9faa2-629b-4096-9ca5-ad9b6a837da1.jpg"), caption: "Colorway concepts — full range" },
      { src: img("73a9abe7-c203-4b09-95bd-22b726b39e92.jpg"), caption: "Color concept — final direction" },
      { src: img("3b781a83-12aa-4e41-a18e-23ccfd9a4019.png"), caption: "Prototype, spotted in the wild" },
      { src: img("5f3a0d83-5a1c-479b-938b-a0ee2168b211.png"), caption: "Prototype — the response" },
    ],
  },
];
