"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import Delete from "./Delete";

function ShowTodos({ todos }) {
  todos = JSON.parse(todos);

  return (
    <Card className={"m-10 p-5 w-200"}>
      <CardHeader>Todos</CardHeader>
      {todos?.map((todo) => {
        return (
          <Item variant="outline" key={todo._id}>
            <ItemContent>
              <ItemTitle>{todo.title}</ItemTitle>

              <ItemDescription>{todo.description}</ItemDescription>
            </ItemContent>
            <ItemTitle>{todo.status}</ItemTitle>
            <ItemTitle>{todo.priority}</ItemTitle>
            <ItemContent>
              <Select name="status">
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-zinc-200 text-black">
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="TODO">TODO</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                    <SelectItem value="DONE">DONE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ItemContent>
            <ItemContent>
              <Select name="priority">
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="update a Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ItemContent>
            <ItemActions>
              <Delete TaskId={JSON.stringify(todo._id)} />
            </ItemActions>
          </Item>
        );
      })}
    </Card>
  );
}

export default ShowTodos;
