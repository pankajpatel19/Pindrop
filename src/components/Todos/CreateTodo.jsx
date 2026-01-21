import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addTask, getTask } from "@/action/action";
import ShowTodos from "./ShowTodos";
import Link from "next/link";

async function CreateTodo() {
  return (
    <div className="m-10">
      <Card className="w-full max-w-sm">
        <CardTitle className={"items-center"}>Create Todos</CardTitle>

        <CardContent>
          <form action={addTask}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="title"
                  name="title"
                  placeholder="Enter Title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  required
                />
              </div>
            </div>
            <div>
              <Select name="status">
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Select Status" />
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
            </div>
            <div>
              <Select name="priority">
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Select a fruit" />
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
            </div>
            <div className="mt-2">
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-white text-black cursor-auto"
                >
                  Add
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateTodo;
