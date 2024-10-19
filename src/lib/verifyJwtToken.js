// import * as jose from "jose";

// async function verifyJwtToken(token) {
//   try {
//     const verified = await jose.jwtVerify(
//       token,
//       new TextEncoder().encode(process.env.JWT_KEY)
//     );

//     return verified.payload;
//   } catch (error) {
//     throw new Error("Your token is expired");
//   }
// }

// export default verifyJwtToken;