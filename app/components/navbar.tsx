"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">
          <div className="mt-3 overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_12px_35px_rgba(219,0,91,0.12)] backdrop-blur-xl sm:mt-4 sm:rounded-full md:overflow-visible">
            <div className="flex h-[62px] items-center justify-between px-3 sm:h-[68px] sm:px-5">
              {/* Logo */}
              <button
                type="button"
                onClick={() => go("/")}
                className="flex min-w-0 flex-1 items-center gap-2.5 cursor-pointer md:flex-none md:gap-3"
                aria-label="Go to homepage"
              >
                <img
                  src="/logo.png"
                  alt="Elegance Essentials Logo"
                  className="h-10 w-10 shrink-0 rounded-full bg-white object-cover p-1 shadow-sm sm:h-11 sm:w-11"
                />

                <span className="block max-w-[150px] truncate text-[16px] font-black tracking-tight text-black xs:max-w-[190px] sm:max-w-none sm:text-xl">
                  Elegance Essentials
                  <span className="text-[#DB005B]">.</span>
                </span>
              </button>

              {/* Desktop Menu */}
              <div className="hidden items-center gap-2 md:flex">
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
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {/* Cart */}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FCF8F8] text-[#DB005B] transition hover:bg-[#DB005B] hover:text-white cursor-pointer sm:h-11 sm:w-11"
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
                  onClick={() => setMobileMenu((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCF8F8] text-[#DB005B] transition hover:bg-[#DB005B] hover:text-white cursor-pointer sm:h-11 sm:w-11 md:hidden"
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenu}
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
              className={`grid transition-all duration-300 ease-out md:hidden ${
                mobileMenu
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-pink-100 px-3 pb-4 pt-3 sm:px-4">
                  <div className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                      const active = isActive(item.link);

                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => go(item.link)}
                          className={`w-full rounded-2xl px-4 py-3.5 text-left text-[15px] font-extrabold transition cursor-pointer ${
                            active
                              ? "bg-[#DB005B] text-white shadow-[0_10px_20px_rgba(219,0,91,0.18)]"
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

        {/* Mobile backdrop */}
        {mobileMenu && (
          <button
            type="button"
            aria-label="Close mobile menu"
            onClick={() => setMobileMenu(false)}
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-[2px] md:hidden"
          />
        )}
      </nav>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}