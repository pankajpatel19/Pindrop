import Link from "next/link";
import React from "react";

function BoardInstance() {
  return (
    <div className="">
      <h1 className="text-3xl mt-5  font-bold">Your Saved Instance</h1>
      <div className="gap-5 m-4">
        <Link href={"/home/boards/pins"} className="text-md font-extralight">
          Pins
        </Link>
        <Link
          href={"/home/boards/boards"}
          className="ml-2 text-md font-extralight"
        >
          Boards
        </Link>
        <Link
          href={"/home/boards/collages"}
          className="ml-2 text-md font-extralight"
        >
          colleges
        </Link>
      </div>
    </div>
  );
}

export default BoardInstance;
