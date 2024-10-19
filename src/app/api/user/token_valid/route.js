// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   try {
//     const BODY = await req.json();
//     const { TOKEN } = BODY;

//     if (TOKEN)
//       return NextResponse.json({ message: "Token is invalid!" }, { status: 401 });

//     const is_verify = jwt.verify(TOKEN,);

//   } catch (error) {

//   }
// }