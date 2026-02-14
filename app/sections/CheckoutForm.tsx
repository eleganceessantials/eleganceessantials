"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please fill all fields!");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/sendOrderEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items: cart, total }),
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="pb-16 bg-[#FCF8F8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-pink-100 p-8 rounded-2xl shadow-sm text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#fdeded] flex items-center justify-center text-2xl">
              ✅
            </div>
            <h2 className="text-2xl font-extrabold mt-4 text-black">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-700 mt-2">
              A confirmation email has been sent to{" "}
              <span className="font-semibold text-[#DB005B]">{form.email}</span>.
            </p>
            <p className="text-gray-500 mt-2">
              We’ll contact you soon regarding delivery.
            </p>

            <button
              onClick={() => router.push("/category?cat=all")}
              className="mt-6 px-10 py-3 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold transition cursor-pointer
                         hover:bg-white hover:text-[#DB005B] active:scale-[0.98]"
            >
              Continue Shopping →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16 bg-[#FCF8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {cart.length === 0 ? (
          <div className="max-w-3xl mx-auto bg-white border border-pink-100 p-8 rounded-2xl shadow-sm text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#fdeded] flex items-center justify-center text-2xl">
              🛒
            </div>
            <h2 className="text-2xl font-extrabold mt-4 text-black">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mt-2">
              Add items before proceeding to checkout.
            </p>
            <button
              onClick={() => router.push("/category?cat=all")}
              className="mt-6 px-10 py-3 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold transition cursor-pointer
                         hover:bg-white hover:text-[#DB005B] active:scale-[0.98]"
            >
              Explore Products →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* LEFT: Customer Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-pink-100 rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-1.5 rounded-full bg-[#DB005B]" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-black">
                    Customer Details
                  </h2>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Please enter accurate details so we can deliver smoothly.
                </p>

                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20"
                  />

                  <textarea
                    name="address"
                    placeholder="Full Address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20 min-h-[110px]"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20"
                  />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full mt-6 py-4 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold text-lg transition cursor-pointer
                             hover:bg-white hover:text-[#DB005B]
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Placing Order..." : "Place Order →"}
                </button>

                <p className="mt-3 text-xs text-gray-500 text-center">
                  🔒 Secure checkout • Your details remain private.
                </p>
              </div>
            </div>

            {/* RIGHT: Order Summary (Sticky) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 bg-white border border-pink-100 rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-1.5 rounded-full bg-[#DB005B]" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-black">
                    Order Summary
                  </h2>
                </div>

                <div className="mt-6 space-y-4 max-h-[360px] overflow-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-xl object-cover border border-pink-100"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-black leading-tight">
                          {item.name}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <div className="font-semibold text-black text-sm">
                        ${Number(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-pink-100 pt-4">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span>${Number(total).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm mt-2">
                    <span>Delivery</span>
                    <span className="text-[#DB005B] font-semibold">Free</span>
                  </div>

                  <div className="flex justify-between font-extrabold text-lg mt-4 text-black">
                    <span>Total</span>
                    <span className="text-[#DB005B]">${Number(total).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <div className="rounded-xl bg-[#FDF4F5] border border-pink-100 p-3 text-center">
                    ✅ Authentic
                  </div>
                  <div className="rounded-xl bg-[#FDF4F5] border border-pink-100 p-3 text-center">
                    🚚 Fast
                  </div>
                  <div className="rounded-xl bg-[#FDF4F5] border border-pink-100 p-3 text-center">
                    🔁 Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BeautyBar. Secure checkout experience.
        </div>
      </div>
    </section>
  );
}
