import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Gate from "@/components/Gate";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono-sp" });

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
      <body className={`${bebas.variable} ${inter.variable} ${mono.variable}`}>
        <Gate>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Gate>
      </body>
    </html>
  );
}
