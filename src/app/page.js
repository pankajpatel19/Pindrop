import ConnectDB from "@/config/db.config";
import Link from "next/link";

export default async function Home() {
  await ConnectDB();

  return (
    <div className="flex justify-center items-center bg-black text-white">
      <header className="p-2 gap-2">
        <Link href={"/signup"} className="bg-white text-black mr-10 p-2">
          SignUp
        </Link>
        <Link href={"/signin"} className="bg-white text-black p-2">
          SignIn
        </Link>
      </header>
    </div>
  );
}
