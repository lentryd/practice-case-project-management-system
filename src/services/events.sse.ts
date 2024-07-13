import { EventSourcePolyfill } from "event-source-polyfill";
import { Project, Stage, Task } from "../types";
import { addTask, deleteTask, updateTask } from "../features/taskSlice";
import { addStage, deleteStage, updateStage } from "../features/stageSlice";
import {
  addProject,
  deleteProject,
  updateProject,
} from "../features/projectSlice";
import { baseApiUrl } from "./api";
import store from "../store";

// Общий интерфейс для сообщений
interface EventMessage<T> {
  event: string;
  data: T | T[];
}

// Функция для получения токена
function getToken(): string | null {
  return localStorage.getItem("token");
}

// Функция для инициализации SSE с повторным подключением
function initializeSSE<T>(
  url: string,
  eventHandlers: { [key: string]: (data: T) => void },
  token: string
) {
  let eventSource = new EventSourcePolyfill(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    heartbeatTimeout: 3.6e6,
  });

  eventSource.addEventListener("message", (event) => {
    const message = JSON.parse(event.data) as EventMessage<T>;

    if (eventHandlers[message.event]) {
      Array.isArray(message.data)
        ? message.data.forEach(eventHandlers[message.event])
        : eventHandlers[message.event](message.data);
    } else {
      console.error(`Unknown event: ${message.event}`);
    }
  });

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);
  };

  return eventSource;
}

// Функции для инициализации конкретных событий
function initializeTaskEvents(token: string) {
  return initializeSSE<Task>(
    `${baseApiUrl}/api/events/tasks`,
    {
      "task.created": (data) => store.dispatch(addTask(data)),
      "task.updated": (data) => store.dispatch(updateTask(data)),
      "task.deleted": (data) => store.dispatch(deleteTask(data)),
    },
    token
  );
}

function initializeStageEvents(token: string) {
  return initializeSSE<Stage>(
    `${baseApiUrl}/api/events/stages`,
    {
      "stage.created": (data) => store.dispatch(addStage(data)),
      "stage.updated": (data) => store.dispatch(updateStage(data)),
      "stage.deleted": (data) => store.dispatch(deleteStage(data)),
    },
    token
  );
}

function initializeProjectEvents(token: string) {
  return initializeSSE<Project>(
    `${baseApiUrl}/api/events/projects`,
    {
      "project.created": (data) => store.dispatch(addProject(data)),
      "project.updated": (data) => store.dispatch(updateProject(data)),
      "project.deleted": (data) => store.dispatch(deleteProject(data.id)),
    },
    token
  );
}

// Инициализация всех событий
export default function initializeEvents() {
  const token = getToken();

  if (token) {
    initializeTaskEvents(token);
    initializeStageEvents(token);
    initializeProjectEvents(token);
  } else {
    console.error("Token not found");
  }
}
