"use client";
import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, ChevronRight, User } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4 w-full font-sans">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-[380px] w-full bg-white p-6 sm:p-8 rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100"
      >
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-blue-500 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-gray-400 text-sm font-medium">
            Welcome back to the community
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[13px] font-bold text-gray-600 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full h-12 bg-gray-50 border-2 border-transparent focus:border-blue-50 focus:bg-white rounded-[18px] pl-11 pr-5 outline-none transition-all text-sm text-gray-800 font-medium"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[13px] font-bold text-gray-600 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full h-12 bg-gray-50 border-2 border-transparent focus:border-blue-50 focus:bg-white rounded-[18px] pl-11 pr-5 outline-none transition-all text-sm text-gray-800 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-500 text-[12px] font-bold text-center bg-red-50 p-2.5 rounded-xl border border-red-100 flex items-center justify-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="space-y-4 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={pending}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-md disabled:bg-gray-200 flex items-center justify-center gap-2"
            >
              {pending ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <ChevronRight size={18} />
                </>
              )}
            </motion.button>

            <div className="relative flex items-center justify-center py-1">
              <div className="border-t border-gray-100 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-gray-300 uppercase tracking-widest absolute">
                Or use social
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async (e) => {
                e.preventDefault();
                await signIn.social({
                  provider: "google",
                  callbackURL: "/home",
                });
              }}
              type="button"
              className="w-full h-11 bg-white text-gray-700 font-bold py-2 px-4 border-2 border-gray-50 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              <span className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full text-[10px]">
                G
              </span>
              Google
            </motion.button>
          </motion.div>
        </form>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-xs font-semibold text-gray-400"
        >
          New here?
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-700 ml-2 font-bold transition-colors underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default SignIn;
