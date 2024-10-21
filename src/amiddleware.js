import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const { pathname, method, searchParams } = req.nextUrl;
    const url = req.nextUrl.clone();

    if (url.pathname == "/" && searchParams.get("skip_token_validation") === "true") {
      return NextResponse.next();
    }

    const verifedToken =
      token
        ? await verifyJwtToken(token).catch(error => error)
        : null;

    if (url.pathname == "/") {
      if (verifedToken?.username)
        return NextResponse.redirect(new URL("/chat", req.url));
      return NextResponse.next();
    }
    else if (url.pathname.startsWith("/chat") || url.pathname.includes("/chat")) {
      if (!verifedToken?.username)
        return NextResponse.redirect(new URL("/", req.url));
      return NextResponse.next();
    }
  } catch (error) {
    console.error(error);
    // return NextResponse.json({ message: "An unexpected error occurred", error }, { status: 500 });
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/chat/:path*"], // Only apply middleware to the home and chat routes
};

async function verifyJwtToken(token) {
  try {
    const verified = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_KEY)
    );

    return verified.payload;
  } catch (error) {
    throw new Error("Your token is expired");
  }
}