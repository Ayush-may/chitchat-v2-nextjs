import connectToDatabase from "@/lib/mongoDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { username, password } = body;
    const LOWER_CASE_USERNAME = username.toLowerCase();

    const CURR_USER = await User.findOne({ username: LOWER_CASE_USERNAME });
    const IS_MATCH = await bcrypt.compare(password, CURR_USER.password);
    if (!IS_MATCH)
      return NextResponse.json({ message: "Password incorrect!" }, { status: 401 });

    const TOKEN = jwt.sign({ username: LOWER_CASE_USERNAME }, process.env.JWT_KEY, { expiresIn: "1h" });

    const cookie = serialize("token", TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: (60 * 60),
      path: '/',
    });

    const res = NextResponse.json({ message: "Password correct!" }, { status: 200 });
    res.headers.set("Set-Cookie", cookie);

    return res;

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}