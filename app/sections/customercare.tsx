"use client";

import React from "react";

const features = [
  {
    title: "Express Delivery",
    desc: "Swift and secure shipping across the nation, ensuring your essentials arrive fresh.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Luxury Quality",
    desc: "Every product is 100% authentic and curated from the world's most trusted beauty brands.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Secure Checkout",
    desc: "Your data is protected. Shop with confidence using our secure WhatsApp ordering system.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function CustomerCare() {
  return (
    <section className="py-24 bg-[#FCF8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
            <h2 className="text-4xl md:text-5xl font-[1000] text-black tracking-tighter">
              The Elegance Experience
            </h2>
          </div>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
            We've refined every detail of your journey to ensure beauty is delivered with absolute perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group relative">
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#DB005B] shadow-xl shadow-pink-100/50 border border-pink-50 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {f.icon}
                </div>
                
                <h3 className="text-2xl font-black text-black mb-4 tracking-tight">
                  {f.title}
                </h3>
                
                <p className="text-gray-500 font-medium leading-relaxed max-w-xs">
                  {f.desc}
                </p>
                
                {/* Decorative underline */}
                <div className="mt-6 w-12 h-1 bg-[#DB005B]/10 rounded-full group-hover:w-24 group-hover:bg-[#DB005B] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
