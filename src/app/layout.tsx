import type { Metadata } from "next";
import "./globals.css";
import Gate from "@/components/Gate";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Portfolio of Ray Leung, a footwear and product designer and competitive runner. Performance-driven footwear, product, and furniture design.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: "Performance-driven footwear, product, and furniture design.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Adobe Fonts — Helvetica Neue LT Pro (used site-wide via --font-* tokens) */}
        <link rel="stylesheet" href="https://use.typekit.net/pxx6gjb.css" />
      </head>
      <body>
        <Gate>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Gate>
      </body>
    </html>
  );
}
