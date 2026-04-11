"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function NavBar() {
  const [profile, setProfile] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-md sticky top-0 z-[100] w-full border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4 w-full max-w-[2000px] mx-auto">
        {/* Logo */}
        <motion.div
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className="shrink-0"
        >
          <Link href="/" className="flex items-center p-2 rounded-full hover:bg-gray-50 transition-colors">
            <Image
              className="font-bold text-red-600 px-2"
              alt={"logo"}
              width={50}
              height={50}
              src={"/favicon.png"}
            />
          </Link>
        </motion.div>

        {/* Search Bar (Only if session) */}
        {session && (
          <div className="flex-1 flex items-center relative group">
            <Input
              className="w-full h-12 bg-[#efefef] hover:bg-[#e2e2e2] border-none rounded-full px-5 focus-visible:ring-4 focus-visible:ring-blue-100 transition-all font-medium text-gray-700"
              placeholder="Search photos"
            />
          </div>
        )}

        {/* Auth / Profile Actions */}
        {session ? (
          <div className="relative">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setProfile(!profile)}
                className="rounded-full font-bold h-10 w-10 p-0 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-none transition-colors overflow-hidden"
              >
                {session.user.image ? (
                   <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                ) : (
                   <User className="w-5 h-5 text-gray-600" />
                )}
              </Button>
            </motion.div>

            {/* Animated Dropdown Menu */}
            <AnimatePresence>
              {profile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 z-50 overflow-hidden"
                >
                  <button className="w-full text-left px-5 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-5 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Switch Account
                  </button>
                  <hr className="my-2 border-gray-50" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <nav className="flex items-center gap-2 shrink-0 ml-auto mr-2">
            <Link
              href="/about"
              className="font-semibold text-[15px] text-gray-700 hover:bg-gray-100 p-2.5 px-4 rounded-full transition-colors"
            >
              About
            </Link>
            <Link
              href="/news"
              className="font-semibold text-[15px] text-gray-700 hover:bg-gray-100 p-2.5 px-4 rounded-full transition-colors hidden sm:block"
            >
              News
            </Link>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-2">
              <Button
                variant="outline"
                className="rounded-full font-bold border-none bg-gray-100 hover:bg-gray-200 h-11 px-6 cursor-pointer transition-colors"
                onClick={() => router.push("/signin")}
              >
                Log in
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="rounded-full font-bold bg-[#e60023] hover:bg-[#ad081b] text-white border-none h-11 px-6 cursor-pointer shadow-sm hover:shadow-md transition-all"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </motion.div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default NavBar;

