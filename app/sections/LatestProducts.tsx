"use client";

import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/productcard";
import { products } from "@/app/data/productListing";

export default function LatestProducts() {
  const router = useRouter();

  // Latest products = last 4 added in array
  const latestProducts = [...products].slice(-4).reverse();

  return (
    <section className="py-12 bg-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
              Latest Products
            </h2>
            <p className="text-sm text-gray-700 mt-1">
              Newly added items in our store
            </p>
          </div>

          {/* Desktop Show More Button */}
          <button
            onClick={() => router.push("/category")}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                       border border-black bg-black text-white font-semibold 
                       shadow-sm transition
                       hover:bg-white hover:text-black hover:border-black 
                       active:scale-[0.98]"
          >
            Show More →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl p-4 shadow flex flex-col items-center justify-center transition hover:shadow-xl"
            >
              {/* Image wrapper fills full tab */}
              <div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-4 font-semibold text-gray-800 text-center">
                {product.name}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Show More (centered below grid) */}
        <div className="mt-8 flex justify-center sm:hidden">
          <button
            onClick={() => router.push("/category")}
            className="px-6 py-3 rounded-xl border border-black bg-black text-white font-semibold 
                       shadow-md transition
                       hover:bg-white hover:text-black hover:border-black 
                       active:scale-[0.98]"
          >
            Show More Products
          </button>
        </div>
      </div>
    </section>
  );
}
