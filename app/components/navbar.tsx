"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "@/app/components/cartdrawer";

export default function Navbar() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/category" },
  ];

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-transform duration-300 backdrop-blur-md bg-white/30 shadow-md border-b border-pink-100 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
          {/* Logo + Name */}
          <div
            className="flex items-center cursor-pointer gap-2"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white font-bold text-lg rounded-full shadow-sm">
              BB
            </div>
            <span className="font-bold text-xl tracking-wide hover:text-pink-400 transition">
              BeautyBar.
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.link)}
                className="hover:text-pink-400 transition font-medium"
              >
                {item.name}
              </button>
            ))}

            {/* Cart Button (Desktop) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative hover:text-pink-400 transition text-lg"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="absolute top-16 right-0 bg-white w-full flex flex-col items-start p-4 space-y-2 md:hidden border-t border-pink-100 shadow-md">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.link);
                    setMobileMenu(false);
                  }}
                  className="hover:text-pink-400 transition py-1"
                >
                  {item.name}
                </button>
              ))}

              {/* Cart Button (Mobile) */}
              <button
                onClick={() => {
                  setDrawerOpen(true);
                  setMobileMenu(false);
                }}
                className="relative mt-2 hover:text-pink-400 transition py-1"
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        // className removed to avoid error
      />
    </>
  );
}
