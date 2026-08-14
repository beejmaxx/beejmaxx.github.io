import type { Metadata } from "next";
import { SiteSystemLab } from "./SiteSystemLab";

export const metadata: Metadata = {
  title: "Site system lab",
  robots: { index: false, follow: false },
};

export default function SiteSystemConceptPage() {
  return <SiteSystemLab />;
}
