import api from "./api.service.js";

export const fetchTasks = (date) => api.get("/tasks", { params: { date } }).then((res) => res.data);
export const createTask = ({ name, description }) => api.post("/tasks", { name, description }).then((res) => res.data);
export const updateTaskStatus = (taskId, status) => api.patch(`/tasks/${taskId}/status`, { status }).then((res) => res.data);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);
export const fetchSummary = (date) => api.get("/tasks/summary", { params: { date } }).then((res) => res.data);
