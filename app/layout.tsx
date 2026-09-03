import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beejmaxx.github.io"),
  title: {
    default: "bijan's notes",
    template: "%s — Bijan Pourriahi",
  },
  description:
    "Notes on software, systems, markets, and the work of building them.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "bijan's notes",
    description: "Notes on software, systems, markets, and the work of building them.",
    type: "website",
    url: "https://beejmaxx.github.io",
    siteName: "bijan's notes",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "bijan's notes — software, systems, markets, and the work of building them" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "bijan's notes",
    description: "Notes on software, systems, markets, and the work of building them.",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bijan Pourriahi",
  url: "https://beejmaxx.github.io",
  sameAs: ["https://github.com/beejmaxx"],
  knowsAbout: ["Rust", "Python", "agent infrastructure", "process supervision", "developer tooling", "stateful systems"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
