import { SignJWT, jwtVerify } from "jose";

export async function createToken({ id, name }) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
  const token = await new SignJWT({ id, name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);

  return token;
}

export async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
  const { payload } = await jwtVerify(token, secret);

  return payload;
}
