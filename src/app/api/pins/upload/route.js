import cloudinary from "@/config/cloudinary";
import ConnectDB from "@/config/db.config.js";
import { auth } from "@/lib/auth";
import Pin from "@/models/pin.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  await ConnectDB();
  try {
    const { session, user } = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formdata = await request.formData();
    const image = formdata.get("image");
    const title = formdata.get("title");
    const description = formdata.get("description");
    const link = formdata.get("link");
    const board = formdata.get("board");

    if (!image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");
    const dataUri = `data:${image.type};base64,${base64Image}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "pins",
    });

    const pin = await Pin.create({
      title: title,
      description: description,
      link: link,
      board: board,
      image: result.secure_url,
      imagePublicId: result.public_id,
      imageSecureUrl: result.secure_url,
      user: user.id,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Pins Uploaded successFully" },
    { status: 200 },
  );
}

export async function GET(request) {
  await ConnectDB();
  try {
    const allPins = await Pin.find({}).sort();
    if (!allPins) {
      return NextResponse.json({ message: "No Pins Found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Pins Found SuccessFUlly", pins: allPins },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
