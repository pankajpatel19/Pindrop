import Pin from "@/models/pin.model";
import ConnectDB from "@/config/db.config";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await ConnectDB();
  try {
    const { id } = await params;
    const pin = await Pin.findById(id);
    if (!pin) {
      return NextResponse.json({ message: "No Pin Found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Pin Found SuccessFUlly", pin: pin },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
