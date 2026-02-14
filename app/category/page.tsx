import React, { Suspense } from "react";
import CategoryHero from "@/app/sections/CategoryHero";
import CategoryListing from "@/app/sections/CategoryListing";
import Footer from "../components/footer";

export default function CategoryPage() {
  return (
    <>
      <Suspense fallback={<div className="bg-[#FCF8F8] h-24" />}>
        <CategoryHero />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-[#FCF8F8]" />}>
        <CategoryListing />
      </Suspense>

      <Footer />
    </>
  );
}
