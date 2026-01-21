"use server";
import { revalidatePath } from "next/cache";
import Task from "../models/task.model.js";
import ConnectDB from "@/lib/db.config.js";
import { connect } from "mongoose";

export const getTask = async () => {
  try {
    await ConnectDB();
    const tasks = await Task.find({}).lean();

    return tasks;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const addTask = async (FormData) => {
  await ConnectDB();

  try {
    const title = FormData.get("title");
    const description = FormData.get("description");
    const status = FormData.get("status");
    const priority = FormData.get("priority");

    const newTask = await new Task({
      title,
      description,
      status,
      priority,
    });
    await newTask.save();
    logo("New Task Added:", newTask);
    revalidatePath("/show-Todos");
    return newTask;
  } catch (error) {
    console.log(error.message);
  }
};

export const TaskStatus = async (TaskID) => {
  try {
    const task = await Task.findById({ id: TaskID });
    if (!task) {
      throw new Error("Task Not Found");
    }

    return task;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const deleteTask = async (id) => {
  console.log(id);

  await ConnectDB();
  try {
    const deleteTask = await Task.findByIdAndDelete(id);

    return deleteTask;
  } catch (error) {
    console.log(error.message);
  }
  revalidatePath("/show-Todos");
};
