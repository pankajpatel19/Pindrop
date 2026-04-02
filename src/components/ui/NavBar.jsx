"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { currentUser, logoutUser } from "@/app/actions/addUser";
import { User } from "lucide-react";
import Image from "next/image";

function NavBar() {
  const [token, setToken] = useState(false);
  const [profile, setProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkLoginUser() {
      const res = await currentUser();
      if (res) {
        setToken(res);
      } else {
        setToken(false);
      }
    }
    checkLoginUser();
  }, [token]);

  const handleLogout = () => {
    async function logout() {
      console.log("call");

      await logoutUser();
      setToken(false);
      router.push("/");
    }
    logout();
  };

  return (
    <header className="flex items-center gap-3 px-4 py-3 bg-white sticky top-0 z-50 w-full border-b">
      <div className="flex items-center gap-4 w-full">
        <Image
          className="font-bold text-red-600 text-xl px-2 "
          alt={"logo"}
          width={50}
          height={50}
          src={"/favicon.png"}
        />

        <div className="flex-1">
          <Input
            className="w-full h-12 bg-[#efefef] border-none rounded-2xl px-5 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all"
            placeholder="Search photos"
          />
        </div>

        {token ? (
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setProfile(!profile)}
              className="rounded-full font-bold h-10 w-10 p-0 flex items-center justify-center"
            >
              <User className="w-5 h-5" />
            </Button>
            {/* Dropdown Menu */}
            {profile && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition">
                  Settings
                </button>

                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition">
                  Switch Account
                </button>

                <hr className="my-1 border-gray-100" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {" "}
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
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
