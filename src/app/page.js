import NavBar from "@/components/ui/NavBar";
import ConnectDB from "@/config/db.config";
import Link from "next/link";

export default async function Home() {
  await ConnectDB();

  return <div className=""></div>;
}
