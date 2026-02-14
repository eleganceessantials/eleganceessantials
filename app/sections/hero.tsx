"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="w-full h-screen">
      <div
        className="relative w-full h-full overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <img
          src="/foundation-bottles-advertising-arrangement_23-2149511225.avif"
          alt="Beauty Collection"
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{
            transform: `scale(1.05) translateX(${mousePos.x}px) translateY(${mousePos.y}px)`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">

            {/* Heading */}
            <h1
              className="text-6xl md:text-7xl font-extrabold mb-6"
              style={{
                background: "linear-gradient(to right, #ff9ecb, white)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1px #ffffff",
              }}
            >
              Discover Your Natural Beauty
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-pink-200 mb-10 font-medium">
              Premium Makeup & Skincare Collection
            </p>

            {/* Button */}
            <button
              onClick={() => router.push("/products")}
              className="px-10 py-4 text-lg font-semibold bg-black text-white border-2 border-black rounded-lg transition-all duration-300 hover:bg-white hover:text-black"
            >
              Shop Now
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
