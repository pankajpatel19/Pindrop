"use client";
import React from "react";
import { Input } from "./input";
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();

  return (
    <header className="flex items-center gap-3 px-4 py-3 bg-white sticky top-0 z-50 w-full">
      <div className="flex items-center gap-4 w-full">
        <span className="font-bold text-red-600 text-xl px-2">Explore</span>

        <div className="flex-1">
          <Input
            className="w-full h-12 bg-[#efefef] border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all"
            placeholder="Search photos"
          />
        </div>

        <nav className="flex items-center gap-4 shrink-0">
          <Link
            href="/about"
            className="font-semibold text-[15px] hover:bg-gray-100 p-2 px-3 rounded-full transition-colors"
          >
            About
          </Link>
          <Link
            href="/news"
            className="font-semibold text-[15px] hover:bg-gray-100 p-2 px-3 rounded-full transition-colors"
          >
            News
          </Link>
          <Link
            href="/contact"
            className="font-semibold text-[15px] hover:bg-gray-100 p-2 px-3 rounded-full transition-colors hidden lg:block"
          >
            Contact
          </Link>
          <Link
            href="/businesses"
            className="font-semibold text-[15px] hover:bg-gray-100 p-2 px-3 rounded-full transition-colors hidden lg:block"
          >
            Businesses
          </Link>

          <Button
            variant="outline"
            className="rounded-full font-bold border-none bg-gray-100 hover:bg-gray-200 h-11 px-4 cursor-grab"
            onClick={() => router.push("/signin")}
          >
            Log in
          </Button>

          <Button
            variant="outline"
            className="rounded-full font-bold bg-[#f01233] hover:bg-[#f00a25] text-white border-none h-11 px-4 cursor-grab"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
