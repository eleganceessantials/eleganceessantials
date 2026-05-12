"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// ✅ REQUIRED: without these, slides stack vertically
import "swiper/css";
import "swiper/css/pagination";

type Review = {
  name: string;
  badge?: string;
  rating: number;
  title: string;
  text: string;
  date: string;
};

const allReviews: Review[] = [
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
  {
    name: "Zara N.",
    badge: "Verified Buyer",
    rating: 5,
    title: "Really premium feel",
    text: "The product feels original and the results are visible. Skin feels soft, fresh, and more balanced.",
    date: "3 days ago",
  },
  {
    name: "Minaal T.",
    badge: "Verified Buyer",
    rating: 4,
    title: "Worth buying",
    text: "Good experience overall. It fits nicely into my night skincare routine and feels gentle on skin.",
    date: "4 weeks ago",
  },
  {
    name: "Rabia S.",
    badge: "Verified Buyer",
    rating: 5,
    title: "Loved the packaging",
    text: "Received it safely packed. Product quality feels great and delivery was faster than expected.",
    date: "1 week ago",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

function StarRow({ rating }: { rating: number }) {
  const safe = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${safe} out of 5 stars`}
    >
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
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(shuffleArray(allReviews));
  }, []);

  return (
    <section className="mt-14">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
            Customer Reviews
          </h2>
        </div>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Real feedback from buyers — texture, results, delivery and overall
          experience.
        </p>
      </div>

      <div className="relative">
        <style jsx global>{`
          .bb-reviews {
            width: 100%;
            padding-bottom: 6px;
          }

          .bb-reviews .swiper-wrapper {
            align-items: stretch;
          }

          .bb-reviews .swiper-slide {
            height: auto;
            display: flex;
          }

          .bb-reviews .swiper-slide > div {
            width: 100%;
          }

          .bb-reviews .swiper-pagination {
            position: static;
            margin-top: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .bb-reviews .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            opacity: 1;
            background: #f2b7cc;
            transition: all 200ms ease;
          }

          .bb-reviews .swiper-pagination-bullet-active {
            width: 30px;
            border-radius: 999px;
            background: #db005b;
          }
        `}</style>

        {reviews.length > 0 && (
          <Swiper
            className="bb-reviews"
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={`${review.name}-${index}`}>
                <div className="h-full rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-extrabold text-black">
                        {review.name}
                      </div>

                      {review.badge && (
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#DB005B]" />
                            {review.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 text-xs text-gray-400">
                      {review.date}
                    </div>
                  </div>

                  <div className="mt-3">
                    <StarRow rating={review.rating} />
                  </div>

                  <div className="mt-4 font-bold text-[#DB005B]">
                    {review.title}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {review.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}