"use client";

import { useState } from "react";
import ProductCard from "@/app/components/productcard";
import { products, type Category } from "@/app/data/productListing";

const categories: (Category | "all")[] = [
  "all",
  "SkinCare",
  "Makeup",
  "HairCare",
  "Fragrance",
];

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="min-h-screen bg-gray-50 pt-20 px-6">
      {/* Category Filters */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-black-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found in this category.</p>
        )}
      </div>
    </section>
  );
}
