import ShowPins from "@/components/Pin/ShowPins";
import React from "react";
export const dynamic = "force-dynamic";

async function HomePage() {
  const res = await fetch("http://localhost:3000/api/pins/upload");
  const data = await res.json();
  return (
    <>
      <ShowPins pins={data} />
    </>
  );
}

export default HomePage;
