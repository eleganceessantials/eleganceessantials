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
          src="/shophero3.png"
          alt="Beauty Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[60%_center] sm:object-center"
        />

        {/* Mobile overlay - stronger on left so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/58 to-black/10 sm:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent sm:hidden" />

        {/* Desktop overlay */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-7xl items-center px-5 pt-20 text-white sm:min-h-[70vh] sm:px-6 sm:pt-0">
        <div className="max-w-[82%] sm:max-w-none">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold opacity-95 sm:text-sm">
            <Link href="/" className="transition hover:opacity-100">
              Home
            </Link>

            <span>/</span>

            <Link
              href="/category?cat=all"
              className="transition hover:opacity-100"
            >
              Category
            </Link>

            <span>/</span>

            <span className="font-bold opacity-100">{title}</span>
          </div>

          {/* Title */}
          <h1 className="mt-5 max-w-[260px] text-[30px] font-extrabold leading-tight tracking-tight sm:mt-6 sm:max-w-none sm:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-[270px] text-sm leading-6 text-white/90 sm:max-w-xl sm:text-base">
            Discover premium {title.toLowerCase()} products curated just for
            you.
          </p>
        </div>
      </div>
    </section>
  );
}