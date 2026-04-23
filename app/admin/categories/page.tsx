"use client";

import AdminLayout from "@/app/components/AdminLayout";
import { useState, useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function ManageCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const user = localStorage.getItem("admin_user");
      const pass = localStorage.getItem("admin_pass");

      const res = await fetch("/api/admin/categories", {
        headers: {
          "x-admin-username": user || "",
          "x-admin-password": pass || "",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = localStorage.getItem("admin_user");
    const pass = localStorage.getItem("admin_pass");

    const url = "/api/admin/categories";
    const method = editingCategory ? "PUT" : "POST";
    const body = editingCategory
      ? { ...formData, _id: editingCategory._id }
      : formData;

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
      setEditingCategory(null);
      setFormData({
        name: "",
        value: "",
        image: "",
      });
      fetchCategories();
    } else {
      alert("Failed to save category.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This might affect products using this category.")) {
      return;
    }

    const user = localStorage.getItem("admin_user");
    const pass = localStorage.getItem("admin_pass");

    const res = await fetch("/api/admin/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-username": user || "",
        "x-admin-password": pass || "",
      },
      body: JSON.stringify({ ids: [id] }),
    });

    if (res.ok) fetchCategories();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} categories?`)) return;

    const user = localStorage.getItem("admin_user");
    const pass = localStorage.getItem("admin_pass");

    const res = await fetch("/api/admin/categories", {
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
      fetchCategories();
    }
  };

  const openEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      value: category.value,
      image: category.image,
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      value: "",
      image: "",
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
        cloudName:
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ddp6pvkq6",
        uploadPreset:
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default",
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
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        strategy="lazyOnload"
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 md:mb-10">
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Manage Categories
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-sm sm:text-base">
            Organize your store by creating and managing categories.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-black">
              Total: {categories.length}
            </span>

            {selectedIds.length > 0 && (
              <span className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black">
                Selected: {selectedIds.length}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-rose-50 text-rose-600 border border-rose-100 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-bold hover:bg-rose-100 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>🗑️</span>
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}

          <button
            onClick={openCreateModal}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-100 transition-all active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>✨</span>
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-purple-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-purple-50/30 border-b border-purple-50">
                <th className="p-6 w-10">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(categories.map((c) => c._id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    checked={
                      selectedIds.length === categories.length &&
                      categories.length > 0
                    }
                  />
                </th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">
                  Category Details
                </th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">
                  Value (Slug)
                </th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-purple-50">
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="hover:bg-purple-50/20 transition-colors group"
                >
                  <td className="p-6">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      checked={selectedIds.includes(category._id)}
                      onChange={() => toggleSelect(category._id)}
                    />
                  </td>

                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-purple-100 shadow-sm bg-gray-50 shrink-0">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <span className="font-bold text-gray-900">
                        {category.name}
                      </span>
                    </div>
                  </td>

                  <td className="p-6">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-black uppercase tracking-tight">
                      {category.value}
                    </span>
                  </td>

                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => openEdit(category)}
                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-colors font-bold text-sm cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors font-bold text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-20 text-center text-gray-400 font-medium italic"
                  >
                    No categories found. Add your first category to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        <div className="bg-white rounded-[2rem] border border-purple-50 shadow-sm p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-gray-900">
                Category List
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Manage categories quickly on mobile
              </p>
            </div>

            <div className="shrink-0">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(categories.map((c) => c._id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
                checked={
                  selectedIds.length === categories.length &&
                  categories.length > 0
                }
              />
            </div>
          </div>
        </div>

        {categories.length === 0 && (
          <div className="bg-white rounded-[2rem] border border-purple-50 shadow-sm p-8 text-center text-gray-400 font-medium italic">
            No categories found. Add your first category to get started.
          </div>
        )}

        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-[2rem] border border-purple-50 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-purple-50">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 shrink-0"
                  checked={selectedIds.includes(category._id)}
                  onChange={() => toggleSelect(category._id)}
                />

                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-purple-100 bg-gray-50 shrink-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-gray-900 text-sm leading-snug">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium break-all mt-1">
                    {category.value}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="bg-gray-50 rounded-2xl p-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">
                  Value (Slug)
                </p>
                <p className="text-sm font-bold text-indigo-600 break-all">
                  {category.value}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => openEdit(category)}
                  className="flex-1 py-3 rounded-2xl bg-indigo-50 text-indigo-600 font-black text-sm hover:bg-indigo-100 transition-all cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category._id)}
                  className="flex-1 py-3 rounded-2xl bg-rose-50 text-rose-600 font-black text-sm hover:bg-rose-100 transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-12 w-full max-w-2xl shadow-[0_30px_100px_rgba(0,0,0,0.25)] overflow-y-auto max-h-[90vh] border border-gray-100">
            <div className="flex justify-between items-start gap-4 mb-8 md:mb-10">
              <div className="space-y-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-[1000] text-gray-900 tracking-tighter leading-tight">
                  {editingCategory ? "Update Category" : "Create New Category"}
                </h2>
                <p className="text-gray-500 text-sm font-medium">
                  Please fill in the category details.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer active:scale-90 shrink-0"
              >
                <span className="text-xl font-bold">✕</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-gray-900 font-bold placeholder-gray-300"
                  placeholder="e.g. Skin Care"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">
                  Value (Slug)
                </label>
                <input
                  type="text"
                  required
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      value: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-purple-200 transition-all text-gray-900 font-bold placeholder-gray-300"
                  placeholder="e.g. skin-care"
                />
                <p className="text-[10px] text-gray-400 font-medium ml-1">
                  Used in URLs and filtering.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-[900] text-gray-800 uppercase tracking-[0.2em] ml-1">
                  Category Image
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-purple-200 transition-all">
                  <div className="relative w-24 h-24 rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm flex items-center justify-center shrink-0">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl grayscale opacity-30">📁</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-sm font-bold text-gray-900">
                      {formData.image
                        ? "Image uploaded successfully!"
                        : "No image selected"}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Upload a clean category image for better presentation.
                    </p>

                    <button
                      type="button"
                      onClick={handleCloudinaryUpload}
                      className="inline-flex items-center justify-center space-x-2 text-xs font-black text-white bg-purple-600 px-5 sm:px-6 py-3 rounded-xl hover:bg-purple-700 transition-all shadow-md shadow-purple-100 cursor-pointer active:scale-95 w-full sm:w-fit"
                    >
                      <span>☁️</span>
                      <span>{formData.image ? "Change Image" : "Upload Image"}</span>
                    </button>

                    <input type="hidden" required value={formData.image} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 mt-2 sm:mt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 text-gray-500 hover:text-gray-800 font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-purple-100 hover:shadow-purple-200 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {editingCategory ? "💾 Save Changes" : "✨ Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}