"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Category {
  _id: string;
  name: string;
  image: string;
  value: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-[#FCF8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
             <div className="h-10 w-64 bg-gray-200 animate-pulse mx-auto rounded-xl" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;
  return (
    <section className="py-16 sm:py-20 bg-[#FCF8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
            <h2 className="text-3xl sm:text-4xl text-black font-extrabold">
              Shop by Categories
            </h2>
          </div>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore our beauty essentials by category — curated collections designed for every routine.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category._id}
                href={`/category?cat=${category.value}`}
              className="group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="w-full aspect-square overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text */}
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <p className="font-semibold text-black">{category.name}</p>
                <span className="text-[#DB005B] font-bold transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/category?cat=all"
            className="inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-3.5 rounded-full 
                       bg-[#DB005B] text-white font-semibold border border-[#DB005B]
                       hover:bg-white hover:text-[#DB005B] transition cursor-pointer"
          >
            Shop Now <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
