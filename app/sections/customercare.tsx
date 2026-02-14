"use client";

import React from "react";

const customerCareTabs = [
  {
    id: 1,
    title: "Free Shipping",
    description:
      "Get your orders delivered quickly and safely to your doorstep at no extra cost.",
    svg: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="25" width="40" height="15" rx="2" />
        <rect x="45" y="30" width="14" height="10" rx="1" />
        <circle cx="15" cy="45" r="5" />
        <circle cx="50" cy="45" r="5" />
        <line x1="60" y1="32" x2="64" y2="32" />
        <line x1="60" y1="37" x2="64" y2="37" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Return & Refund",
    description: "Easily return products and get your refund processed hassle-free.",
    svg: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="15" y="20" width="34" height="24" rx="2" />
        <path d="M32 12 v16 h8" />
        <polyline points="40,28 32,36 24,28" />
        <line x1="32" y1="36" x2="32" y2="50" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Customer Support",
    description: "Our support team is always ready to help you with any queries or issues.",
    svg: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="20" r="8" />
        <path d="M24 20 v10 a8 8 0 0 0 16 0 v-10" />
        <rect x="22" y="30" width="6" height="12" rx="2" />
        <rect x="36" y="30" width="6" height="12" rx="2" />
        <path d="M32 28 v16" />
      </svg>
    ),
  },
];

export default function CustomerCare() {
  return (
    <section className="py-16 sm:py-20 bg-[#FCF8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-black">
              Customer Care
            </h2>
          </div>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A smooth shopping experience — fast delivery, easy returns, and support you can trust.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {customerCareTabs.map((tab) => (
            <div
              key={tab.id}
              className="group bg-white rounded-2xl border border-transparent hover:border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#fdeded] flex items-center justify-center text-black group-hover:text-[#DB005B] transition">
                {tab.svg}
              </div>

              <h3 className="mt-5 text-lg sm:text-xl font-extrabold text-[#DB005B]">
                {tab.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {tab.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
