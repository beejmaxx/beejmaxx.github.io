import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beejmaxx.github.io"),
  title: {
    default: "bijan",
    template: "%s — bijan",
  },
  description:
    "Instruments, evidence systems, books, collections, and unfinished inquiries by bijan.",
  alternates: {
    canonical: "/",
    types: { "application/atom+xml": "/feed.xml" },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "bijan",
    description: "I make hidden systems inspectable.",
    type: "website",
    url: "https://beejmaxx.github.io",
    siteName: "bijan",
    images: [{ url: "/og.jpg", width: 1242, height: 652, alt: "bijan — making hidden systems inspectable" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "bijan",
    description: "I make hidden systems inspectable.",
    images: ["/og.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "bijan",
  url: "https://beejmaxx.github.io",
  sameAs: ["https://github.com/beejmaxx"],
  knowsAbout: ["Rust", "Python", "interactive systems", "simulation", "research infrastructure"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="personal"||t==="dossier"||t==="hybrid")document.documentElement.dataset.theme=t;}catch(_){}})();` }} />
      </head>
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
