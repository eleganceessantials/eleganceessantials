import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("elegance_essentials");

    const categories = await db.collection("categories").find({}).toArray();

    return NextResponse.json(
      Array.isArray(categories) ? categories : [],
      { status: 200 }
    );
  } catch (error) {
    console.error("Categories API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}