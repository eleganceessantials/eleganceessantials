"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

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
        <div className="mt-5 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            {product.discountPrice ? (
              <>
                <span className="font-bold text-lg text-pink-600">Rs. {product.discountPrice}</span>
                <span className="text-gray-400 line-through text-sm">Rs. {product.price}</span>
              </>
            ) : (
              <span className="font-bold text-lg text-black">Rs. {product.price}</span>
            )}
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">Free Delivery</span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({
                  id: (product._id || product.id) as string,
                  name: product.name,
                  price: product.discountPrice || product.price,
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
      </div>
    </Link>
  );
}
