"use client";
import React, { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { User, Mail, Lock, CheckCircle2, ChevronRight } from "lucide-react";

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
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setPending(false);
        },
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfcfc] p-6 font-sans">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white p-6 sm:p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[400px] border border-gray-100"
      >
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="text-red-500 w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Create account
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            Join our community
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-1"
          >
            <label className="text-[13px] font-bold text-gray-600 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                <User size={16} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full h-11 bg-gray-50 border-2 border-transparent focus:border-red-50 focus:bg-white rounded-2xl pl-11 pr-4 outline-none transition-all text-sm text-gray-800 font-medium"
                required
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-1"
          >
            <label className="text-[13px] font-bold text-gray-600 ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                <Mail size={16} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                className="w-full h-11 bg-gray-50 border-2 border-transparent focus:border-red-50 focus:bg-white rounded-2xl pl-11 pr-4 outline-none transition-all text-sm text-gray-800 font-medium"
                required
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-1"
          >
            <label className="text-[13px] font-bold text-gray-600 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                <Lock size={16} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full h-11 bg-gray-50 border-2 border-transparent focus:border-red-50 focus:bg-white rounded-2xl pl-11 pr-4 outline-none transition-all text-sm text-gray-800 font-medium"
                required
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-1"
          >
            <label className="text-[13px] font-bold text-gray-600 ml-1">
              Confirm Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                <CheckCircle2 size={16} />
              </div>
              <input
                type="password"
                name="ConfirmPassword"
                placeholder="••••••••"
                className="w-full h-11 bg-gray-50 border-2 border-transparent focus:border-red-50 focus:bg-white rounded-2xl pl-11 pr-4 outline-none transition-all text-sm text-gray-800 font-medium"
                required
              />
            </div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-500 text-[12px] font-bold text-center bg-red-50 py-1.5 rounded-xl border border-red-100"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="w-full h-12 bg-[#e60023] hover:bg-[#ad081b] text-white font-bold rounded-full transition-colors disabled:bg-gray-300 shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            {pending ? (
              "Creating..."
            ) : (
              <>
                Register <ChevronRight size={16} />
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col space-y-3"
        >
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-100 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest absolute">
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
            className="w-full h-11 bg-white text-gray-700 font-bold py-2 px-4 border-2 border-gray-50 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-3 drop-shadow-sm"
          >
            <span className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full text-[10px]">
              G
            </span>
            Google
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-gray-400 text-xs font-semibold">
            Have an account?
            <Link
              href={"/signin"}
              className="text-[#e60023] font-bold ml-1.5 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SignUp;
