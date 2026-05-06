"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const { addToCart } = useCart();

  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setRelatedProducts([]);

        const prodRes = await fetch(`/api/products/${slug}`, {
          cache: "no-store",
        });

        if (!prodRes.ok) {
          setProduct(null);
          return;
        }

        const productData = await prodRes.json();
        setProduct(productData);

        if (productData?.category) {
          setRelatedLoading(true);

          const relatedRes = await fetch(
            `/api/products?page=1&limit=8&cat=${encodeURIComponent(
              String(productData.category)
            )}`,
            {
              cache: "no-store",
            }
          );

          if (relatedRes.ok) {
            const relatedData = await relatedRes.json();

            const safeRelatedProducts = Array.isArray(relatedData)
              ? relatedData
              : Array.isArray(relatedData.products)
              ? relatedData.products
              : [];

            setRelatedProducts(
              safeRelatedProducts
                .filter((p: any) => p.slug !== productData.slug)
                .slice(0, 4)
            );
          }
        }
      } catch (e) {
        console.error("Failed to fetch product detail:", e);
        setProduct(null);
      } finally {
        setLoading(false);
        setRelatedLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const safeQty = useMemo(() => {
    const n = Number.isFinite(qty) ? qty : 1;
    return Math.max(1, Math.min(99, n));
  }, [qty]);

  const finalPrice = useMemo(() => {
    if (!product) return 0;
    return Number(product.discountPrice || product.price || 0);
  }, [product]);

  const discountPercent = useMemo(() => {
    if (!product?.discountPrice || !product?.price) return 0;

    const original = Number(product.price);
    const discounted = Number(product.discountPrice);

    if (!original || !discounted || discounted >= original) return 0;

    return Math.round(((original - discounted) / original) * 100);
  }, [product]);

  const handleMinus = () =>
    setQty((q) => Math.max(1, (Number.isFinite(q) ? q : 1) - 1));

  const handlePlus = () =>
    setQty((q) => Math.min(99, (Number.isFinite(q) ? q : 1) + 1));

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image || "",
      quantity: safeQty,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const faqs = [
    {
      q: "Is this product authentic?",
      a: "Yes — we source from verified distributors and only sell authentic products. If you have any issue, we offer easy returns.",
    },
    {
      q: "How long does delivery take?",
      a: "Typically 2–4 working days depending on your city. You’ll get tracking once your order is dispatched.",
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

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FCF8F8] px-4 sm:px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-5 w-72 bg-white rounded-full mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 rounded-2xl bg-white border border-pink-100"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div className="h-[420px] md:h-[520px] rounded-2xl bg-white border border-pink-100" />

              <div className="rounded-2xl bg-white border border-pink-100 p-6 sm:p-8">
                <div className="h-10 w-4/5 bg-gray-100 rounded-full mb-4" />
                <div className="h-8 w-40 bg-gray-100 rounded-full mb-6" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-100 rounded-full" />
                  <div className="h-4 w-11/12 bg-gray-100 rounded-full" />
                  <div className="h-4 w-8/12 bg-gray-100 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="h-20 bg-gray-100 rounded-2xl" />
                  <div className="h-20 bg-gray-100 rounded-2xl" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="h-12 bg-gray-100 rounded-full" />
                  <div className="h-12 bg-gray-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-400 font-bold tracking-widest text-xs uppercase">
            Elegance is loading...
          </p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <h2 className="text-2xl font-black">Product not found</h2>
        <p className="text-gray-500 mt-2 mb-8">
          We couldn't find the item you're looking for.
        </p>
        <Link
          href="/category?cat=all"
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transition-all"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FCF8F8] pb-24 md:pb-0">
      {added && (
        <div className="fixed top-5 left-1/2 z-[200] -translate-x-1/2 rounded-full bg-black text-white px-5 py-3 text-sm font-bold shadow-2xl">
          Added to cart ✅
        </div>
      )}

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
              href={`/category?cat=${encodeURIComponent(
                String(product.category)
              )}`}
              className="hover:text-[#DB005B] transition"
            >
              {formatLabel(String(product.category))}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#DB005B] truncate">
              {product.name}
            </span>
          </div>

          {/* Trust Strip */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white border border-pink-100 p-4 text-center">
              <div className="text-sm font-extrabold text-[#DB005B]">
                Authentic
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Verified products only
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-pink-100 p-4 text-center">
              <div className="text-sm font-extrabold text-[#DB005B]">
                Fast Delivery
              </div>
              <div className="text-xs text-gray-600 mt-1">
                2–4 working days
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-pink-100 p-4 text-center">
              <div className="text-sm font-extrabold text-[#DB005B]">
                Easy Returns
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Hassle-free support
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-10 md:gap-12">
            {/* LEFT: Image */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-[340px] sm:h-[420px] md:h-[520px] rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm group transition hover:shadow-lg">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name || "Product image"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-6xl opacity-40">
                    🖼️
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-pink-200 bg-white/90 px-3 py-1 text-xs font-semibold text-[#DB005B] backdrop-blur">
                    {String(product.category).toUpperCase()}
                  </span>

                  {discountPercent > 0 && (
                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50/95 px-3 py-1 text-xs font-black text-green-700 backdrop-blur">
                      SAVE {discountPercent}%
                    </span>
                  )}
                </div>

                {product.image && (
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">
                    <span className="rounded-full bg-white/90 border border-black/10 px-3 py-1 text-xs text-gray-700 backdrop-blur">
                      Hover to zoom
                    </span>
                  </div>
                )}
              </div>

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
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
                    {product.name}
                  </h1>

                  <button
                    onClick={() => router.back()}
                    className="shrink-0 hidden sm:inline-flex items-center gap-2 rounded-full border border-[#DB005B] bg-white px-4 py-2 text-sm font-semibold text-[#DB005B] shadow-sm transition cursor-pointer hover:bg-[#DB005B] hover:text-white active:scale-[0.98]"
                  >
                    ← Back
                  </button>
                </div>

                <div className="mt-4 flex flex-col">
                  <div className="flex flex-wrap items-end gap-2">
                    {product.discountPrice ? (
                      <>
                        <p className="text-2xl sm:text-3xl font-extrabold text-[#DB005B]">
                          Rs. {product.discountPrice}
                        </p>
                        <span className="text-lg text-gray-400 line-through pb-1">
                          Rs. {product.price}
                        </span>
                      </>
                    ) : (
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#DB005B]">
                        Rs. {product.price}
                      </p>
                    )}

                    <span className="text-xs text-gray-500 pb-1">
                      incl. taxes*
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Free Delivery
                    </span>

                    <span className="text-sm font-semibold text-[#DB005B] bg-pink-50 px-3 py-1 rounded-full">
                      In Stock
                    </span>
                  </div>
                </div>

                <div className="mt-5 h-px w-full bg-black/10" />

                <p className="mt-5 text-gray-800 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>

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
                      className="h-10 w-10 rounded-full bg-white border border-pink-200 text-[#DB005B] font-bold transition cursor-pointer hover:bg-[#DB005B] hover:text-white active:scale-[0.98]"
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
                      className="h-10 w-10 rounded-full bg-white border border-pink-200 text-[#DB005B] font-bold transition cursor-pointer hover:bg-[#DB005B] hover:text-white active:scale-[0.98]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="group bg-[#DB005B] text-white px-6 py-3 rounded-full font-semibold shadow-sm transition cursor-pointer hover:bg-white hover:text-[#DB005B] hover:border hover:border-[#DB005B] active:scale-[0.99]"
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
                    className="bg-white text-[#DB005B] border border-[#DB005B] px-6 py-3 rounded-full font-semibold shadow-sm transition cursor-pointer hover:bg-[#DB005B] hover:text-white active:scale-[0.99]"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Delivery</div>
                    <div className="mt-1 font-semibold text-black">
                      2–4 Days
                    </div>
                  </div>
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Warranty</div>
                    <div className="mt-1 font-semibold text-black">
                      7 Days Check
                    </div>
                  </div>
                  <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4 transition hover:bg-white hover:shadow-sm">
                    <div className="text-xs text-gray-500">Support</div>
                    <div className="mt-1 font-semibold text-black">
                      Chat / Call
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  *Pricing & availability may change. Images are for
                  illustration.
                </p>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                🔒 Secure checkout • ✅ Authentic products • 🚀 Fast delivery
              </div>
            </div>
          </div>

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
                Quick answers to common questions — so you can buy with
                confidence.
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
                Customers often buy these together — curated from the same
                category.
              </p>
            </div>

            {relatedLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-80 rounded-2xl bg-white border border-pink-100 animate-pulse"
                  />
                ))}
              </div>
            ) : relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id || p.slug} product={p} />
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
                    `/category?cat=${encodeURIComponent(
                      String(product.category)
                    )}`
                  )
                }
                className="px-10 py-3.5 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold shadow-sm transition cursor-pointer hover:bg-white hover:text-[#DB005B] active:scale-[0.98]"
              >
                View More in {formatLabel(String(product.category))} →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[120] border-t border-pink-100 bg-white/95 backdrop-blur-xl p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-gray-500">
              {product.name}
            </p>
            <p className="text-lg font-black text-[#DB005B]">
              Rs. {finalPrice}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="shrink-0 rounded-full bg-[#DB005B] px-6 py-3 text-sm font-black text-white shadow-lg active:scale-[0.98]"
          >
            {added ? "Added ✅" : `Add (${safeQty})`}
          </button>
        </div>
      </div>
    </section>
  );
}