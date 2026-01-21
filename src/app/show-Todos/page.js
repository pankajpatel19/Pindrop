import { deleteTask, getTask } from "@/action/action";
import ShowTodos from "@/components/Todos/ShowTodos";
import React from "react";

async function showTodos() {
  const Todos = JSON.stringify(await getTask());

  return (
    <div>
      <ShowTodos todos={Todos} />
    </div>
  );
}

export default showTodos;
