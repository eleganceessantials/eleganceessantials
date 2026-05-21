"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

interface Category {
  _id: string;
  name: string;
  image?: string | null;
  value: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/categories", {
          method: "GET",
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch categories");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid categories response");
        }

        if (isMounted) {
          setCategories(data);
        }
      } catch (err) {
        if (isMounted) {
          setCategories([]);
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="bg-[#FCF8F8] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mx-auto h-10 w-64 animate-pulse rounded-xl bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#FCF8F8] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
              <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                Shop by Categories
              </h2>
            </div>

            <p className="mt-4 text-sm text-red-600 sm:text-base">
              Failed to load categories. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="bg-[#FCF8F8] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
              Shop by Categories
            </h2>
          </div>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore our beauty essentials by category — curated collections
            designed for every routine.
          </p>
        </div>

        <div className="category-slider-wrap relative mb-12 sm:mb-16">
          <button
            type="button"
            className="category-prev absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f5c7da] bg-white text-[#DB005B] shadow-[0_12px_35px_rgba(219,0,91,0.16)] transition hover:bg-[#DB005B] hover:text-white lg:flex"
            aria-label="Previous category"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="category-next absolute right-0 top-1/2 z-20 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f5c7da] bg-white text-[#DB005B] shadow-[0_12px_35px_rgba(219,0,91,0.16)] transition hover:bg-[#DB005B] hover:text-white lg:flex"
            aria-label="Next category"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".category-prev",
              nextEl: ".category-next",
            }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 2.3,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="category-swiper"
          >
            {categories.map((category) => {
              const imageSrc =
                typeof category.image === "string" &&
                category.image.trim().length > 0
                  ? category.image.trim()
                  : null;

              return (
                <SwiperSlide key={category._id}>
                  <Link
                    href={`/category?cat=${category.value}`}
                    className="group block cursor-pointer overflow-hidden rounded-2xl border border-transparent bg-white shadow-sm transition-all duration-300 hover:border-pink-100 hover:shadow-xl"
                  >
                    <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff2f7] to-[#f7ddea]">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={category.name || "Category"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                            ✨
                          </div>
                          <span className="text-sm font-semibold text-[#DB005B]">
                            {category.name || "Category"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-4 sm:p-5">
                      <p className="line-clamp-1 font-semibold text-black">
                        {category.name}
                      </p>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1f7] text-[#DB005B] transition group-hover:bg-[#DB005B] group-hover:text-white">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12H19" />
                          <path d="M13 6L19 12L13 18" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="text-center">
          <Link
            href="/category?cat=all"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DB005B] bg-[#DB005B] px-10 py-3.5 font-semibold text-white transition hover:bg-white hover:text-[#DB005B] sm:px-12"
          >
            Shop Now
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12H19" />
              <path d="M13 6L19 12L13 18" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .category-slider-wrap .swiper {
          padding: 4px 2px 16px;
        }

        .category-slider-wrap .swiper-slide {
          height: auto;
        }

        .category-prev.swiper-button-disabled,
        .category-next.swiper-button-disabled {
          opacity: 0.35;
          pointer-events: none;
        }

        @media (max-width: 767px) {
          .category-slider-wrap .swiper {
            overflow: visible;
          }
        }
      `}</style>
    </section>
  );
}