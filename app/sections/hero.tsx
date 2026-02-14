"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const transformStyle = useMemo(
    () => ({
      transform: `scale(1.06) translateX(${mousePos.x}px) translateY(${mousePos.y}px)`,
    }),
    [mousePos.x, mousePos.y]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <section className="w-full h-[80vh] min-h-[520px] bg-[#FCF8F8]">
      <div
        className="relative w-full h-full overflow-hidden rounded-b-[2.5rem]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <img
          src="/foundation-bottles-advertising-arrangement_23-2149511225.avif"
          alt="Beauty Collection"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={transformStyle}
        />

        {/* Dark + Gradient Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/10" />

        {/* Soft Pink Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#DB005B]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#DB005B]/15 blur-3xl" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur text-white/90 text-sm">
              <span className="w-2 h-2 rounded-full bg-[#DB005B]" />
              Authentic Beauty Essentials
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Discover Your{" "}
              <span className="text-[#DB005B]">Natural Beauty</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg md:text-xl text-pink-100/90 max-w-2xl mx-auto">
              Premium skincare & makeup — curated for glow, confidence, and everyday elegance.
            </p>

            {/* SINGLE CTA BUTTON */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => router.push("/category?cat=all")}
                className="px-12 py-4 rounded-full font-semibold text-lg
                           bg-[#DB005B] text-white border border-[#DB005B]
                           shadow-lg transition-all duration-300 cursor-pointer
                           hover:bg-white hover:text-[#DB005B] hover:scale-[1.02]
                           active:scale-[0.98]"
              >
                Shop Now →
              </button>
            </div>

            {/* Trust Line */}
            <p className="mt-6 text-xs sm:text-sm text-white/70">
              🔒 Secure Checkout • 🚚 Fast Delivery • 🔁 Easy Returns
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
