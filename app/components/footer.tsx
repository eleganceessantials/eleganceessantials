"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0b0b] text-white">
      {/* Premium background (hero-like) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -right-28 h-[32rem] w-[32rem] rounded-full bg-[#DB005B]/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand + trust */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-xl shadow-sm">
                BB
              </div>
              <div className="text-2xl font-extrabold tracking-tight">
                BeautyBar<span className="text-[#DB005B]">.</span>
              </div>
            </div>

            <p className="mt-4 text-white/80 max-w-md leading-relaxed">
              Premium beauty essentials curated for glow, confidence, and everyday elegance.
              Authentic products, fast delivery, and easy returns — always.
            </p>

            {/* Trust chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#DB005B]" />
                100% Authentic
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#DB005B]" />
                Fast Delivery
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#DB005B]" />
                Easy Returns
              </span>
            </div>

            {/* Contact strip */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Support</div>
                <div className="mt-1 font-semibold text-white">Chat / Call</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Delivery</div>
                <div className="mt-1 font-semibold text-white">2–4 Working Days</div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  icon: (
                    <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  icon: (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.335 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.773.127 4.593.387 3.6 1.38 2.607 2.373 2.347 3.553 2.29 4.832.232 8.332.22 8.741.22 12s.012 3.668.07 4.948c.058 1.279.318 2.459 1.31 3.452.993.993 2.173 1.253 3.452 1.31 1.28.058 1.689.07 4.948.07s3.668-.012 4.948-.07c1.279-.058 2.459-.318 3.452-1.31.993-.993 1.253-2.173 1.31-3.452.058-1.28.07-1.689.07-4.948s-.012-3.668-.07-4.948c-.058-1.279-.318-2.459-1.31-3.452-.993-.993-2.173-1.253-3.452-1.31C15.668.012 15.259 0 12 0z" />
                  ),
                },
                {
                  label: "X",
                  href: "https://twitter.com",
                  icon: (
                    <path d="M24 4.557a9.828 9.828 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.868 9.868 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.39 4.482A13.978 13.978 0 0 1 1.671 3.149a4.922 4.922 0 0 0 1.523 6.573 4.902 4.902 0 0 1-2.229-.616v.06a4.924 4.924 0 0 0 3.946 4.827 4.935 4.935 0 0 1-2.224.084 4.926 4.926 0 0 0 4.6 3.417A9.868 9.868 0 0 1 0 19.54a13.945 13.945 0 0 0 7.548 2.212c9.056 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.014-.634A10.012 10.012 0 0 0 24 4.557z" />
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                             transition cursor-pointer hover:bg-[#DB005B] hover:border-[#DB005B]"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-extrabold text-white">Shop</h4>
              <ul className="mt-4 space-y-2 text-white/75">
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=all">All Products</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=skincare">Skincare</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=makeup">Makeup</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=haircare">Haircare</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=fragrance">Fragrance</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-white">Company</h4>
              <ul className="mt-4 space-y-2 text-white/75">
                <li><Link className="hover:text-[#DB005B] transition" href="/">Home</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=all">Shop</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=all">New Arrivals</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-white">Support</h4>
              <ul className="mt-4 space-y-2 text-white/75">
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=all">Help Center</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=all">Shipping</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=all">Returns</Link></li>
                <li><Link className="hover:text-[#DB005B] transition" href="/category?cat=all">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
<div className="mt-12 border-t border-white/10 pt-6 flex items-center justify-center text-sm text-white/70 text-center">
  <div>
    © {new Date().getFullYear()} BeautyBar. All rights reserved.
  </div>
</div>

      </div>
    </footer>
  );
}
