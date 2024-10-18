import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;

    const IS_USER = await User.findOne({ username });

    if (IS_USER)
      return NextResponse.json({ message: "username is already taken" }, { status: 409 });

    return NextResponse.json({ message: "Username is available" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong", error });
  }
}