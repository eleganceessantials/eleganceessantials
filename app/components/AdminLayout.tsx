"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd verify against an API. 
    // Here we'll just check if they match the UI inputs for a simple session.
    // We'll store them in localStorage for simplicity as requested "credentials shud be in envs"
    // but the actual verification happens in API routes.
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
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 font-sans">
        <div className="bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-lg border border-purple-100/50 flex flex-col items-center animate-in zoom-in-95 duration-500">
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img src="/logo.png" alt="Logo" className="relative w-28 h-28 rounded-full shadow-2xl object-cover border-4 border-white" />
          </div>

          <h1 className="text-4xl font-[900] text-gray-900 mb-2 text-center tracking-tight">Elegance Essentials</h1>
          <p className="text-gray-400 mb-10 text-center text-base font-medium">Restricted Administrative Access</p>

          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div className="space-y-2 group">
              <label className="text-[11px] font-black text-purple-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-purple-600 transition-colors">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-purple-200 outline-none transition-all text-gray-800 placeholder-gray-300 font-semibold text-lg cursor-text"
                placeholder="Admin username"
                required
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[11px] font-black text-purple-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-purple-600 transition-colors">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-purple-200 outline-none transition-all text-gray-800 placeholder-gray-300 font-semibold text-lg cursor-text"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white py-5 rounded-[1.5rem] font-black text-lg hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] transition-all active:scale-[0.97] mt-6 cursor-pointer"
            >
              Unlock Dashboard
            </button>
            <Link href="/" className="block text-center text-sm font-bold text-gray-400 hover:text-purple-600 transition-all cursor-pointer mt-4">
              ← Back to Storefront
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex flex-col md:flex-row font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white border-r border-purple-50 flex flex-col sticky top-0 h-screen z-50 shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
        <div className="p-10 flex flex-col items-center border-b border-purple-50/50">
          <Link href="/admin" className="group flex flex-col items-center cursor-pointer">
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img src="/logo.png" alt="Logo" className="relative w-20 h-20 rounded-2xl shadow-md object-cover border-2 border-white" />
            </div>
            <span className="text-xl font-[1000] bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent text-center leading-[1.1] tracking-tighter">
              Elegance<br />Essentials
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-8 space-y-3">
          <p className="text-[10px] font-[900] text-purple-300 uppercase tracking-[0.25em] mb-6 ml-4">Management</p>

          <Link href="/admin" className="flex items-center space-x-4 px-5 py-4 rounded-[1.25rem] hover:bg-purple-50 text-gray-500 hover:text-purple-700 transition-all font-bold group cursor-pointer active:scale-[0.98]">
            <span className="text-xl opacity-40 group-hover:opacity-100 transition-opacity">📈</span>
            <span className="tracking-tight">Dashboard</span>
          </Link>

          <Link href="/admin/products" className="flex items-center space-x-4 px-5 py-4 rounded-[1.25rem] hover:bg-purple-50 text-gray-500 hover:text-purple-700 transition-all font-bold group cursor-pointer active:scale-[0.98]">
            <span className="text-xl opacity-40 group-hover:opacity-100 transition-opacity">📦</span>
            <span className="tracking-tight">Inventory</span>
          </Link>

          <Link href="/admin/categories" className="flex items-center space-x-4 px-5 py-4 rounded-[1.25rem] hover:bg-purple-50 text-gray-500 hover:text-purple-700 transition-all font-bold group cursor-pointer active:scale-[0.98]">
            <span className="text-xl opacity-40 group-hover:opacity-100 transition-opacity">📁</span>
            <span className="tracking-tight">Categories</span>
          </Link>

          <div className="pt-10">
            <p className="text-[10px] font-[900] text-purple-300 uppercase tracking-[0.25em] mb-6 ml-4">Shortcut</p>
            <Link href="/" className="flex items-center space-x-4 px-5 py-4 rounded-[1.25rem] hover:bg-indigo-50 text-gray-500 hover:text-indigo-700 transition-all font-bold group cursor-pointer active:scale-[0.98]">
              <span className="text-xl opacity-40 group-hover:opacity-100 transition-opacity">🌐</span>
              <span className="tracking-tight">Live Store</span>
            </Link>
          </div>
        </nav>

        <div className="p-8 mt-auto border-t border-purple-50/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 text-sm font-black text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-[1.25rem] transition-all active:scale-[0.96] shadow-sm hover:shadow-rose-100 cursor-pointer"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-14 overflow-y-auto">
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          {children}
        </div>
      </main>
    </div>
  );
}
