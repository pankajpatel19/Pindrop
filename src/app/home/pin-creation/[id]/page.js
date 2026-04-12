import PinDetail from "@/components/Pin/PinDetails";
import api from "@/utils/axios";
import React from "react";

async function PinDetails({ params }) {
  const { id } = await params;

  const res = await api.get(`/pins/${id}`);
  const data = await res.data;

  return (
    <>
      <PinDetail pin={data.pin} />
    </>
  );
}

export default PinDetails;
