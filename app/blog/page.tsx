import type { Metadata } from "next";
import NotesPage from "../notes/page";

export const metadata: Metadata = {
  title: "notes",
  robots: { index: false, follow: true },
  alternates: { canonical: "/notes" },
};

export default NotesPage;
