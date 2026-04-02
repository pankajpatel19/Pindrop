import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { id } from "date-fns/locale/id";

export async function createToken({ id, name }) {
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload;
}
