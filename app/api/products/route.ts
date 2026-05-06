import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "12"), 1),
      50
    );

    const search = String(searchParams.get("search") || "").trim();
    const cat = String(searchParams.get("cat") || "all").trim().toLowerCase();

    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db("elegance_essentials");

    const query: any = {};

    if (cat && cat !== "all") {
      const category = await db.collection("categories").findOne({
        value: cat,
      });

      const categoryName = category?.name || cat;

      query.category = {
        $regex: `^${escapeRegex(categoryName)}$`,
        $options: "i",
      };
    }

    if (search) {
      const safeSearch = escapeRegex(search);

      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { slug: { $regex: safeSearch, $options: "i" } },
        { category: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const productsCollection = db.collection("products");

    const [products, total] = await Promise.all([
      productsCollection
        .find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .project({
          name: 1,
          slug: 1,
          price: 1,
          discountPrice: 1,
          category: 1,
          image: 1,
          description: 1,
        })
        .toArray(),

      productsCollection.countDocuments(query),
    ]);

    const formattedProducts = products.map((product) => {
      const { _id, ...rest } = product;

      return {
        ...rest,
        id: _id.toString(),
      };
    });

    return NextResponse.json({
      products: formattedProducts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    });
  } catch (e) {
    console.error("Failed to fetch products:", e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}