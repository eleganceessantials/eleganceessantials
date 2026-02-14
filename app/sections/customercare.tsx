"use client";

import React from "react";

const customerCareTabs = [
  {
    id: 1,
    title: "Free Shipping",
    description: "Get your orders delivered quickly and safely to your doorstep at no extra cost.",
    svg: (
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Car body */}
        <rect x="5" y="25" width="40" height="15" rx="2" />
        <rect x="45" y="30" width="14" height="10" rx="1" />
        {/* Wheels */}
        <circle cx="15" cy="45" r="5" />
        <circle cx="50" cy="45" r="5" />
        {/* Motion lines */}
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
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Box */}
        <rect x="15" y="20" width="34" height="24" rx="2" />
        {/* Arrow for return */}
        <path d="M32 12 v16 h8" />
        <polyline points="40,28 32,36 24,28" />
        {/* Dotted lines for movement */}
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
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="32" cy="20" r="8" />
        {/* Headphones */}
        <path d="M24 20 v10 a8 8 0 0 0 16 0 v-10" />
        <rect x="22" y="30" width="6" height="12" rx="2" />
        <rect x="36" y="30" width="6" height="12" rx="2" />
        {/* Body */}
        <path d="M32 28 v16" />
      </svg>
    ),
  },
];

export default function CustomerCare() {
  return (
    <section className="py-20 bg-pink-200"> {/* Background pink same as Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 text-center">
          Customer Care
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {customerCareTabs.map((tab) => (
            <div
              key={tab.id}
              className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 cursor-default transition hover:shadow-lg"
            >
              <div className="mb-4">{tab.svg}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tab.title}</h3>
              <p className="text-center text-gray-700 text-sm">{tab.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
