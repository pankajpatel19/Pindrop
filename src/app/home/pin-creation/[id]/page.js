import PinDetail from "@/components/Pin/PinDetails";
import ConnectDB from "@/config/db.config";
import Pin from "@/models/pin.model";
import React from "react";

async function PinDetails({ params }) {
  const { id } = await params;

  await ConnectDB();
  const pin = await Pin.findById(id).lean();

  const serializedPin = JSON.parse(JSON.stringify(pin));

  return (
    <>
      <PinDetail pin={serializedPin} />
    </>
  );
}

export default PinDetails;
