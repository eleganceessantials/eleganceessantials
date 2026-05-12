"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "@/app/components/cartdrawer";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/category?cat=all" },
    { name: "Contact", link: "/contact" },
  ];

  const go = (link: string) => {
    router.push(link);
    setMobileMenu(false);
  };

  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    if (link.startsWith("/category")) return pathname === "/category";
    if (link.startsWith("/contact")) return pathname === "/contact";
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-4 rounded-full border border-white/70 bg-white/90 shadow-[0_12px_35px_rgba(219,0,91,0.12)] backdrop-blur-xl">
            <div className="flex h-[68px] items-center justify-between px-4 sm:px-5">
              {/* Logo */}
              <button
                type="button"
                onClick={() => go("/")}
                className="flex items-center gap-3 cursor-pointer"
                aria-label="Go to homepage"
              >
                <img
                  src="/logo.png"
                  alt="Elegance Essentials Logo"
                  className="h-11 w-11 rounded-full object-cover bg-white p-1 shadow-sm"
                />

                <span className="hidden sm:block text-xl font-black tracking-tight text-black">
                  Elegance Essentials
                  <span className="text-[#DB005B]">.</span>
                </span>
              </button>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-2">
                {menuItems.map((item) => {
                  const active = isActive(item.link);

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => go(item.link)}
                      className={`rounded-full px-5 py-2.5 text-sm font-extrabold transition cursor-pointer ${
                        active
                          ? "bg-[#DB005B] text-white shadow-[0_10px_22px_rgba(219,0,91,0.25)]"
                          : "text-black/70 hover:bg-[#FCF8F8] hover:text-[#DB005B]"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                {/* Cart */}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#FCF8F8] text-[#DB005B] transition hover:bg-[#DB005B] hover:text-white cursor-pointer"
                  aria-label="Open cart"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h8.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>

                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs font-black text-white">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Toggle */}
                <button
                  type="button"
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FCF8F8] text-[#DB005B] transition hover:bg-[#DB005B] hover:text-white cursor-pointer md:hidden"
                  aria-label="Toggle menu"
                >
                  {mobileMenu ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12" />
                      <path d="M18 6L6 18" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <path d="M4 7h16" />
                      <path d="M4 12h16" />
                      <path d="M4 17h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`grid transition-all duration-300 md:hidden ${
                mobileMenu
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-pink-100 px-4 pb-4 pt-3">
                  <div className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                      const active = isActive(item.link);

                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => go(item.link)}
                          className={`rounded-2xl px-4 py-3 text-left font-extrabold transition cursor-pointer ${
                            active
                              ? "bg-[#DB005B] text-white"
                              : "bg-[#FCF8F8] text-black/75 hover:text-[#DB005B]"
                          }`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}