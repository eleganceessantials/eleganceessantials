"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "@/app/components/cartdrawer";

export default function Navbar() {
  const router = useRouter();
  const { cartCount } = useCart();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/category?cat=all" },
  ];

  const go = (link: string) => {
    router.push(link);
    setMobileMenu(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-3 mb-2 rounded-2xl border border-pink-200 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="flex h-16 items-center justify-between px-4">

              {/* Logo */}
              <div
                className="flex items-center cursor-pointer gap-3"
                onClick={() => go("/")}
              >
                <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                <span className="font-extrabold text-xl tracking-tight text-[#DB005B] cursor-pointer">
                  Elegance Essentials<span className="text-black">.</span>
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => go(item.link)}
                    className="font-semibold text-[#DB005B] hover:opacity-80 transition cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}

                {/* Cart Button */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="relative rounded-full px-3 py-2 hover:bg-pink-50 transition cursor-pointer"
                  aria-label="Open cart"
                >
                  <span className="text-lg text-[#DB005B]">🛒</span>

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#DB005B] text-white rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-xs font-bold shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Right */}
              <div className="md:hidden flex items-center gap-2">
                {/* Cart */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="relative rounded-full px-3 py-2 hover:bg-pink-50 transition cursor-pointer"
                  aria-label="Open cart"
                >
                  <span className="text-lg text-[#DB005B]">🛒</span>

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#DB005B] text-white rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-xs font-bold shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Menu Toggle */}
                <button
                  className="rounded-full px-3 py-2 hover:bg-pink-50 transition text-xl text-[#DB005B] cursor-pointer"
                  onClick={() => setMobileMenu(!mobileMenu)}
                  aria-label="Toggle menu"
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
              <div className="md:hidden px-4 pb-4">
                <div className="rounded-2xl border border-pink-200 bg-white shadow-sm p-3 flex flex-col gap-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => go(item.link)}
                      className="w-full text-left px-3 py-2 rounded-xl font-semibold text-[#DB005B] hover:bg-pink-50 transition cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setDrawerOpen(true);
                      setMobileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl font-semibold text-[#DB005B] hover:bg-pink-50 transition cursor-pointer"
                  >
                    Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
