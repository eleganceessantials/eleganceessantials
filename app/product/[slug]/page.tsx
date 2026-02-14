"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/app/data/productListing";
import { useCart } from "@/app/context/CartContext";
import ProductCard from "@/app/components/productcard";
import ProductReviews from "@/app/sections/ProductReviews";

function formatLabel(value: string) {
  if (!value) return "";
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();

  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState(false);

  // ✅ FAQs inactive by default
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const safeQty = useMemo(() => {
    const n = Number.isFinite(qty) ? qty : 1;
    return Math.max(1, Math.min(99, n));
  }, [qty]);

  const handleMinus = () =>
    setQty((q) => Math.max(1, (Number.isFinite(q) ? q : 1) - 1));
  const handlePlus = () =>
    setQty((q) => Math.min(99, (Number.isFinite(q) ? q : 1) + 1));

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-black">
        Product not found
      </div>
    );

  const relatedProducts = useMemo(() => {
    const cat = String(product.category).toLowerCase();
    return products
      .filter(
        (p) => p.slug !== product.slug && String(p.category).toLowerCase() === cat
      )
      .slice(0, 4);
  }, [product.slug, product.category]);

  const faqs = [
    {
      q: "Is this product authentic?",
      a: "Yes — we source from verified distributors and only sell authentic products. If you have any issue, we offer easy returns.",
    },
    {
      q: "How long does delivery take?",
      a: "Typically 2–4 working days (depending on your city). You’ll get tracking once your order is dispatched.",
    },
    {
      q: "What is the return & refund policy?",
      a: "Easy returns within a short window if the item is unused and in original packaging. Refunds are processed quickly after verification.",
    },
    {
      q: "Is checkout secure?",
      a: "Yes — your checkout is secure. We don’t store sensitive payment details, and your order is protected.",
    },
  ];

  return (
    <section className="min-h-screen bg-[#FCF8F8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-24 pb-10">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-[#DB005B] transition">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/category?cat=all"
              className="hover:text-[#DB005B] transition"
            >
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/category?cat=${encodeURIComponent(String(product.category))}`}
              className="hover:text-[#DB005B] transition"
            >
              {formatLabel(String(product.category))}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#DB005B] truncate">
              {product.name}
            </span>
          </div>

          {/* TRUST STRIP (top) */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white border border-pink-100 p-4 text-center">
              <div className="text-sm font-extrabold text-[#DB005B]">Authentic</div>
              <div className="text-xs text-gray-600 mt-1">Verified products only</div>
            </div>
            <div className="rounded-2xl bg-white border border-pink-100 p-4 text-center">
              <div className="text-sm font-extrabold text-[#DB005B]">Fast Delivery</div>
              <div className="text-xs text-gray-600 mt-1">2–4 working days</div>
            </div>
            <div className="rounded-2xl bg-white border border-pink-100 p-4 text-center">
              <div className="text-sm font-extrabold text-[#DB005B]">Easy Returns</div>
              <div className="text-xs text-gray-600 mt-1">Hassle-free support</div>
            </div>
          </div>

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

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                {/* category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full border border-pink-200 bg-white/90 px-3 py-1 text-xs font-semibold text-[#DB005B] backdrop-blur">
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

              {/* Trust chips */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-700">
                <span className="rounded-full bg-white border border-pink-100 px-3 py-1 hover:border-pink-200 transition">
                  ✅ Verified product
                </span>
                <span className="rounded-full bg-white border border-pink-100 px-3 py-1 hover:border-pink-200 transition">
                  🚚 Fast delivery
                </span>
                <span className="rounded-full bg-white border border-pink-100 px-3 py-1 hover:border-pink-200 transition">
                  🔒 Secure checkout
                </span>
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="md:w-1/2 text-black">
              <div className="rounded-2xl bg-white border border-black/10 shadow-sm p-6 sm:p-8 transition hover:shadow-lg">
                {/* Title + back */}
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
                    {product.name}
                  </h1>

                  <button
                    onClick={() => router.back()}
                    className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[#DB005B] bg-white px-4 py-2 text-sm font-semibold text-[#DB005B] shadow-sm transition cursor-pointer
                               hover:bg-[#DB005B] hover:text-white active:scale-[0.98]"
                  >
                    ← Back
                  </button>
                </div>

                {/* ✅ Removed rating row from right column */}

                {/* Price */}
                <div className="mt-4 flex items-end gap-2">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#DB005B]">
                    ${product.price}
                  </p>
                  <span className="text-xs text-gray-500 pb-1">incl. taxes*</span>
                </div>

                <div className="mt-5 h-px w-full bg-black/10" />

                {/* Description */}
                <p className="mt-5 text-gray-800 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>

                {/* Quick trust highlights */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4">
                    <div className="text-xs text-gray-500">Best for</div>
                    <div className="mt-1 font-semibold text-black">
                      Daily routine & glow
                    </div>
                  </div>
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4">
                    <div className="text-xs text-gray-500">Quality</div>
                    <div className="mt-1 font-semibold text-black">
                      Premium packaging
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-7">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Quantity
                  </div>

                  <div className="inline-flex items-center rounded-full border border-pink-200 bg-[#FDF4F5] p-1">
                    <button
                      onClick={handleMinus}
                      className="h-10 w-10 rounded-full bg-white border border-pink-200 text-[#DB005B] font-bold transition cursor-pointer
                                 hover:bg-[#DB005B] hover:text-white active:scale-[0.98]"
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
                      className="w-16 h-10 mx-2 text-center rounded-full border border-pink-200 bg-white font-semibold outline-none focus:ring-2 focus:ring-[#DB005B]/20"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      aria-label="Quantity"
                    />

                    <button
                      onClick={handlePlus}
                      className="h-10 w-10 rounded-full bg-white border border-pink-200 text-[#DB005B] font-bold transition cursor-pointer
                                 hover:bg-[#DB005B] hover:text-white active:scale-[0.98]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTAs */}
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
                    className="group bg-[#DB005B] text-white px-6 py-3 rounded-full font-semibold shadow-sm transition cursor-pointer
                               hover:bg-white hover:text-[#DB005B] hover:border hover:border-[#DB005B]
                               active:scale-[0.99]"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      {added ? "Added ✅" : "Add to Cart"}
                      <span className="opacity-90 text-sm group-hover:opacity-100 transition">
                        ({safeQty})
                      </span>
                    </span>
                  </button>

                  <button
                    onClick={() => router.push("/category?cat=all")}
                    className="bg-white text-[#DB005B] border border-[#DB005B] px-6 py-3 rounded-full font-semibold shadow-sm transition cursor-pointer
                               hover:bg-[#DB005B] hover:text-white active:scale-[0.99]"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Delivery/Support row */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Delivery</div>
                    <div className="mt-1 font-semibold text-black">2–4 Days</div>
                  </div>
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Warranty</div>
                    <div className="mt-1 font-semibold text-black">7 Days Check</div>
                  </div>
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Support</div>
                    <div className="mt-1 font-semibold text-black">Chat / Call</div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  *Pricing & availability may change. Images are for illustration.
                </p>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                🔒 Secure checkout • ✅ Authentic products • 🚀 Fast delivery
              </div>
            </div>
          </div>

          {/* ✅ Reviews component */}
          <ProductReviews />

          {/* FAQ */}
          <div className="mt-14">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                  FAQs
                </h2>
              </div>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions — so you can buy with confidence.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                    >
                      <span className="font-bold text-black">{f.q}</span>
                      <span className="text-[#DB005B] font-extrabold text-xl">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-14 pb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                  Related Products
                </h2>
              </div>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Customers often buy these together — curated from the same category.
              </p>
            </div>

            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No related products found.
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <button
                onClick={() =>
                  router.push(
                    `/category?cat=${encodeURIComponent(String(product.category))}`
                  )
                }
                className="px-10 py-3.5 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold shadow-sm transition cursor-pointer
                           hover:bg-white hover:text-[#DB005B] active:scale-[0.98]"
              >
                View More in {formatLabel(String(product.category))} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
