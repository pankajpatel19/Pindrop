"use client";
import { DeleteIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { deleteTask } from "@/action/action";

function Delete({ TaskId }) {
  return (
    <Button
      className="flex p-2 gap-1.5"
      onClick={() => deleteTask(JSON.parse(TaskId))}
    >
      <DeleteIcon />
      Delete
    </Button>
  );
}

export default Delete;
