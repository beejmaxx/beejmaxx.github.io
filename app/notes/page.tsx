import type { Metadata } from "next";
import HomePage from "../page";

export const metadata: Metadata = {
  title: "Posts",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default HomePage;
