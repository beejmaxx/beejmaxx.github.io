import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beejmaxx.github.io"),
  title: {
    default: "bijan",
    template: "%s — bijan",
  },
  description:
    "Software projects, case studies, blog posts, and unfinished work by bijan.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "bijan",
    description: "Projects, case studies, blog posts, and unfinished work.",
    type: "website",
    url: "https://beejmaxx.github.io",
    siteName: "bijan",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "bijan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "bijan",
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
