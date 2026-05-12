"use client";

import React from "react";
import Footer from "../components/footer";
import Link from "next/link";

export default function ContactPage() {
  const phoneNumber = "03114051542";
  const displayPhone = "0311-4051542";
  const whatsappNumber = "923114051542";
  const supportEmail = "Supporteleganceessantials@gmail.com";

  return (
    <div className="min-h-screen bg-[#FCF8F8] font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0b0b0b] text-white rounded-b-[3rem]">
        <div className="absolute inset-0">
          <div className="absolute -top-36 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#DB005B]/20 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-8 text-sm font-bold uppercase tracking-widest"
          >
            ← Back to Home
          </Link>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Get in Touch<span className="text-[#DB005B]">.</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Have questions about our products or your order? We're here to help
            you achieve your perfect glow.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* WhatsApp */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/20 border border-pink-100 hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#FDE8EF] rounded-2xl flex items-center justify-center text-[#DB005B] mb-8 group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 32 32"
                className="w-8 h-8"
                fill="currentColor"
              >
                <path d="M19.11 17.53c-.28-.14-1.63-.8-1.88-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.62-.47h-.53c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.03.14.19 2.03 3.1 4.93 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.53-.33z" />
                <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.33.67 4.5 1.83 6.33L4.64 27l5.86-1.15a11.93 11.93 0 0 0 5.52 1.35c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.64 3 16.02 3zm0 21.7c-1.84 0-3.55-.5-5.03-1.38l-.36-.21-3.47.68.7-3.38-.23-.35a9.67 9.67 0 0 1-1.53-5.04c0-5.38 4.38-9.76 9.92-9.76 5.47 0 9.92 4.39 9.92 9.76 0 5.38-4.45 9.76-9.92 9.76z" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
              WhatsApp
            </h3>

            <p className="text-gray-500 font-medium mb-6">
              Available for orders and instant product inquiries.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#DB005B] font-black text-lg hover:gap-4 transition-all"
            >
              {displayPhone} <span>→</span>
            </a>
          </div>

          {/* Call Support */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/20 border border-pink-100 hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#FDE8EF] rounded-2xl flex items-center justify-center text-[#DB005B] mb-8 group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
              Voice Call
            </h3>

            <p className="text-gray-500 font-medium mb-6">
              Call us directly during business hours for order support.
            </p>

            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2 text-[#DB005B] font-black text-lg hover:gap-4 transition-all"
            >
              {displayPhone} <span>→</span>
            </a>
          </div>

          {/* Email Support */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/20 border border-pink-100 hover:-translate-y-2 transition-all duration-300 group md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-[#FDE8EF] rounded-2xl flex items-center justify-center text-[#DB005B] mb-8 group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
              Email Support
            </h3>

            <p className="text-gray-500 font-medium mb-6">
              Send us your queries, order issues, or product questions anytime.
            </p>

            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center gap-2 text-[#DB005B] font-black text-base sm:text-lg break-all hover:gap-4 transition-all"
            >
              {supportEmail} <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form or Map Placeholder Section */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="bg-white p-12 rounded-[3rem] border border-pink-50 shadow-sm text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
            <h2 className="text-3xl font-[1000] text-black tracking-tighter">
              Visit Storefront
            </h2>
          </div>

          <p className="text-gray-600 mb-10 text-lg font-medium">
            We're located in the heart of beauty excellence.
          </p>

          <div className="aspect-video w-full rounded-[2rem] bg-gray-100 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2000&auto=format&fit=crop"
              alt="Store"
              className="w-full h-full object-cover opacity-80"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl border border-white shadow-2xl">
                <p className="text-black font-black">Elegance Essentials HQ</p>
                <p className="text-gray-500 text-sm">
                  Pakistan's Premium Beauty Hub
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}