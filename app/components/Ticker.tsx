"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ShippingTicker() {
  const tickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const ctx = gsap.context(() => {
      gsap.to(".ticker-track", {
        xPercent: -50,
        duration: 100,
        ease: "none",
        repeat: -1,
      });
    }, ticker);

    return () => ctx.revert();
  }, []);

  const items = Array.from({ length: 12 }, (_, index) => index);

  return (
    <section
      ref={tickerRef}
      className="relative w-full overflow-hidden bg-[#DB005B] py-3 text-white"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#DB005B] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#DB005B] to-transparent" />

      <div className="ticker-track flex w-max items-center gap-8 whitespace-nowrap">
        {[...items, ...items].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-8 text-sm sm:text-base font-black uppercase tracking-[0.22em]"
          >
            <span>FREE SHIPPING ALL OVER PAKISTAN</span>
            <span className="h-2 w-2 rounded-full bg-white/80" />
          </div>
        ))}
      </div>
    </section>
  );
}