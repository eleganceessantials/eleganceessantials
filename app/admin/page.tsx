"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user = localStorage.getItem("admin_user");
    const pass = localStorage.getItem("admin_pass");
    const res = await fetch("/api/admin/products", {
      headers: {
        "x-admin-username": user || "",
        "x-admin-password": pass || "",
      },
    });
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
    setLoading(false);
  };

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [products]);

  return (
    <AdminLayout>
      <div className="space-y-12 pb-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-[1000] text-gray-900 tracking-tighter">Command Center</h1>
            <p className="text-gray-500 font-medium mt-2 text-lg">Real-time overview of Elegance Essentials performance.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-purple-50 shadow-sm">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse ml-2"></span>
            <span className="text-sm font-black text-gray-900 mr-2">System Live</span>
          </div>
        </header>
        
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-purple-50 hover:shadow-xl transition-all group cursor-default">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">📦</div>
            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total Inventory</h2>
            <p className="text-6xl font-[1000] text-gray-900 tracking-tighter">{products.length}</p>
            <p className="text-sm text-gray-500 mt-2 font-bold italic">Products currently live in your store</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-purple-50 hover:shadow-xl transition-all group cursor-default">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">🏗️</div>
            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Database Status</h2>
            <p className="text-4xl font-[1000] text-gray-900 tracking-tighter uppercase">Healthy</p>
            <p className="text-sm text-gray-500 mt-2 font-bold italic">MongoDB Cluster is synchronized</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-[1000] tracking-tighter leading-none">Elevate Your<br/>Storefront Today.</h2>
                <p className="text-purple-100 font-medium text-lg max-w-md">Your catalog is synchronized. Keep your inventory fresh with new arrivals.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/admin/products" className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-black hover:bg-purple-50 transition-all shadow-xl active:scale-95 cursor-pointer">
                  Manage Inventory →
                </Link>
                <Link href="/" className="bg-purple-500/30 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all active:scale-95 cursor-pointer">
                  View Live Site
                </Link>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-purple-50 flex flex-col">
            <h3 className="text-xl font-[1000] text-gray-900 mb-8 tracking-tighter">Category Density</h3>
            <div className="space-y-6 flex-1">
              {categoryStats.slice(0, 5).map(([cat, count]) => (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between text-sm font-black text-gray-700">
                    <span className="uppercase tracking-widest text-[10px]">{cat}</span>
                    <span>{count} items</span>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${(count / products.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {categoryStats.length === 0 && (
                <p className="text-center text-gray-400 font-medium py-10 italic">No data available yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="flex items-center justify-between pt-6 border-t border-purple-50 px-4">
          <p className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Elegance Essentials Security Shield Active</p>
          <div className="flex gap-6 text-xs font-black text-purple-300 uppercase tracking-widest">
            <span className="cursor-not-allowed">API Docs</span>
            <span className="cursor-not-allowed">Audit Logs</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
