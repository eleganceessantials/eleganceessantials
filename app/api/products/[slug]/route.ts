import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db("elegance_essentials");
    const product = await db.collection("products").findOne({ slug });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formattedProduct = {
      ...product,
      id: product._id.toString(),
      _id: undefined
    };

    return NextResponse.json(formattedProduct);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
