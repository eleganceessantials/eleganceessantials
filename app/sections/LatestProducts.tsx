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
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else console.error("API returned non-array data:", data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Latest products = last 4 added in array
  const latestProducts = [...products].slice(-4).reverse();

  return (
    <section className="py-14 bg-[#FCF8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header (Centered) */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
              Latest Products
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto">
            Fresh arrivals curated for you new launches, trending picks, and must-have essentials.
          </p>
        </div>

        {/* Products Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">

          {loading ? (
            [...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA Button Under Cards */}
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
