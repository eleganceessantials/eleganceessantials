"use client";

import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, total } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[99998] bg-black/45 backdrop-blur-md transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-[99999] h-[100dvh] w-[340px] max-w-[90vw] transform bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-pink-100 bg-white px-5 py-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#DB005B]">
              Your Cart
            </h2>
            <p className="text-xs text-gray-500">
              {cart.length} item{cart.length === 1 ? "" : "s"} in your cart
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-pink-100 bg-[#FCF8F8] transition hover:bg-[#FDE8EF]"
          >
            <span className="text-xl leading-none text-black">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="h-[calc(100dvh-78px)] overflow-hidden">
          <div
            className={`px-5 py-4 ${
              cart.length > 0
                ? "h-[calc(100dvh-230px)] overflow-y-auto"
                : "h-full overflow-y-auto"
            }`}
          >
            {cart.length === 0 ? (
              <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDE8EF] text-3xl">
                  🛍️
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-[#DB005B]">
                  Cart is empty
                </h3>

                <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-gray-500">
                  Add your favorite products and they’ll appear here.
                </p>

                <button
                  onClick={() => {
                    onClose();
                    router.push("/category?cat=all");
                  }}
                  className="mt-7 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#DB005B] bg-[#DB005B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#DB005B]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4 pr-1">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-pink-100 bg-[#FCF8F8] p-3 transition hover:shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-xl bg-white object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-bold leading-tight text-black">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Rs. {item.price} × {item.quantity}
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-black">
                        Rs. {Number(item.price) * Number(item.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-pink-100 bg-white transition hover:bg-[#FDE8EF]"
                    >
                      <span className="text-lg leading-none text-[#DB005B]">
                        ×
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 border-t border-pink-100 bg-white px-5 py-4 shadow-[0_-12px_30px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Total</p>

                <p className="text-xl font-extrabold text-[#DB005B]">
                  Rs. {total}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="w-full cursor-pointer rounded-full border border-[#DB005B] bg-white py-3 text-sm font-semibold text-[#DB005B] transition hover:bg-[#DB005B] hover:text-white"
                >
                  Close
                </button>

                <button
                  onClick={handleCheckout}
                  className="w-full cursor-pointer rounded-full border border-[#DB005B] bg-[#DB005B] py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#DB005B]"
                >
                  Checkout
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                Secure checkout • Fast delivery • Easy returns
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}