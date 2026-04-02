import BoardInstance from "@/components/Boards/BoardInstance";
import React from "react";

function BoardLayout({ children }) {
  return (
    <div>
      <BoardInstance />
      {children}
    </div>
  );
}

export default BoardLayout;
