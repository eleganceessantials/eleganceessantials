"use client";

import React, { useMemo, useRef, useState } from "react";
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

  const [step, setStep] = useState<"checkout" | "whatsapp" | "success">(
    "checkout"
  );

  // If popup blocked, show a manual open link instead of redirecting current tab
  const [popupBlocked, setPopupBlocked] = useState(false);

  // Hard lock to prevent double click / double navigation
  const waOpenLockRef = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Your number provided by you (local PK format)
  const RAW_WHATSAPP_NUMBER = "0333-4471403";

  // ✅ Convert to international digits-only format for WhatsApp links
  const getWhatsappPhone = (raw: string) => {
    const digits = (raw || "").replace(/\D/g, "");
    // If user put 03xxxxxxxxx → convert to 92xxxxxxxxxx
    if (digits.startsWith("0")) return `92${digits.slice(1)}`;
    // If already starts with 92, keep it
    if (digits.startsWith("92")) return digits;
    // Otherwise assume they typed full already
    return digits;
  };

  const WHATSAPP_NUMBER = getWhatsappPhone(RAW_WHATSAPP_NUMBER);
  const DISPLAY_WHATSAPP_NUMBER = RAW_WHATSAPP_NUMBER;

  const whatsappMessage = useMemo(() => {
    const itemsText = cart
      .map((item) => {
        const unit = Number(item.price).toFixed(2);
        const line = Number(item.price * item.quantity).toFixed(2);
        return `- ${item.name} (x${item.quantity}) — Rs. ${unit} each (Line: Rs. ${line})`;
      })
      .join("\n");

    return `Hi Elegance Essentials, I’d like to place an order.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Delivery Address: ${form.address}

Items:
${itemsText}

Total: Rs. ${Number(total).toFixed(2)}

Please confirm delivery time. Thank you.`;
  }, [cart, form, total]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const normalizePhoneDigits = (phone: string) => (phone || "").replace(/\D/g, "");

  const isValidPhone = (phone: string) => {
    const digits = normalizePhoneDigits(phone);
    if (!digits) return false;
    if (digits.startsWith("03") && digits.length === 11) return true;
    if (digits.startsWith("92") && digits.length === 12) return true;
    return digits.length >= 10 && digits.length <= 13;
  };

  const validateCheckout = () => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!isValidEmail(form.email)) return "Please enter a valid email address.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!isValidPhone(form.phone))
      return "Please enter a valid phone number (e.g., 03XXXXXXXXX or +92XXXXXXXXXX).";
    if (!form.address.trim()) return "Please enter your address.";
    if (cart.length === 0) return "Your cart is empty.";
    return null;
  };

  const getWhatsAppUrl = () => {
    const encoded = encodeURIComponent(whatsappMessage);

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    return isMobile
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;
  };

  const openWhatsAppAndFinish = () => {
    if (waOpenLockRef.current) return;
    waOpenLockRef.current = true;

    setPopupBlocked(false);

    const url = getWhatsAppUrl();

    // ✅ Show success immediately on your site
    clearCart();
    setStep("success");

    // ✅ Open ONLY ONE WhatsApp: new tab only (no same-tab redirect)
    const opened = window.open(url, "_blank", "noopener,noreferrer");

    // If browser blocks popup, show manual button/link on success screen
    if (!opened) setPopupBlocked(true);

    setTimeout(() => {
      waOpenLockRef.current = false;
    }, 1500);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      alert("Message copied. Open WhatsApp, paste, and send.");
    } catch (err) {
      console.error(err);
      alert("Copy failed. Please open WhatsApp and paste manually.");
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(DISPLAY_WHATSAPP_NUMBER);
      alert("Elegance Essentials WhatsApp number copied.");
    } catch (err) {
      console.error(err);
      alert("Copy failed. Please select and copy manually.");
    }
  };

  const goToWhatsAppStep = async () => {
    const err = validateCheckout();
    if (err) {
      alert(err);
      return;
    }

    setLoading(true);
    try {
      setStep("whatsapp");
    } finally {
      setLoading(false);
    }
  };

 if (step === "success") {
  return (
    <section className="py-16 bg-[#FCF8F8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-pink-100 p-10 rounded-3xl shadow-sm text-center">

          <div className="mx-auto w-16 h-16 rounded-full bg-[#FDE8EF] flex items-center justify-center text-3xl text-[#DB005B]">
            ✓
          </div>

          <h2 className="text-3xl font-extrabold mt-6 text-black">
            Order Submitted
          </h2>

          <p className="text-gray-600 mt-3 text-lg">
            Thanks for placing your order.  
            Our sales team will contact you shortly.
          </p>

          <button
            onClick={() => router.push("/category?cat=all")}
            className="mt-8 px-12 py-4 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold text-lg transition cursor-pointer
                       hover:bg-white hover:text-[#DB005B] active:scale-[0.98]"
          >
            Continue Shopping →
          </button>

        </div>
      </div>
    </section>
  );
}


  if (step === "whatsapp") {
    return (
      <section className="py-16 bg-[#FCF8F8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-pink-100 rounded-3xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1.5 rounded-full bg-[#DB005B]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-black">
                Send Your Order on WhatsApp
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              This opens WhatsApp in a new tab with your order ready. Just press Send inside WhatsApp.
            </p>

            <div className="mt-5 rounded-2xl border border-pink-100 bg-[#FDF4F5] p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-gray-600">
                    Elegance Essentials WhatsApp
                  </div>
                  <div className="text-sm font-extrabold text-black mt-1">
                    {DISPLAY_WHATSAPP_NUMBER}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    If you prefer manual sending, message this number.
                  </div>
                </div>

                <button
                  onClick={copyPhone}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-pink-200 bg-white text-[#DB005B] font-semibold transition cursor-pointer
                             hover:bg-[#FDF4F5] active:scale-[0.98]"
                >
                  Copy Number
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-pink-100 bg-[#FDF4F5] p-5">
                  <div className="text-xs font-semibold text-gray-600">
                    Message preview
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap text-sm text-black leading-relaxed font-sans">
                    {whatsappMessage}
                  </pre>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={openWhatsAppAndFinish}
                    className="w-full sm:w-auto px-8 py-3 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold transition cursor-pointer
                               hover:bg-white hover:text-[#DB005B] active:scale-[0.98]"
                  >
                    Open WhatsApp →
                  </button>

                  <button
                    onClick={copyMessage}
                    className="w-full sm:w-auto px-8 py-3 rounded-full border border-pink-200 bg-white text-[#DB005B] font-semibold transition cursor-pointer
                               hover:bg-[#FDF4F5] active:scale-[0.98]"
                  >
                    Copy Message
                  </button>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  If WhatsApp doesn’t open, your browser likely blocked popups we’ll show a manual open button on the next screen.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-pink-100 bg-white p-5">
                  <div className="text-sm font-extrabold text-black">
                    Order Total
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-[#DB005B]">
                    Rs. {Number(total).toFixed(2)}
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FDF4F5] border border-pink-100 p-4 text-sm text-gray-700">
                    After opening WhatsApp, your order is submitted here. You’ll get confirmation on WhatsApp.
                  </div>

                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full mt-4 py-3 rounded-full border border-pink-200 bg-white text-gray-700 font-semibold transition cursor-pointer
                               hover:bg-[#FDF4F5] active:scale-[0.98]"
                  >
                    Back to Edit Details
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Elegance Essentials. Secure checkout experience.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#FCF8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {cart.length === 0 ? (
          <div className="max-w-3xl mx-auto bg-white border border-pink-100 p-8 rounded-3xl shadow-sm text-center">
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
            <div className="lg:col-span-5 lg:order-2">
              <div className="lg:sticky lg:top-28 bg-white border border-pink-100 rounded-3xl shadow-sm p-6 sm:p-8">
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
                          {item.quantity} × Rs. {item.price}
                        </p>
                      </div>
                      <div className="font-semibold text-black text-sm">
                        Rs. {Number(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-pink-100 pt-4">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span>Rs. {Number(total).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm mt-2">
                    <span>Delivery</span>
                    <span className="text-[#DB005B] font-semibold">Free</span>
                  </div>

                  <div className="flex justify-between font-extrabold text-lg mt-4 text-black">
                    <span>Total</span>
                    <span className="text-[#DB005B]">
                      Rs. {Number(total).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <div className="rounded-xl bg-[#FDF4F5] border border-pink-100 p-3 text-center">
                    Authentic
                  </div>
                  <div className="rounded-xl bg-[#FDF4F5] border border-pink-100 p-3 text-center">
                    Fast
                  </div>
                  <div className="rounded-xl bg-[#FDF4F5] border border-pink-100 p-3 text-center">
                    Returns
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1">
              <div className="bg-white border border-pink-100 rounded-3xl shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-1.5 rounded-full bg-[#DB005B]" />
                    <h2 className="text-xl sm:text-2xl font-extrabold text-black">
                      Customer Details
                    </h2>
                  </div>

                  <button
                    onClick={() => router.push("/category?cat=all")}
                    className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#DB005B] hover:opacity-80 transition cursor-pointer"
                  >
                    Continue Shopping →
                  </button>
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
                    required
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (e.g. 03XXXXXXXXX)"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    inputMode="tel"
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20"
                  />

                  <textarea
                    name="address"
                    placeholder="Full Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full border border-pink-100 bg-[#FDF4F5] rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-[#DB005B]/20 min-h-[110px]"
                  />
                </div>

                <button
                  onClick={goToWhatsAppStep}
                  disabled={loading}
                  className="w-full mt-6 py-4 rounded-full border border-[#DB005B] bg-[#DB005B] text-white font-semibold text-lg transition cursor-pointer
                             hover:bg-white hover:text-[#DB005B]
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Continuing..." : "Continue →"}
                </button>

                <p className="mt-3 text-xs text-gray-500 text-center">
                  Next: We’ll open WhatsApp with your order message.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Elegance Essentials. Secure checkout experience.
        </div>
      </div>
    </section>
  );
}
