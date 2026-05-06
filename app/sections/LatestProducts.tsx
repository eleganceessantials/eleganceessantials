"use client";

import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/productcard";
import { useEffect, useState } from "react";
import { ProductSkeleton } from "@/app/components/Skeleton";

export default function LatestProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/products?page=1&limit=4", {
          cache: "no-store",
        });

        if (!res.ok) {
          setProducts([]);
          return;
        }

        const data = await res.json();

        const safeProducts = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : [];

        setProducts(safeProducts);
      } catch (err) {
        console.error("Failed to fetch latest products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <section className="py-14 bg-[#FCF8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />

            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
              Latest Products
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto">
            Fresh arrivals curated for you new launches, trending picks, and
            must-have essentials.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 font-medium">
              No latest products found.
            </p>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => router.push("/category?cat=all")}
            className="px-10 py-3.5 rounded-full 
                       border border-[#DB005B] bg-[#DB005B] text-white font-semibold 
                       shadow-sm transition cursor-pointer
                       hover:bg-white hover:text-[#DB005B]
                       active:scale-[0.98]"
          >
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
}