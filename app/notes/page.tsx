import type { Metadata } from "next";
import BlogPage from "../blog/page";

export const metadata: Metadata = {
  title: "Posts",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true },
};

export default BlogPage;
