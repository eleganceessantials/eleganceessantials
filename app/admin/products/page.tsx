"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState, useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function ManageProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: 0,
    discountPrice: "",
    category: "SkinCare",
    image: "",
    description: "",
  });

  const categories = ["SkinCare", "Makeup", "HairCare", "Fragrance"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
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
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = localStorage.getItem("admin_user");
    const pass = localStorage.getItem("admin_pass");

    const payload = {
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
    };

    const url = "/api/admin/products";
    const method = editingProduct ? "PUT" : "POST";
    const body = editingProduct ? { ...payload, _id: editingProduct._id } : payload;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-username": user || "",
        "x-admin-password": pass || "",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        slug: "",
        price: 0,
        discountPrice: "",
        category: "SkinCare",
        image: "",
        description: "",
      });
      fetchProducts();
    } else {
      alert("Failed to save product.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const user = localStorage.getItem("admin_user");
    const pass = localStorage.getItem("admin_pass");

    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-username": user || "",
        "x-admin-password": pass || "",
      },
      body: JSON.stringify({ ids: [id] }),
    });

    if (res.ok) fetchProducts();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} products?`)) return;

    const user = localStorage.getItem("admin_user");
    const pass = localStorage.getItem("admin_pass");

    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-username": user || "",
        "x-admin-password": pass || "",
      },
      body: JSON.stringify({ ids: selectedIds }),
    });

    if (res.ok) {
      setSelectedIds([]);
      fetchProducts();
    }
  };

  const openEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price,
      discountPrice: product.discountPrice || "",
      category: product.category,
      image: product.image,
      description: product.description,
    });
    setIsModalOpen(true);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCloudinaryUpload = () => {
    if (!window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ddp6pvkq6",
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default",
        sources: ["local", "url", "camera"],
        multiple: false,
        theme: "minimal",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setFormData((prev) => ({ ...prev, image: result.info.secure_url }));
        }
      }
    );
    widget.open();
  };

  return (
    <AdminLayout>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Manage Inventory</h1>
          <p className="text-gray-500 font-medium mt-1">Add, update, or remove products from your catalog.</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          {selectedIds.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="bg-rose-50 text-rose-600 border border-rose-100 px-6 py-4 rounded-2xl font-bold hover:bg-rose-100 transition-all flex items-center space-x-2"
            >
              <span>🗑️</span>
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}
          <button 
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                name: "",
                slug: "",
                price: 0,
                discountPrice: "",
                category: "SkinCare",
                image: "",
                description: "",
              });
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-100 transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>✨</span>
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-purple-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-purple-50/30 border-b border-purple-50">
                <th className="p-6 w-10">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(products.map(p => p._id));
                      else setSelectedIds([]);
                    }}
                    checked={selectedIds.length === products.length && products.length > 0}
                  />
                </th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Product Details</th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Category</th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Pricing</th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-purple-50/20 transition-colors group">
                  <td className="p-6">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      checked={selectedIds.includes(product._id)}
                      onChange={() => toggleSelect(product._id)}
                    />
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-purple-100 shadow-sm">
                        <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{product.name}</span>
                        <span className="text-xs text-gray-400 font-medium">/{product.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-black uppercase tracking-tight">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-6">
                    {product.discountPrice ? (
                      <div className="flex flex-col">
                        <span className="text-purple-600 font-black text-base">Rs. {product.discountPrice}</span>
                        <span className="text-gray-300 line-through text-[11px] font-bold italic">Rs. {product.price}</span>
                      </div>
                    ) : (
                      <span className="text-gray-900 font-bold text-base">Rs. {product.price}</span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => openEdit(product)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-colors font-bold text-sm">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors font-bold text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-3xl shadow-[0_30px_100px_rgba(0,0,0,0.25)] overflow-y-auto max-h-[90vh] border border-gray-100">
            <div className="flex justify-between items-center mb-10">
              <div className="space-y-1">
                <h2 className="text-3xl font-[1000] text-gray-900 tracking-tighter">
                  {editingProduct ? "Update Product" : "Create New Product"}
                </h2>
                <p className="text-gray-500 text-sm font-medium">Please fill in all the required details below.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer active:scale-90"
              >
                <span className="text-xl font-bold">✕</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">Product Title</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-gray-900 font-bold placeholder-gray-300"
                  placeholder="e.g. Vitamin C Serum"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">URL Slug</label>
                <input 
                  type="text" required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-gray-900 font-bold"
                  placeholder="vitamin-c-serum"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">Category</label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-gray-900 font-bold appearance-none cursor-pointer"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">Price (PKR)</label>
                <input 
                  type="number" required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-gray-900 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">Discount Price (Optional)</label>
                <input 
                  type="number"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-purple-600 font-bold"
                  placeholder="Leave empty if none"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">Product Visual</label>
                <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-purple-200 transition-all">
                  <div className="relative w-24 h-24 rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm flex items-center justify-center shrink-0">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl grayscale opacity-30">🖼️</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      {formData.image ? "Image uploaded successfully!" : "No image selected"}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      High resolution images work best.
                    </p>
                    <button 
                      type="button" 
                      onClick={handleCloudinaryUpload}
                      className="mt-1 flex items-center justify-center space-x-2 text-xs font-black text-white bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition-all shadow-md shadow-purple-100 cursor-pointer active:scale-95"
                    >
                      <span>☁️</span>
                      <span>{formData.image ? "Change Image" : "Upload to Cloudinary"}</span>
                    </button>
                    {/* Hidden input for validation */}
                    <input type="hidden" required value={formData.image} name="image_hidden" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">Description</label>
                <textarea 
                  required rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-gray-900 font-medium min-h-[120px]"
                  placeholder="Write a compelling product description..."
                ></textarea>
              </div>

              <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-4 pt-8 mt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-8 py-4 text-gray-500 hover:text-gray-800 font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-purple-100 hover:shadow-purple-200 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {editingProduct ? "💾 Save Changes" : "✨ Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
