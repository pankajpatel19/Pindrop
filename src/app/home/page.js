import React from "react";
import Pin from "@/models/pin.model";
import ConnectDB from "@/config/db.config";
import User from "@/models/user.model";
import { Share2, MoreHorizontal, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function HomePage() {
  return <h1>Home</h1>;
}

export default HomePage;
