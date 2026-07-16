"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/work" ? pathname.startsWith("/work") : pathname === href;

  return (
    <header className="nav">
      <Link href="/" className="nav-brand" aria-label="Ray Leung — home">
        RAY&nbsp;LEUNG
      </Link>
      <nav className="nav-links" aria-label="Primary">
        {site.navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link${isActive(l.href) ? " active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
