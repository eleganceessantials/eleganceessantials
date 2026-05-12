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
    <section className="relative min-h-[58vh] overflow-hidden sm:min-h-[70vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/shophero2.png"
          alt="Beauty Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-center"
        />

        {/* Overlay WITHOUT blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 sm:from-black/55 sm:via-black/25 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent sm:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-7xl items-center px-4 pt-20 text-white sm:min-h-[70vh] sm:px-6 sm:pt-0">
        <div className="max-w-[92%] sm:max-w-none">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs opacity-90 sm:text-sm">
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
          <h1 className="mt-5 max-w-[280px] text-3xl font-extrabold leading-tight sm:mt-6 sm:max-w-none sm:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-[290px] text-sm leading-6 text-white/90 sm:max-w-xl sm:text-base">
            Discover premium {title.toLowerCase()} products curated just for you.
          </p>
        </div>
      </div>
    </section>
  );
}