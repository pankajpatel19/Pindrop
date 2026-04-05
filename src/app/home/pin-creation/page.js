import PinCreate from "@/components/Creation/PinCreate";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function PinCreation() {
  const Cookie = await cookies();
  const token = Cookie.get("token")?.value;
  if (!token) {
    redirect("/signin");
  }

  // const role = JSON.parse((await headers()).get("user-role"));

  return (
    <div>
      <PinCreate />
    </div>
  );
}

export default PinCreation;
