"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/productListing";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative border border-transparent hover:border-pink-100 hover:-translate-y-1">
        {/* Image */}
        <div className="w-full h-56 relative rounded-xl overflow-hidden mb-4 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-black text-base leading-tight mb-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Price + Button */}
        <div className="mt-5 flex justify-between items-center">
          <span className="font-bold text-lg text-black">${product.price}</span>

          <button
            onClick={(e) => {
              e.preventDefault(); // stop Link navigation
              e.stopPropagation(); // stop bubbling
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              });
            }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-[#fdeded] text-black border border-pink-200 hover:bg-pink-200 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
