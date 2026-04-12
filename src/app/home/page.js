import ShowPins from "@/components/Pin/ShowPins";
import React from "react";
export const dynamic = "force-dynamic";

import ConnectDB from "@/config/db.config";
import Pin from "@/models/pin.model";

async function HomePage() {
  await ConnectDB();
  const allPins = await Pin.find({}).sort().lean();

  // Parse through JSON to serialize MongoDB ObjectIDs correctly for client components
  const data = JSON.parse(
    JSON.stringify({
      message: "Pins Found SuccessFUlly",
      pins: allPins,
    }),
  );

  return (
    <>
      <ShowPins pins={data} />
    </>
  );
}

export default HomePage;
