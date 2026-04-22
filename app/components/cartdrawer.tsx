"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, total } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[340px] max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h2 className="text-xl font-extrabold text-[#DB005B]">Your Cart</h2>
            <p className="text-xs text-gray-500">
              {cart.length} item{cart.length === 1 ? "" : "s"} in your cart
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
          >
            <span className="text-black text-xl">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#fdeded] flex items-center justify-center text-2xl">
                🛍️
              </div>
              <h3 className="mt-4 font-bold text-[#DB005B]">Cart is empty</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add some products to see them here.
              </p>

              <button
                onClick={() => {
                  onClose();
                  router.push("/category?cat=all");
                }}
                className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#DB005B] bg-[#DB005B] text-white hover:bg-white hover:text-[#DB005B] transition cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 border border-gray-100 rounded-2xl p-3 hover:shadow-sm transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl bg-gray-100"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-black leading-tight">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Rs. {item.price} × {item.quantity}
                    </p>

                    <p className="text-sm font-bold text-black mt-2">
                      Subtotal: Rs. {Number(item.price) * Number(item.quantity)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#fdeded] transition cursor-pointer"
                  >
                    <span className="text-[#DB005B] text-lg">×</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t bg-white px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-extrabold text-[#DB005B]">
                Rs. {total}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Close */}
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-full border border-[#DB005B] bg-white text-[#DB005B] hover:bg-[#DB005B] hover:text-white transition cursor-pointer"
              >
                Close
              </button>

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                className="w-full py-2.5 rounded-full border border-[#DB005B] bg-[#DB005B] text-white hover:bg-white hover:text-[#DB005B] transition cursor-pointer"
              >
                Checkout
              </button>
            </div>

            <p className="mt-3 text-[11px] text-gray-400 text-center">
              Secure checkout • Fast delivery • Easy returns
            </p>
          </div>
        )}
      </div>
    </>
  );
}
