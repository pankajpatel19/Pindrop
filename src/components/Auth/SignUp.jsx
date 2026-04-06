"use client";
import React, { useState } from "react";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {authClient} from "@/lib/auth-client"

function SignUp() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("ConfirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPending(false);
      return;
    }


    await authClient.signUp.email({
      email,
      password,
      name,
      fetchOptions:{
        onSuccess:()=>{
          router.push("/")
        },
        onError:(ctx)=>{
          setError(ctx.error.message)
          setPending(false) 
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="ConfirmPassword"
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <span>Already have an account?</span>
            <Link href={"/signin"} className="text-blue-400 ml-2">
              Sign In
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {pending ? "Saving..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
