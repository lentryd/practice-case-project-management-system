import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api", // URL вашего бекенда
});

export const fetchProjects = () => api.get("/projects");
export const createProject = (data: any) => api.post("/projects", data);
// Другие API-функции
