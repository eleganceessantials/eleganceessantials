"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { products } from "@/app/data/productListing";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();

  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const safeQty = useMemo(() => {
    const n = Number.isFinite(qty) ? qty : 1;
    return Math.max(1, Math.min(99, n));
  }, [qty]);

  const handleMinus = () => setQty((q) => Math.max(1, (Number.isFinite(q) ? q : 1) - 1));
  const handlePlus = () => setQty((q) => Math.min(99, (Number.isFinite(q) ? q : 1) + 1));

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-black">
        Product not found
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* vertical center + nice top spacing */}
        <div className="min-h-[calc(100vh-80px)] pt-24 pb-14 flex items-center">
          <div className="w-full flex flex-col md:flex-row gap-10 md:gap-12">
            {/* LEFT: Image */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-[340px] sm:h-[420px] md:h-[520px] rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm group transition hover:shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                />
                {/* subtle premium gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                {/* category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur">
                    {String(product.category).toUpperCase()}
                  </span>
                </div>

                {/* hover hint */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">
                  <span className="rounded-full bg-white/90 border border-black/10 px-3 py-1 text-xs text-gray-700 backdrop-blur">
                    Hover to zoom
                  </span>
                </div>
              </div>

              {/* trust chips */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="rounded-full bg-white border border-black/10 px-3 py-1 hover:border-black/20 transition">
                  ✅ Verified product
                </span>
                <span className="rounded-full bg-white border border-black/10 px-3 py-1 hover:border-black/20 transition">
                  🚚 Fast delivery
                </span>
                <span className="rounded-full bg-white border border-black/10 px-3 py-1 hover:border-black/20 transition">
                  🔁 Easy returns
                </span>
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="md:w-1/2 text-black">
              <div className="rounded-2xl bg-white border border-black/10 shadow-sm p-6 sm:p-8 transition hover:shadow-lg">
                {/* top row: title + back */}
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {product.name}
                  </h1>

                  <button
                    onClick={() => router.back()}
                    className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition
                               hover:bg-black hover:text-white hover:shadow-md active:scale-[0.98]"
                  >
                    ← Go Back
                  </button>
                </div>

                {/* price */}
                <div className="mt-4 flex items-end gap-2">
                  <p className="text-2xl sm:text-3xl font-extrabold">${product.price}</p>
                  <span className="text-xs text-gray-500 pb-1">incl. taxes*</span>
                </div>

                <div className="mt-5 h-px w-full bg-black/10" />

                {/* description */}
                <p className="mt-5 text-gray-800 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>

                {/* Quantity selector */}
                <div className="mt-7">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Quantity
                  </div>

                  <div className="inline-flex items-center rounded-xl border border-black/15 bg-gray-50 p-1">
                    <button
                      onClick={handleMinus}
                      className="h-10 w-10 rounded-lg bg-white border border-black/10 text-black font-bold transition
                                 hover:bg-black hover:text-white hover:shadow active:scale-[0.98]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <input
                      value={safeQty}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (Number.isNaN(val)) setQty(1);
                        else setQty(Math.max(1, Math.min(99, val)));
                      }}
                      className="w-16 h-10 mx-2 text-center rounded-lg border border-black/10 bg-white font-semibold outline-none focus:ring-2 focus:ring-black/20"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      aria-label="Quantity"
                    />

                    <button
                      onClick={handlePlus}
                      className="h-10 w-10 rounded-lg bg-white border border-black/10 text-black font-bold transition
                                 hover:bg-black hover:text-white hover:shadow active:scale-[0.98]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: safeQty,
                      });
                      setAdded(true);
                      setTimeout(() => setAdded(false), 1200);
                    }}
                    className="group bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-md transition
                               hover:bg-gray-900 hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      {added ? "Added ✅" : `Add to Cart`}
                      <span className="opacity-80 text-sm group-hover:opacity-100 transition">
                        ({safeQty})
                      </span>
                    </span>
                  </button>

                  {/* <button
                    onClick={() => router.push("/cart")}
                    className="bg-white text-black border border-black/15 px-6 py-3 rounded-xl font-semibold shadow-sm transition
                               hover:bg-black hover:text-white hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]"
                  >
                    View Cart
                  </button> */}
                </div>

                {/* little info row */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-black/10 bg-gray-50 p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Delivery</div>
                    <div className="mt-1 font-semibold">2–4 Days</div>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-gray-50 p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Warranty</div>
                    <div className="mt-1 font-semibold">7 Days Check</div>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-gray-50 p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Support</div>
                    <div className="mt-1 font-semibold">Chat / Call</div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  *Pricing & availability may change. Images are for illustration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
