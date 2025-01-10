
import dynamic from "next/dynamic";
import { CardSkeleton } from "@/components/ui/Skeleton";

// Dynamically import the HeroSection component
const HeroSection = dynamic(
  () => import("@/components/pages/Home/HeroSection"),
  {
    ssr: true,
    loading: () => <CardSkeleton />,
  }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      {/* Other sections will go here */}
    </main>
  );
}
