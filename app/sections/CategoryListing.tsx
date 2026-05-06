"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/productcard";
import { ProductSkeleton } from "@/app/components/Skeleton";
import ContactSection from "@/app/components/ContactSection";

const PRODUCT_LIMIT = 12;

export default function CategoryListing() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const selectedFromUrlRaw = (searchParams.get("cat") || "all").trim();
  const selectedCategoryValue = selectedFromUrlRaw.toLowerCase();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts({
      pageNumber: 1,
      append: false,
      search: debouncedSearchQuery,
      cat: selectedCategoryValue,
    });
  }, [selectedCategoryValue, debouncedSearchQuery]);

  useEffect(() => {
    if (!loaderRef.current) return;
    if (!hasMore) return;
    if (loading) return;
    if (loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasMore && !loadingMore && !loading) {
          fetchProducts({
            pageNumber: page + 1,
            append: true,
            search: debouncedSearchQuery,
            cat: selectedCategoryValue,
          });
        }
      },
      {
        root: null,
        rootMargin: "350px",
        threshold: 0,
      }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [
    page,
    hasMore,
    loading,
    loadingMore,
    debouncedSearchQuery,
    selectedCategoryValue,
  ]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        cache: "no-store",
      });

      if (!res.ok) {
        setCategories([]);
        return;
      }

      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  };

  const fetchProducts = async ({
    pageNumber,
    append,
    search,
    cat,
  }: {
    pageNumber: number;
    append: boolean;
    search: string;
    cat: string;
  }) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setProducts([]);
        setPage(1);
        setHasMore(false);
        setTotalProducts(0);
      }

      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: String(PRODUCT_LIMIT),
        cat: cat || "all",
      });

      if (search) {
        params.set("search", search);
      }

      const res = await fetch(`/api/products?${params.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        if (!append) {
          setProducts([]);
          setTotalProducts(0);
          setHasMore(false);
        }

        return;
      }

      const data = await res.json();

      const newProducts = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : [];

      setProducts((prev) => {
        if (!append) return newProducts;

        const existingIds = new Set(prev.map((product) => product.id));
        const uniqueNewProducts = newProducts.filter(
          (product: any) => !existingIds.has(product.id)
        );

        return [...prev, ...uniqueNewProducts];
      });

      setTotalProducts(
        typeof data.total === "number" ? data.total : newProducts.length
      );

      setHasMore(Boolean(data.hasMore));
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to fetch products:", error);

      if (!append) {
        setProducts([]);
        setTotalProducts(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleCategoryClick = (value: string) => {
    router.push(`/category?cat=${value}`);
  };

  return (
    <section className="bg-[#FCF8F8] py-20 px-6">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <span className="text-xl grayscale group-focus-within:grayscale-0 transition-all">
              🔍
            </span>
          </div>

          <input
            type="text"
            placeholder="Search for products, categories, or routines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-12 py-5 bg-white border border-pink-100 rounded-[2rem] outline-none shadow-sm focus:shadow-xl focus:border-[#DB005B] transition-all text-gray-900 font-medium placeholder-gray-400"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-50 text-gray-400 hover:text-[#DB005B] hover:bg-pink-100 transition-all font-black cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <div className="text-center mt-4">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {loading
              ? "Loading products..."
              : `${products.length} of ${totalProducts} products loaded`}
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => handleCategoryClick("all")}
          className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
            selectedCategoryValue === "all"
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
              key={cat._id || cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                isActive
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
          [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}

        {loadingMore &&
          [...Array(4)].map((_, i) => (
            <ProductSkeleton key={`loading-more-${i}`} />
          ))}
      </div>

      <div ref={loaderRef} className="h-10 w-full" />

      {!loading && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() =>
              fetchProducts({
                pageNumber: page + 1,
                append: true,
                search: debouncedSearchQuery,
                cat: selectedCategoryValue,
              })
            }
            disabled={loadingMore}
            className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-[#DB005B] transition-all disabled:opacity-60 cursor-pointer"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!loading && !hasMore && products.length > 0 && (
        <p className="text-center text-xs text-gray-400 font-bold mt-8">
          You have reached the end.
        </p>
      )}

      <ContactSection />
    </section>
  );
}