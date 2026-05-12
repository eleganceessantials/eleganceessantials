"use client";

import React, { Suspense, useEffect } from "react";
import CategoryHero from "@/app/sections/CategoryHero";
import CategoryListing from "@/app/sections/CategoryListing";
import Footer from "../components/footer";
import ShippingTicker from "../components/Ticker";

export default function CategoryPage() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <>
      <Suspense fallback={<div className="bg-[#FCF8F8] h-24" />}>
        <CategoryHero />
      </Suspense>

      <Suspense fallback={<div className="bg-[#FCF8F8] h-12" />}>
        <ShippingTicker />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-[#FCF8F8]" />}>
        <CategoryListing />
      </Suspense>

      <Footer />
    </>
  );
}