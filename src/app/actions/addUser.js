"use server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function createUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = User.create({
    name,
    email,
    password: hashedPassword,
  });

  return { message: "User created successfully" };
}

export async function loginUser(prevState, formData) {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password");

  const user = await User.findOne({ email });

  if (user === null) {
    return { error: "User not found", success: false };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid password", success: false };
  }

  cookieStore.set("token", {
    path: "/",
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 1,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1 * 1000),
  });
  return { message: "Login successful", success: true };
}

export async function currentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  return !!token;
}
