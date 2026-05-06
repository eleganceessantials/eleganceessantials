import { NextResponse } from "next/server";

function checkCredentials(username: string, password: string) {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || "");
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    if (!checkCredentials(username, password)) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Login failed." },
      { status: 500 }
    );
  }
}