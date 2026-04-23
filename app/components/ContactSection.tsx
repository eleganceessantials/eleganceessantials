"use client";

import React from "react";

export default function ContactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0b0b0b] rounded-[3.5rem] p-12 sm:p-16 relative overflow-hidden text-white">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#DB005B]/10 rounded-full blur-[120px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] -ml-20 -mb-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-1.5 rounded-full bg-[#DB005B]" />
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">
                  Need Help Choosing?
                </h2>
              </div>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
                Our beauty experts are just a message away. Get personalized routine advice and order support instantly.
              </p>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/923334471403" 
                  target="_blank"
                  className="px-8 py-4 bg-[#DB005B] text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#DB005B] transition-all flex items-center gap-3"
                >
                  Chat with Expert <span>💬</span>
                </a>
                <a 
                  href="tel:03334471403"
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all flex items-center gap-3"
                >
                  Voice Call <span>📞</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <p className="text-[#DB005B] font-bold text-sm uppercase tracking-widest mb-2">WhatsApp 1</p>
                <p className="text-2xl font-black">0333-4471403</p>
                <p className="text-white/40 text-sm mt-2">Primary Support & Orders</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <p className="text-[#DB005B] font-bold text-sm uppercase tracking-widest mb-2">WhatsApp 2</p>
                <p className="text-2xl font-black">0308-4243437</p>
                <p className="text-white/40 text-sm mt-2">Delivery & Queries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
