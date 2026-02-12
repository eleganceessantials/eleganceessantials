"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/productListing";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition relative">
      <Link href={`/product/${product.slug}`}>
        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4 cursor-pointer">
          <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
        </div>
      </Link>

      <h3 className="font-semibold text-black">{product.name}</h3>
      <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-black">${product.price}</span>
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            })
          }
          className="bg-black-400 text-black px-3 py-1 rounded-lg text-sm hover:bg-black-300 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
