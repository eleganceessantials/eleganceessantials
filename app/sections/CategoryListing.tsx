"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/productcard";
import { products } from "@/app/data/productListing";

function toTitleCase(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryListing() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedFromUrlRaw = (searchParams.get("cat") || "all").trim();

  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => String(p.category))));
    return ["all", ...unique];
  }, []);

  const selectedCategory = useMemo(() => {
    const found = categoryOptions.find(
      (c) => c.toLowerCase() === selectedFromUrlRaw.toLowerCase()
    );
    return found || "all";
  }, [categoryOptions, selectedFromUrlRaw]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (p) => String(p.category).toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  const setCategoryInUrl = (cat: string) => {
    if (cat === "all") {
      router.push("/category?cat=all");
      return;
    }
    router.push(`/category?cat=${encodeURIComponent(cat)}`);
  };

  return (
    <section className="min-h-screen bg-[#FCF8F8] pt-20 px-6">
      {/* Category Filters */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-6">
        {categoryOptions.map((cat) => {
          const isActive =
            cat.toLowerCase() === String(selectedCategory).toLowerCase();

          return (
            <button
              key={cat}
              onClick={() => setCategoryInUrl(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-[#fdeded] text-black border border-pink-300 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-pink-50"
              }`}
            >
              {cat === "all" ? "All" : toTitleCase(cat)}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
