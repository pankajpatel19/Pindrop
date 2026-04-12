import ConnectDB from "@/config/db.config";
import { auth } from "@/lib/auth";
import Pin from "@/models/pin.model";
import Save from "@/models/saves.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request, { params }) {
  await ConnectDB();
  const { session, user } = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const { id } = await params;

    //finding pin
    const pin = await Pin.findById(id);

    if (!pin) {
      return NextResponse.json({ message: "No Pin Found" }, { status: 404 });
    }

    //checking if pin is already saved
    const saved = await Save.findOne({
      user: user.id,
      pin: pin._id,
    });
    if (saved) {
      return NextResponse.json(
        { message: "Pin Already Saved" },
        { status: 400 },
      );
    }
    //saving pin
    const save = new Save({
      user: user.id,
      pin: pin._id,
    });
    await save.save();
    return NextResponse.json(
      { message: "Pin Found SuccessFUlly", pin: pin },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
