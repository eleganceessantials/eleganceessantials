"use client";

import { useState } from "react";
import type { Product } from "../data/productListing";

/* Tab type */
type Tab = {
  id: number;
  title: string;
  products: Product[];
};

/* Products data — iPhones 8 products, Samsung 8 products */
const smartphoneTabs: Tab[] = [
  {
    id: 1,
    title: "iPhone",
    products: [
      { id: 1, name: "iPhone 15 Pro", slug: "iphone-15-pro", price: 999, category: "smartphone", image: "/Apple-iPhone-15-Pro_uaedubai-ae_1.jpg", description: "iPhone 15 Pro with A17 chip, titanium body, advanced camera." },
      { id: 2, name: "iPhone 15", slug: "iphone-15", price: 899, category: "smartphone", image: "/apple-iphone-15-1.jpg", description: "iPhone 15 with A16 chip, sleek design." },
      { id: 3, name: "iPhone 15 Mini", slug: "iphone-15-mini", price: 799, category: "smartphone", image: "/Apple-IPhone-15-Official-Image.webp", description: "iPhone 15 Mini, compact and powerful." },
      { id: 4, name: "iPhone 14 Pro", slug: "iphone-14-pro", price: 899, category: "smartphone", image: "/Apple-iPhone-14-Pro-Max-Deep-Purple-1.jpg", description: "iPhone 14 Pro with advanced camera." },
      { id: 5, name: "iPhone 14", slug: "iphone-14", price: 799, category: "smartphone", image: "/iphone-14-finish-select-202209-6-7inch-purple_6f401d19-b5c1-4e88-8f24-2e014e2bdb02.webp", description: "iPhone 14 with improved battery." },
      { id: 6, name: "iPhone 14 Mini", slug: "iphone-14-mini", price: 699, category: "smartphone", image: "/apple-iPhone-14-1-438x593.webp", description: "iPhone 14 Mini, small but mighty." },
      { id: 7, name: "iPhone 13 Pro", slug: "iphone-13-pro", price: 749, category: "smartphone", image: "/images (4).jpg", description: "iPhone 13 Pro with great camera." },
      { id: 8, name: "iPhone 13", slug: "iphone-13", price: 699, category: "smartphone", image: "/igojkghiosejgnijoshgbjsnoigbsjg.jpg", description: "iPhone 13, reliable and powerful." },
    ],
  },
  {
    id: 2,
    title: "Samsung",
    products: [
      { id: 9, name: "Samsung S24 Ultra", slug: "samsung-s24-ultra", price: 899, category: "smartphone", image: "/Samsung-Galaxy-S24-Ultra-Titanium-Gray-1-1000x1024.jpg", description: "Samsung Galaxy S24 Ultra with Snapdragon processor." },
      { id: 10, name: "Samsung S24", slug: "samsung-s24", price: 799, category: "smartphone", image: "/galaxy-s24-highlights-kv.jpg", description: "Samsung S24 with high-performance display." },
      { id: 11, name: "Samsung S23 Ultra", slug: "samsung-s23-ultra", price: 849, category: "smartphone", image: "/product_color_phantom_black.avif", description: "Samsung S23 Ultra with pro camera." },
      { id: 12, name: "Samsung S23", slug: "samsung-s23", price: 749, category: "smartphone", image: "/Samsung-Galaxy-S23.webp", description: "Samsung S23 with sleek design." },
      { id: 13, name: "Samsung S22 Ultra", slug: "samsung-s22-ultra", price: 799, category: "smartphone", image: "/s22_ultra_1_.webp", description: "Samsung S22 Ultra with advanced camera." },
      { id: 14, name: "Samsung S22", slug: "samsung-s22", price: 699, category: "smartphone", image: "/S22_ColorSelection_Pinkgold_MO.webp", description: "Samsung S22 with solid performance." },
      { id: 15, name: "Samsung S21 Ultra", slug: "samsung-s21-ultra", price: 749, category: "smartphone", image: "/Samsung-Galaxy-S21-Ultra-5G-Price-1.png", description: "Samsung S21 Ultra, reliable and powerful." },
      { id: 16, name: "Samsung S21", slug: "samsung-s21", price: 649, category: "smartphone", image: "/samsung-galaxy-s21-plus-Price-1-200x300.png", description: "Samsung S21, compact and fast." },
    ],
  },
];

export default function Smartphones() {
  const [activeTab, setActiveTab] = useState<number>(smartphoneTabs[0].id);

  const currentProducts =
    smartphoneTabs.find((tab) => tab.id === activeTab)?.products ?? [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-wide drop-shadow-md">
          Shop Smartphones
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Browse the latest iPhone and Samsung models. Click tabs to explore each series.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {smartphoneTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition"
            >
              {/* Image container with fixed size and hover */}
              <div className="w-full h-52 md:h-56 overflow-hidden rounded-2xl bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
              </div>

              {/* Product info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <p className="text-gray-900 font-bold mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





















