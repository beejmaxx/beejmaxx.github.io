import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beejmaxx.github.io"),
  title: {
    default: "Bijan Pourriahi",
    template: "%s — Bijan Pourriahi",
  },
  description:
    "Systems engineer building runtimes, integrations, and tools for complex, stateful systems.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Bijan Pourriahi",
    description: "Systems engineer building runtimes, integrations, and tools for complex, stateful systems.",
    type: "website",
    url: "https://beejmaxx.github.io",
    siteName: "Bijan Pourriahi",
    images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "Bijan Pourriahi — systems engineer building runtimes, integrations, and tools for complex, stateful systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bijan Pourriahi",
    description: "Systems engineer building runtimes, integrations, and tools for complex, stateful systems.",
    images: ["/og-v2.png"],
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
