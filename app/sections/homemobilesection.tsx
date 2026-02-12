"use client";

import { products } from "../data/productListing";
import ProductCard from "../components/productcard";

export default function HomeMobileSection() {
  // Filter products by category "mobile"
  const mobileProducts = products.filter(
    (product) => product.category === "smartphone"
  );

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        Mobile Phones
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mobileProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}






