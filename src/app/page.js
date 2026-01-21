import { ButtonGroup } from "@/components/ui/button-group";
import ConnectDB from "@/lib/db.config";
import Link from "next/link";

export default async function Home() {
  await ConnectDB();

  return (
    <div className="flex justify-center items-center">
      <ButtonGroup>
        <ButtonGroup>
          <h1>HELLO GUYSESSSS</h1>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
}
