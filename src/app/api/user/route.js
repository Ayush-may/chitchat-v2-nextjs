import connectToDatabase from "@/lib/mongoDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function GET() {
  await connectToDatabase();

  const user = await User.find({});
  console.log(user);

  return NextResponse.json(user);
}

// create user
export async function POST(req) {
  await connectToDatabase();

  const body = await req.json();
  const { username, password } = body;

  const SALT_ROUND = 10;
  const HASH_PASSWORD = await bcrypt.hash(password, SALT_ROUND);

  const NEW_USER = new User({ username, password: HASH_PASSWORD });
  await NEW_USER.save();

  return NextResponse.json({ message: "Thsi is post " });
}