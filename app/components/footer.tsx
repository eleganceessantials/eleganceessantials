"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-white via-pink-50 to-white text-black pt-12 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

          {/* Logo & Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">

              {/* Logo */}
              <div className="w-12 h-12 flex items-center justify-center bg-black text-white font-bold text-xl rounded-full shadow-md">
                BB
              </div>

              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-black bg-clip-text text-transparent">
                BeautyBar.
              </span>
            </div>

            <p className="text-gray-600 max-w-md">
              Discover premium beauty products, skincare essentials, and exclusive offers curated just for you.
            </p>

            {/* Social Icons */}
            <div className="flex gap-6 mt-4 text-2xl">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.335 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.773.127 4.593.387 3.6 1.38 2.607 2.373 2.347 3.553 2.29 4.832.232 8.332.22 8.741.22 12s.012 3.668.07 4.948c.058 1.279.318 2.459 1.31 3.452.993.993 2.173 1.253 3.452 1.31 1.28.058 1.689.07 4.948.07s3.668-.012 4.948-.07c1.279-.058 2.459-.318 3.452-1.31.993-.993 1.253-2.173 1.31-3.452.058-1.28.07-1.689.07-4.948s-.012-3.668-.07-4.948c-.058-1.279-.318-2.459-1.31-3.452-.993-.993-2.173-1.253-3.452-1.31C15.668.012 15.259 0 12 0z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.828 9.828 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.868 9.868 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.39 4.482A13.978 13.978 0 0 1 1.671 3.149a4.922 4.922 0 0 0 1.523 6.573 4.902 4.902 0 0 1-2.229-.616v.06a4.924 4.924 0 0 0 3.946 4.827 4.935 4.935 0 0 1-2.224.084 4.926 4.926 0 0 0 4.6 3.417A9.868 9.868 0 0 1 0 19.54a13.945 13.945 0 0 0 7.548 2.212c9.056 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.014-.634A10.012 10.012 0 0 0 24 4.557z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-pink-100 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BeautyBar. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
