"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_user", username);
    localStorage.setItem("admin_pass", password);
    localStorage.setItem("admin_auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_pass");
    setIsAuthenticated(false);
    setSidebarOpen(false);
    router.push("/admin");
  };

  const isActive = (href: string) => pathname === href;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 sm:p-6 font-sans">
        <div className="bg-white w-full max-w-lg border border-purple-100/50 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-5 py-8 sm:p-12 flex flex-col items-center animate-in zoom-in-95 duration-500">
          <div className="relative group mb-6 sm:mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="/logo.png"
              alt="Logo"
              className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full shadow-2xl object-cover border-4 border-white"
            />
          </div>

          <h1 className="text-2xl sm:text-4xl font-[900] text-gray-900 mb-2 text-center tracking-tight leading-tight">
            Elegance Essentials
          </h1>
          <p className="text-gray-400 mb-8 sm:mb-10 text-center text-sm sm:text-base font-medium">
            Restricted Administrative Access
          </p>

          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6 w-full">
            <div className="space-y-2 group">
              <label className="text-[11px] font-black text-purple-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-purple-600 transition-colors">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] sm:rounded-[1.5rem] focus:bg-white focus:border-purple-200 outline-none transition-all text-gray-800 placeholder-gray-300 font-semibold text-base sm:text-lg cursor-text"
                placeholder="Admin username"
                required
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[11px] font-black text-purple-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-purple-600 transition-colors">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] sm:rounded-[1.5rem] focus:bg-white focus:border-purple-200 outline-none transition-all text-gray-800 placeholder-gray-300 font-semibold text-base sm:text-lg cursor-text"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white py-4 sm:py-5 rounded-[1.25rem] sm:rounded-[1.5rem] font-black text-base sm:text-lg hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] transition-all active:scale-[0.97] mt-4 sm:mt-6 cursor-pointer"
            >
              Unlock Dashboard
            </button>

            <Link
              href="/"
              className="block text-center text-sm font-bold text-gray-400 hover:text-purple-600 transition-all cursor-pointer mt-3 sm:mt-4"
            >
              ← Back to Storefront
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-[86%] max-w-[320px] md:w-80 bg-white border-r border-purple-50 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.06)] md:shadow-[10px_0_30px_rgba(0,0,0,0.02)] transform transition-transform duration-300 ease-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="p-5 sm:p-6 md:p-10 flex flex-col items-center border-b border-purple-50/50 relative">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg font-bold cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>

          <Link
            href="/admin"
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className="relative mb-4 md:mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img
                src="/logo.png"
                alt="Logo"
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-md object-cover border-2 border-white"
              />
            </div>
            <span className="text-lg md:text-xl font-[1000] bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent text-center leading-[1.1] tracking-tighter">
              Elegance
              <br />
              Essentials
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 sm:p-5 md:p-8 space-y-2 md:space-y-3 overflow-y-auto">
          <p className="text-[10px] font-[900] text-purple-300 uppercase tracking-[0.25em] mb-4 md:mb-6 ml-3 md:ml-4">
            Management
          </p>

          <Link
            href="/admin"
            className={`flex items-center space-x-4 px-4 md:px-5 py-3.5 md:py-4 rounded-[1.1rem] md:rounded-[1.25rem] transition-all font-bold group cursor-pointer active:scale-[0.98] ${isActive("/admin")
                ? "bg-purple-50 text-purple-700"
                : "text-gray-500 hover:bg-purple-50 hover:text-purple-700"
              }`}
          >
            <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">
              📈
            </span>
            <span className="tracking-tight">Dashboard</span>
          </Link>

          <Link
            href="/admin/products"
            className={`flex items-center space-x-4 px-4 md:px-5 py-3.5 md:py-4 rounded-[1.1rem] md:rounded-[1.25rem] transition-all font-bold group cursor-pointer active:scale-[0.98] ${isActive("/admin/products")
                ? "bg-purple-50 text-purple-700"
                : "text-gray-500 hover:bg-purple-50 hover:text-purple-700"
              }`}
          >
            <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">
              📦
            </span>
            <span className="tracking-tight">Inventory</span>
          </Link>

          <Link
            href="/admin/categories"
            className={`flex items-center space-x-4 px-4 md:px-5 py-3.5 md:py-4 rounded-[1.1rem] md:rounded-[1.25rem] transition-all font-bold group cursor-pointer active:scale-[0.98] ${isActive("/admin/categories")
                ? "bg-purple-50 text-purple-700"
                : "text-gray-500 hover:bg-purple-50 hover:text-purple-700"
              }`}
          >
            <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">
              📁
            </span>
            <span className="tracking-tight">Categories</span>
          </Link>

          <div className="pt-6 md:pt-10">
            <p className="text-[10px] font-[900] text-purple-300 uppercase tracking-[0.25em] mb-4 md:mb-6 ml-3 md:ml-4">
              Shortcut
            </p>

            <Link
              href="/"
              className="flex items-center space-x-4 px-4 md:px-5 py-3.5 md:py-4 rounded-[1.1rem] md:rounded-[1.25rem] hover:bg-indigo-50 text-gray-500 hover:text-indigo-700 transition-all font-bold group cursor-pointer active:scale-[0.98]"
            >
              <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                🌐
              </span>
              <span className="tracking-tight">Live Store</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 sm:p-5 md:p-8 mt-auto border-t border-purple-50/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3.5 md:py-4 text-sm font-black text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-[1.1rem] md:rounded-[1.25rem] transition-all active:scale-[0.96] shadow-sm hover:shadow-rose-100 cursor-pointer"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main wrapper */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100 px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 text-xl font-bold hover:bg-purple-100 transition cursor-pointer"
            aria-label="Open menu"
          >
            ☰
          </button>

          <Link href="/admin" className="flex items-center gap-3 min-w-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-xl object-cover border border-purple-100"
            />
            <div className="min-w-0">
              <p className="text-sm font-black text-gray-900 leading-tight truncate">
                Elegance Essentials
              </p>
              <p className="text-[11px] text-gray-400 font-semibold">
                Admin Panel
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 text-lg hover:bg-rose-100 transition cursor-pointer"
            aria-label="Sign out"
          >
            🚪
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-5 md:p-14 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}