"use client";

import React from "react";

export default function ContactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3.5rem] bg-[#0b0b0b] text-white">
          {/* Background Glow */}
          <div className="absolute top-[-12rem] right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-[#DB005B]/20 blur-[130px]" />
          <div className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-white/5 blur-[110px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center p-8 sm:p-12 lg:p-16">
            {/* Left Content */}
            <div>
              <div className="mb-6 flex items-start gap-4">
                <span className="mt-2 h-12 w-1.5 rounded-full bg-[#DB005B]" />
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
                  Need Help
                  <br />
                  Choosing?
                </h2>
              </div>

              <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-white/65">
                Our beauty experts are just a message away. Get personalized
                routine advice and order support instantly.
              </p>
            </div>

            {/* Right Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <a
                href="https://wa.me/923114051542"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 sm:p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#DB005B]/50 hover:bg-white/[0.09]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DB005B]/15 text-2xl">
                  💬
                </div>

                <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#DB005B]">
                  WhatsApp
                </p>

                <p className="text-2xl sm:text-3xl font-black tracking-tight">
                  0311 4051542
                </p>

                <p className="mt-3 text-sm text-white/45">
                  Primary Support & Orders
                </p>
              </a>

              <a
                href="mailto:Supporteleganceessantials@gmail.com"
                className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 sm:p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#DB005B]/50 hover:bg-white/[0.09]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DB005B]/15 text-2xl">
                  ✉️
                </div>

                <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#DB005B]">
                  Email
                </p>

                <p className="text-lg sm:text-xl font-black leading-snug break-all">
                  Supporteleganceessantials@gmail.com
                </p>

                <p className="mt-3 text-sm text-white/45">
                  Support & Queries
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}