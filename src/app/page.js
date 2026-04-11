import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LandingContent from "@/components/Home/LandingContent";

export const dynamic = "force-dynamic";

export default async function Banner() {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (sessionData?.session) {
    redirect("/home");
  }

  return <LandingContent />;
}
