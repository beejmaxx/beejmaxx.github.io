import type { Metadata } from "next";
import HomePage from "../page";

export const metadata: Metadata = {
  title: "Posts",
  description: "Notes on software, systems, markets, and the work of building them.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default HomePage;
