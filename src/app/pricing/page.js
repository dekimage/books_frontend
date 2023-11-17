"use client";
import { useAuth } from "@/context/auth";
import { PricingBox } from "./PricingBox";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const freeData = {
  title: "Free (Always)",
  description: " Start creating your own book summaries",
  price: "$0",
  features: [
    "Create unlimited Ideas, Tasks, Routines, Questions",
    "Follow Categories for personalized suggestions",
    "Save content from the community to your library",
  ],
  cta: "Create Free Account",
};

const proData = {
  title: "Pro",
  description: "Upgrade to unlock all features",
  price: "$9",
  features: [
    "Create Private Ideas, Tasks, Routines, Questions",
    "Create Collections from multiple books to create custom learning paths",
    "Support us <3",
  ],
  cta: "Get Started",
};

const Pricing = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center p-8 gap-8 flex-col md:flex-row lg:flex-row">
      <PricingBox data={freeData} isAuthenticated={isAuthenticated} />
      <PricingBox data={proData} isAuthenticated={isAuthenticated} />
    </div>
  );
};
export default Pricing;
