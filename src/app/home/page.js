import ShowPins from "@/components/Pin/ShowPins";
import React from "react";
export const dynamic = "force-dynamic";

async function HomePage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const res = await fetch(`${baseUrl}/api/pins/upload`);
  const data = await res.json();
  return (
    <>
      <ShowPins pins={data} />
    </>
  );
}

export default HomePage;
