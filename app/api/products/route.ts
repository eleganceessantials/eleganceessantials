import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("elegance_essentials");
    const products = await db.collection("products").find({}).toArray();
    
    // Map _id to id for frontend compatibility
    const formattedProducts = products.map(p => ({
      ...p,
      id: p._id.toString(),
      _id: undefined
    }));

    return NextResponse.json(formattedProducts);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
