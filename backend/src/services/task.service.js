import Task from "../models/task.model.js";
import { parseDate } from "./validation.service.js";

export const createTaskRecord = async ({ userId, name, description }) => {
  return Task.create({ userId, name: name.trim(), description: description ? description.trim() : "" });
};

export const findTasksForUser = async ({ userId, date }) => {
  const filter = { userId };
  if (date) {
    const range = parseDate(date);
    if (!range) {
      return null;
    }
    filter.createdAt = { $gte: range.start, $lt: range.end };
  }
  return Task.find(filter).sort({ createdAt: -1 });
};

export const changeTaskStatus = async ({ id, userId, status }) => {
  const task = await Task.findOne({ _id: id, userId });
  if (!task) {
    return null;
  }
  task.status = status;
  return task.save();
};

export const removeTask = async ({ id, userId }) => {
  return Task.findOneAndDelete({ _id: id, userId });
};

export const getDailySummary = async ({ userId, date }) => {
  const range = parseDate(date);
  if (!range) {
    return null;
  }
  const tasks = await Task.find({ userId, createdAt: { $gte: range.start, $lt: range.end } });
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "completed").length;
  return { date: range.date, total, completed, pending: total - completed };
};
