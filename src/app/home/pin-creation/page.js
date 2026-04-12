import PinCreate from "@/components/Pin/PinCreate";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export const metadata = {
  title: "Create Pin",
  description: "Create a new pin",
};

async function PinCreation() {
  const { session, user } = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <PinCreate />
    </div>
  );
}

export default PinCreation;
