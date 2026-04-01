"use server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

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
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await User.findOne({ email });
  console.log(user);

  if (user === null) {
    return { error: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid password" };
  }

  return { message: "Login successful" };
}
