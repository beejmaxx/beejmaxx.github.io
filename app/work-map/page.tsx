import type { Metadata } from "next";
import WorkPage from "../work/page";

export const metadata: Metadata = {
  title: "work",
  robots: { index: false, follow: true },
  alternates: { canonical: "/work" },
};

export default WorkPage;
