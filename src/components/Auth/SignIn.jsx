"use client";
import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignIn() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/home");
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Failed to sign in. Please try again.");
          setPending(false);
        },
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 w-full">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-200">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            >
              {pending ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                await signIn.social({
                  provider: "google",
                  callbackURL: "/home",
                });
              }}
              type="button"
              className="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Login with Google
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
