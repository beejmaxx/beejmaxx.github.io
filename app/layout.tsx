import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beejmaxx.github.io"),
  title: {
    default: "Bijan Pourriahi",
    template: "%s — Bijan Pourriahi",
  },
  description:
    "Software projects, case studies, blog posts, and unfinished work by Bijan Pourriahi.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Bijan Pourriahi",
    description: "Projects, case studies, blog posts, and unfinished work.",
    type: "website",
    url: "https://beejmaxx.github.io",
    siteName: "Bijan Pourriahi",
    images: [{ url: "/og.png", width: 1733, height: 909, alt: "Bijan Pourriahi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bijan Pourriahi",
    description: "Projects, case studies, blog posts, and unfinished work.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">{children}</body>
    </html>
  );
}
