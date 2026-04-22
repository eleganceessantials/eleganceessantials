import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

function checkAuth(req: Request) {
  const username = req.headers.get("x-admin-username");
  const password = req.headers.get("x-admin-password");

  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("elegance_essentials");
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("elegance_essentials");
    const body = await req.json();

    if (Array.isArray(body)) {
      // Bulk create
      const result = await db.collection("products").insertMany(body);
      return NextResponse.json(result);
    } else {
      // Single create
      const result = await db.collection("products").insertOne(body);
      return NextResponse.json(result);
    }
  } catch (e) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("elegance_essentials");
    const body = await req.json();
    const { _id, ...updateData } = body;

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("elegance_essentials");
    const { ids } = await req.json(); // Expecting { ids: ["id1", "id2"] }

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const result = await db.collection("products").deleteMany({
      _id: { $in: ids.map((id: string) => new ObjectId(id)) }
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
