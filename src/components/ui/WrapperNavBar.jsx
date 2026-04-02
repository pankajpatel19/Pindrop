"use client";
import dynamic from "next/dynamic";
import React from "react";

//for Export Default
const DynamicNavBar = dynamic(
  () => import("@/components/ui/NavBar"),
  { ssr: false, loading: () => <div className="h-16 w-full bg-white" /> }, // Placeholder
);
function WrapperNavBar() {
  return <DynamicNavBar />;
}

export default WrapperNavBar;
