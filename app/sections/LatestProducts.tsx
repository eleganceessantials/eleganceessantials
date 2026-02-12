"use client";

import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/productcard";
import { products } from "@/app/data/productListing";

export default function LatestProducts() {
  const router = useRouter();

  // Latest products = last 4 added in array
  const latestProducts = [...products].slice(-4).reverse();

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
              Latest Products
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Newly added items in our store
            </p>
          </div>

          {/* Show More Button */}
          <button
            onClick={() => router.push("/category")}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                       border border-black/15 bg-white text-black font-semibold 
                       shadow-sm transition
                       hover:bg-black hover:text-white hover:shadow-md 
                       active:scale-[0.98]"
          >
            Show More →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Show More (centered below grid) */}
        <div className="mt-8 flex justify-center sm:hidden">
          <button
            onClick={() => router.push("/category")}
            className="px-6 py-3 rounded-xl bg-black text-white font-semibold 
                       shadow-md transition
                       hover:bg-gray-900 hover:shadow-lg active:scale-[0.98]"
          >
            Show More Products
          </button>
        </div>

      </div>
    </section>
  );
}
