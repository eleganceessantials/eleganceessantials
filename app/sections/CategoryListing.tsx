"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/productcard";
import { ProductSkeleton } from "@/app/components/Skeleton";
import ContactSection from "@/app/components/ContactSection";

function toTitleCase(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(res => res.json()),
      fetch("/api/categories").then(res => res.json())
    ])
      .then(([productsData, categoriesData]) => {
        if (Array.isArray(productsData)) setProducts(productsData);
        if (Array.isArray(categoriesData)) setCategories(categoriesData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const selectedFromUrlRaw = (searchParams.get("cat") || "all").trim();
  const selectedCategoryValue = selectedFromUrlRaw.toLowerCase();

  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Filter by Category
    if (selectedCategoryValue !== "all") {
      const categoryObj = categories.find(c => c.value === selectedCategoryValue);
      const categoryName = categoryObj ? categoryObj.name : selectedCategoryValue;
      result = result.filter(
        (p) => String(p.category).toLowerCase() === categoryName.toLowerCase()
      );
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          String(p.category).toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategoryValue, products, categories, searchQuery]);

  return (
    <section className="bg-[#FCF8F8] py-20 px-6">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <span className="text-xl grayscale group-focus-within:grayscale-0 transition-all">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Search for products, categories, or routines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white border border-pink-100 rounded-[2rem] outline-none shadow-sm focus:shadow-xl focus:border-[#DB005B] transition-all text-gray-900 font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => router.push("/category?cat=all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategoryValue === "all"
              ? "bg-[#fdeded] text-black border border-pink-300 shadow-sm"
              : "bg-white text-gray-700 hover:bg-pink-50"
            }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const isActive = cat.value === selectedCategoryValue;

          return (
            <button
              key={cat._id}
              onClick={() => router.push(`/category?cat=${cat.value}`)}
              className={`px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? "bg-[#fdeded] text-black border border-pink-300 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-pink-50"
                }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>

      <ContactSection />
    </section>
  );
}
