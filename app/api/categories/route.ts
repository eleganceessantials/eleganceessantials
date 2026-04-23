import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("elegance_essentials");
    const categories = await db.collection("categories").find({}).toArray();
    return NextResponse.json(categories);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
