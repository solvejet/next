// src/app/not-found.tsx
import type { Metadata } from "next";
import NotFoundTemplate from "@/components/NotFoundTemplate";

export const metadata: Metadata = {
  title: "404: Page Not Found | SolveJet",
  description: "The page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundTemplate />;
}
