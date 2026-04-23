"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[2.25rem] bg-[#0b0b0b] text-white">
      {/* Premium background (hero-like) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#DB005B]/18 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-white/8 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/85 to-black" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      {/* Extra padding so content doesn't stick to top/bottom */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand + trust */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-2xl object-cover shadow-sm bg-white p-1" />
              <div className="text-2xl font-extrabold tracking-tight">
                Elegance Essentials<span className="text-[#DB005B]">.</span>
              </div>
            </div>

            <p className="mt-4 text-white/75 max-w-md leading-relaxed">
              Premium beauty essentials curated for glow, confidence, and everyday elegance.
              Authentic products, fast delivery, and easy returns — always.
            </p>

            {/* Trust chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["100% Authentic", "Fast Delivery", "Easy Returns"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80"
                >
                  <span className="w-2 h-2 rounded-full bg-[#DB005B]" />
                  {t}
                </span>
              ))}
            </div>

            {/* Contact strip (with icons) */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <a
                  href="tel:03334471403"
                  className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#DB005B]/40 hover:bg-white/7"
                  aria-label="Call Support 1"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/85 group-hover:text-white transition" fill="currentColor">
                        <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-xs text-white/55">Call Support</div>
                      <div className="mt-0.5 font-semibold text-white/90">0333-4471403</div>
                    </div>
                  </div>
                </a>
                <a
                  href="tel:03084243437"
                  className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#DB005B]/40 hover:bg-white/7"
                  aria-label="Call Support 2"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/85 group-hover:text-white transition" fill="currentColor">
                        <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-xs text-white/55">Call Support</div>
                      <div className="mt-0.5 font-semibold text-white/90">0308-4243437</div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/923334471403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#DB005B]/40 hover:bg-white/7"
                  aria-label="WhatsApp Support 1"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                      <svg viewBox="0 0 32 32" className="h-5 w-5 text-white/85 group-hover:text-white transition" fill="currentColor">
                        <path d="M19.11 17.53c-.28-.14-1.63-.8-1.88-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.62-.47h-.53c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.03.14.19 2.03 3.1 4.93 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.53-.33z" />
                        <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.33.67 4.5 1.83 6.33L4.64 27l5.86-1.15a11.93 11.93 0 0 0 5.52 1.35c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.64 3 16.02 3zm0 21.7c-1.84 0-3.55-.5-5.03-1.38l-.36-.21-3.47.68.7-3.38-.23-.35a9.67 9.67 0 0 1-1.53-5.04c0-5.38 4.38-9.76 9.92-9.76 5.47 0 9.92 4.39 9.92 9.76 0 5.38-4.45 9.76-9.92 9.76z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-xs text-white/55">WhatsApp Chat</div>
                      <div className="mt-0.5 font-semibold text-white/90">0333-4471403</div>
                    </div>
                  </div>
                </a>
                <a
                  href="https://wa.me/923084243437"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#DB005B]/40 hover:bg-white/7"
                  aria-label="WhatsApp Support 2"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                      <svg viewBox="0 0 32 32" className="h-5 w-5 text-white/85 group-hover:text-white transition" fill="currentColor">
                        <path d="M19.11 17.53c-.28-.14-1.63-.8-1.88-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.62-.47h-.53c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.03.14.19 2.03 3.1 4.93 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.53-.33z" />
                        <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.33.67 4.5 1.83 6.33L4.64 27l5.86-1.15a11.93 11.93 0 0 0 5.52 1.35c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.64 3 16.02 3zm0 21.7c-1.84 0-3.55-.5-5.03-1.38l-.36-.21-3.47.68.7-3.38-.23-.35a9.67 9.67 0 0 1-1.53-5.04c0-5.38 4.38-9.76 9.92-9.76 5.47 0 9.92 4.39 9.92 9.76 0 5.38-4.45 9.76-9.92 9.76z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-xs text-white/55">WhatsApp Chat</div>
                      <div className="mt-0.5 font-semibold text-white/90">0308-4243437</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="mt-7 flex items-center gap-4">
              {[
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  hoverClass: "hover:bg-[#1877F2]/15 hover:border-[#1877F2]/50 hover:text-[#1877F2]",
                  icon: (
                    <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  hoverClass: "hover:bg-[#E4405F]/15 hover:border-[#E4405F]/50 hover:text-[#E4405F]",
                  icon: (
                    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </g>
                  ),
                },
                {
                  label: "TikTok",
                  href: "https://tiktok.com",
                  hoverClass: "hover:bg-white/15 hover:border-white/50 hover:text-white",
                  icon: (
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  ),
                },
                {
                  label: "X",
                  href: "https://twitter.com",
                  hoverClass: "hover:bg-white/10 hover:border-white/40 hover:text-white",
                  icon: (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`group w-11 h-11 rounded-full bg-transparent border border-white/12 flex items-center justify-center
                             transition cursor-pointer ${s.hoverClass}`}
                >
                  <svg
                    className="w-5 h-5 text-white/85 group-hover:text-inherit transition"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
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
              <ul className="mt-4 space-y-2.5 text-white/72">
                <li>
                  <Link className="hover:text-[#DB005B] transition" href="/category?cat=cleansers">
                    Cleansers
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#DB005B] transition" href="/category?cat=toners">
                    Toners
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#DB005B] transition" href="/category?cat=serums">
                    Serums
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#DB005B] transition" href="/category?cat=creams">
                    Creams
                  </Link>
                </li>
                <li className="pt-2">
                  <Link className="text-[#DB005B] font-bold hover:underline transition" href="/category?cat=all">
                    View All →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-white">Company</h4>
              <ul className="mt-4 space-y-2.5 text-white/72">
                <li>
                  <Link className="hover:text-[#DB005B] transition" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#DB005B] transition" href="/category?cat=all">
                    Collections
                  </Link>
                </li>
                {/* <li>
                  <Link className="hover:text-[#DB005B] transition" href="/admin">
                    Admin Portal
                  </Link>
                </li> */}
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-white">Support</h4>
              <ul className="mt-4 space-y-2.5 text-white/72">
                <li>
                  <Link className="hover:text-[#DB005B] transition" href="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom (no top border, extra bottom space) */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-white/65">
          © {new Date().getFullYear()} Elegance Essentials. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
