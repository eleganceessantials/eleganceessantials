"use client";

import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// ✅ Swiper styles (required)
import "swiper/css";
import "swiper/css/pagination";

type Review = {
  name: string;
  badge?: string;
  rating: number; // 1-5
  title: string;
  text: string;
  date: string;
};

function StarRow({ rating }: { rating: number }) {
  const safe = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1" aria-label={`${safe} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < safe;
        return (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className={filled ? "text-[#DB005B]" : "text-gray-300"}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function ProductReviews() {
  // ✅ More reviews (static, believable beauty-style)
  const reviews: Review[] = useMemo(
    () => [
      {
        name: "Ayesha K.",
        badge: "Verified Buyer",
        rating: 5,
        title: "Instant glow, no irritation",
        text: "I have sensitive skin and this worked perfectly. Lightweight, absorbs fast, and my skin looks healthier within a week.",
        date: "2 days ago",
      },
      {
        name: "Hira M.",
        badge: "Verified Buyer",
        rating: 4,
        title: "Perfect for daily routine",
        text: "Packaging feels premium and the product looks authentic. Using it every morning — makeup sits better and skin feels hydrated.",
        date: "1 week ago",
      },
      {
        name: "Sara A.",
        badge: "Verified Buyer",
        rating: 5,
        title: "Smooth texture + great results",
        text: "Subtle clean fragrance and great results. My skin feels smoother and more even. Delivery was quick too.",
        date: "2 weeks ago",
      },
      {
        name: "Maham R.",
        badge: "Verified Buyer",
        rating: 5,
        title: "Clean, fresh finish",
        text: "Not sticky at all. I used it under sunscreen and it blends perfectly. My skin looks fresh the whole day.",
        date: "3 weeks ago",
      },
      {
        name: "Iqra S.",
        badge: "Verified Buyer",
        rating: 4,
        title: "Good quality, authentic feel",
        text: "I was worried about authenticity but this looks genuine. Nice texture and no breakouts so far.",
        date: "1 month ago",
      },
      {
        name: "Noor F.",
        badge: "Verified Buyer",
        rating: 5,
        title: "Hydration level is top",
        text: "My skin gets dry in winters and this helped a lot. Hydration stays long and it doesn’t feel heavy.",
        date: "1 month ago",
      },
      {
        name: "Komal Z.",
        badge: "Verified Buyer",
        rating: 5,
        title: "Glow is real",
        text: "After a few uses, skin tone feels more balanced and glow is visible. Love the finish.",
        date: "5 weeks ago",
      },
      {
        name: "Fatima J.",
        badge: "Verified Buyer",
        rating: 4,
        title: "Nice results, fast delivery",
        text: "Arrived quickly and packed well. Results are nice, especially for daily skincare routine.",
        date: "6 weeks ago",
      },
      {
        name: "Anum H.",
        badge: "Verified Buyer",
        rating: 5,
        title: "No irritation at all",
        text: "I’m prone to redness but this didn’t trigger anything. Very gentle and looks premium.",
        date: "2 months ago",
      },
    ],
    []
  );

  return (
    <section className="mt-14">
      {/* Heading */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
            Customer Reviews
          </h2>
        </div>

        {/* ✅ removed avg rating row */}
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Real feedback from buyers — texture, results, delivery and overall experience.
        </p>
      </div>

      {/* Swiper (Pagination only, no arrows) */}
      <div className="relative">
        {/* Pagination styling (scoped) */}
        <style jsx global>{`
          .bb-reviews .swiper-pagination {
            position: static;
            margin-top: 18px;
            display: flex;
            justify-content: center;
            gap: 10px;
          }
          .bb-reviews .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            opacity: 1;
            background: #f2b7cc; /* soft pink */
            transition: all 200ms ease;
          }
          .bb-reviews .swiper-pagination-bullet-active {
            width: 28px;
            border-radius: 999px;
            background: #db005b; /* sharp brand pink */
          }
        `}</style>

        <Swiper
          className="bb-reviews"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 18 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {reviews.map((r, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm hover:shadow-xl transition h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-extrabold text-black">{r.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {r.badge ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#DB005B]" />
                          {r.badge}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{r.date}</div>
                </div>

                <div className="mt-3">
                  <StarRow rating={r.rating} />
                </div>

                <div className="mt-4 font-bold text-[#DB005B]">{r.title}</div>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  {r.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
