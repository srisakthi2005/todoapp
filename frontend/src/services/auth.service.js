import api from "./api.service.js";

export const signup = async ({ username, email, password }) => {
  const response = await api.post("/signup", { username, email, password });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await api.post("/login", { email, password });
  const { token, userId } = response.data;
  localStorage.setItem("todo_token", token);
  localStorage.setItem("todo_userId", userId);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("todo_token");
  localStorage.removeItem("todo_userId");
};

export const getAuthToken = () => localStorage.getItem("todo_token");

export const isAuthenticated = () => Boolean(getAuthToken());
