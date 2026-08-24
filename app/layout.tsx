import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beejmaxx.github.io"),
  title: {
    default: "bijan",
    template: "%s — bijan",
  },
  description:
    "Reliable agent infrastructure, developer tooling, stateful execution systems, and technical instruments by Bijan.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "bijan",
    description: "Reliable systems for agents and operators.",
    type: "website",
    url: "https://beejmaxx.github.io",
    siteName: "bijan",
    images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "bijan — making hidden systems easier to inspect" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "bijan",
    description: "Reliable systems for agents and operators.",
    images: ["/og-v2.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "bijan",
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
