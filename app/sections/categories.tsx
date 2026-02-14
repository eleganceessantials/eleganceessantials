"use client";

import Link from "next/link";

interface Category {
  id: number;
  name: string;
  image: string;
  value: "skincare" | "makeup" | "haircare" | "fragrance";
}

// Sirf 4 beauty categories
const categories: Category[] = [
  { id: 1, name: "Skincare", image: "/aesthetic-skincare-product-display-winter-decoration-minimalist-style-403345045.webp", value: "skincare" },
  { id: 2, name: "Makeup", image: "/high-angle-view-makeup-products-black-surface_23-2147899437.avif", value: "makeup" },
  { id: 3, name: "Haircare", image: "/abb43164f876262d520af647338f054d.jpg", value: "haircare" },
  { id: 4, name: "Fragrance", image: "/BEFORE-24_1633974089.png", value: "fragrance" },
];

export default function Categories() {
  return (
    <section className="py-20 bg-pink-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl text-gray-800 font-extrabold text-center mb-14">
          Shop by Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category?cat=${category.value}`}
              className="group bg-white rounded-2xl p-4 shadow flex flex-col items-center justify-center transition hover:shadow-xl"
            >
              {/* Image wrapper fills full tab */}
              <div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-4 font-semibold text-gray-800 text-center">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Shop Now Button */}
        <div className="text-center">
          <Link
            href="/category?cat=all"
            className="inline-block px-12 py-4 rounded-full bg-black text-white font-semibold border border-black transition hover:bg-white hover:text-black"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
