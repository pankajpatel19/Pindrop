import Link from "next/link";
import React from "react";

function BoardInstance() {
  return (
    <div>
      <Link href={"/pins"}>Pins</Link>
      <Link href={"/boards"}>Boards</Link>
      <Link href={"/colleges"}>colleges</Link>
    </div>
  );
}

export default BoardInstance;
