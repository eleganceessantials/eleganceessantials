// /data/productListing.ts

export type Category =
  | "SkinCare"
  | "Makeup"
  | "HairCare"
  | "Fragrance";

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: Category;
  image: string;
  description: string;
};

export const products: Product[] = [
  /* ================= SkinCare ================= */
  {
    id: 1,
    name: "Vitamin C Serum",
    slug: "vitamincserum",
    price: 999,
    category: "SkinCare",
    image:
      "/glowing-beauty-vitamin-c-serums-clean-aesthetic-scene-ampoules-vitamin-c-serum-clean-aesthetic-scene-warm-nostalgic-368525971.webp",
    description:
      "Brightens skin,reduces dark spots, and boosts collagen for a youthful glow..",
  },
  {
    id: 2,
    name: "Hyaluronic Acid Moisturize",
    slug: "hyaluronicacidmoisturize",
    price: 899,
    category: "SkinCare",
    image:
      "/skin-thirst-moisturizing-hyaluronic-acid-cream-201042.webp",
    description:
      "Deeply hydrates and locks in moisture, Keeping skin soft and supple all day." 
    },
  {
    id: 3,
    name: "Sunscreen SPF 50",
    slug: "sunscreenspf50",
    price: 799,
    category: "SkinCare",
    image: "/a0535ccec92535fc323dd5cd974381f1.jpg",
    description:
      "Protects skin from harmful UV rays and prevents premature aging.",
  },
  {
    id: 16,
    name: "Exfoliating Face Wash",
    slug: "exfoliatingfacewash",
    price: 799,
    category: "SkinCare",
    image: "/382719e3eec9946577a14063dd78fd69.jpg",
    description:
      "Gently removes dead skin cells, unclogs pores, and refreshes the skin.",
  },

  /* ================= Makeup ================= */
  {
    id: 4,
    name: "Liquid Foundation",
    slug: "liquidfoundation",
    price: 1999,
    category: "Makeup",
    image:
      "/aesthetic-floating-foundation-makeup-products-featuring-beautiful-liquid-drips-chic-look-arrangement-various-beautifully-356279367.webp",
    description:
      "Provides even coverage, smooths skin tone, and creates a flawless base.",
  },
  {
    id: 5,
    name: "Matte Lipstick",
    slug: "mattelipstick",
    price: 1599,
    category: "Makeup",
    image:
      "/61KRBXYDOCL._AC_UF1000,1000_QL80_.jpg",
    description:
      "Long-lasting color with a smooth matte finish for all-day wear.",
  },
  {
    id: 12,
    name: "Mascara",
    slug: "mascara",
    price: 1599,
    category: "Makeup",
    image:
      "/images.jpg",
    description:
      "Enhances eyelashes with volume, length, and curl for bold eyes.",
  },
  


  /* ================= HairCare ================= */
  {
    id: 6,
    name: "Shampoo",
    slug: "shampoo",
    price: 349,
    category: "HairCare",
    image: "/close-up-floating-water_23-2150963076.avif",
    description:
      "Cleanses hair and scalp, removing dirt and oil while maintaining natural moisture.",
  },
  {
    id: 7,
    name: "Conditioner",
    slug: "conditioner",
    price: 249,
    category: "HairCare",
    image:
      "/561df9a3cda0d636878d82ff178e4f2b.jpg",
    description:
      "Softens hair, reduces frizz, and improves manageability and shine.",
  },
  {
    id: 11,
    name: "Hair Serum",
    slug: "hairserum",
    price: 1599,
    category: "HairCare",
    image:
      "/Copy+of+(plated)_Hair_2365.webp",
    description:
      "Smooths hair, controls frizz, and adds shine without weighing hair down.",
  },

  /* ================= Fragrance ================= */
  {
    id: 8,
    name: "Eau de Parfum (EDP)",
    slug: "eaudeparfum (EDP)",
    price: 399,
    category: "Fragrance",
    image:
      "/pngtree-aesthetic-presentation-of-vases-dried-flowers-and-perfume-bottle-image_17281361.jpg",
    description:
      "Long-lasting fragrance with rich and elegant notes for a signature scent.",
  },
  {
    id: 9,
    name: "Body Mist",
    slug: "bodymist",
    price: 349,
    category: "Fragrance",
    image:
      "/images (1).jpg",
    description:
      "Light and refreshing scent that keeps you smelling fresh throughout the day.",
  },
   

  
];

