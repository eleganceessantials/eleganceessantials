"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function formatLabel(value: string) {
  if (!value || value === "all") return "All Products";
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryHero() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat") || "all";

  const title = formatLabel(category);

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/shophero2.png"
          alt="Beauty Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay WITHOUT blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 text-white">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Link href="/" className="transition hover:opacity-100">
              Home
            </Link>

            <span>/</span>

            <Link href="/category?cat=all" className="transition hover:opacity-100">
              Category
            </Link>

            <span>/</span>

            <span className="font-medium opacity-100">{title}</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-xl text-white/90">
            Discover premium {title.toLowerCase()} products curated just for you.
          </p>
        </div>
      </div>
    </section>
  );
}