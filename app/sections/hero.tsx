"use client";

import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";

const slides = [
  {
    id: 1,
    image: "/apple-macbook-pro-13-inch-retina-display-2015_6ebc.jpg",
    tag: "🔥 New Arrival",
    title: "MacBook Pro",
    subtitle: "Smart devices for your daily life",
    off: "30% OFF",
    link: "/product/macbook-pro-m3",
  },
  {
    id: 2,
    image: "/Apple-iPhone-15-release-date-price-and-features.jpg",
    tag: "⚡ Limited Offer",
    title: "Iphone 15 PTA Approved",
    subtitle: "Best deals on trending products",
    off: "50% OFF",
    link: "/product/iphone-15",
  },
  {
    id: 3,
    image: "/iPhone-17-Plus-Feature.jpg",
    tag: "⭐ Exclusive",
    title: "Iphone 17 Plus Non PTA",
    subtitle: "Quality you can trust",
    off: "40% OFF",
    link: "/product/iphone-17-plus",
  },
];

const Hero = () => {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  const imageTransform = useMemo(() => {
    return `scale(1.01) translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`;
  }, [mousePos.x, mousePos.y]);

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[90vh] min-h-[480px] overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: imageTransform }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

              {/* Content Container */}
              <div className="relative h-full flex items-center">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
                  <div className="max-w-xl text-white">
                    <span className="inline-block mb-4 px-4 py-1.5 text-sm bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      {slide.tag}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                      {slide.title}
                    </h1>

                    <p className="text-lg opacity-90 mb-6">
                      {slide.subtitle}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold text-red-400">
                        {slide.off}
                      </span>
                      <span className="text-sm line-through opacity-70">
                        Limited Time
                      </span>
                    </div>

                    <button
                      onClick={() => router.push(slide.link)}
                      className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
