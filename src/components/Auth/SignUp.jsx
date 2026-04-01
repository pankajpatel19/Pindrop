"use client";
import React, { useActionState } from "react";
import { createUser } from "../../app/actions/addUser";
import { useFormStatus } from "react-dom";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? "Saving..." : "Add User"}
    </button>
  );
}

function SignUp() {
  const [state, formAction] = useActionState(createUser, { message: "" });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form action={formAction} className="flex flex-col space-y-4">
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
          {state?.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
