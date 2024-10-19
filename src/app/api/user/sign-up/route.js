import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { username, password } = body;
    const LOWER_CASE_USERNAME = username.toLowerCase();

    const SALT_ROUNDS = 10;
    const HASH_PASSWORD = await bcrypt.hash(password, SALT_ROUNDS);

    const NEW_USER = new User({ username : LOWER_CASE_USERNAME, password: HASH_PASSWORD });
    await NEW_USER.save();

    const TOKEN = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: '1h' });

    // Set the token in an HttpOnly cookie
    const cookie = serialize('token', TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: (60 * 60),
      path: '/',
    });

    const res = NextResponse.json({
      message: "User created successfully!",
    });

    res.headers.set('Set-Cookie', cookie);

    return res;

  } catch (error) {
    return NextResponse.json({
      message: 'Failed to create user or generate token',
      error: error.message
    }, { status: 500 });
  }
}
