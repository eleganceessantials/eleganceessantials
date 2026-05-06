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

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "20"), 1),
      100
    );
    const search = String(searchParams.get("search") || "").trim();

    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db("elegance_essentials");

    const query: any = {};

    if (search) {
      const safeSearch = escapeRegex(search);

      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { slug: { $regex: safeSearch, $options: "i" } },
        { category: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];

      const numericSearch = Number(search);

      if (!Number.isNaN(numericSearch)) {
        query.$or.push({ price: numericSearch });
        query.$or.push({ discountPrice: numericSearch });
      }
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

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    });
  } catch (e) {
    console.error("Failed to fetch products:", e);
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
      const result = await db.collection("products").insertMany(body);
      return NextResponse.json(result);
    }

    const result = await db.collection("products").insertOne(body);
    return NextResponse.json(result);
  } catch (e) {
    console.error("Failed to create product:", e);
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

    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return NextResponse.json(result);
  } catch (e) {
    console.error("Failed to update product:", e);
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
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const validIds = ids
      .filter((id: string) => ObjectId.isValid(id))
      .map((id: string) => new ObjectId(id));

    if (validIds.length === 0) {
      return NextResponse.json({ error: "No valid IDs" }, { status: 400 });
    }

    const result = await db.collection("products").deleteMany({
      _id: { $in: validIds },
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("Failed to delete product:", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}