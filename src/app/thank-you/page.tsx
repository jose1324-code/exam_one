import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYouPage from "@/components/ThankYouPage";

export const metadata: Metadata = {
  title: "You're In! — BrightPath Academy (Sample)",
  description: "Your FREE demo class is booked. We'll call within 24 hours. (Fictional demo website — all data is sample.)",
};

export default function ThankYouRoute() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-deep text-white">Loading your booking…</div>}>
      <ThankYouPage />
    </Suspense>
  );
}
