import { Task, TaskData } from "../types";
import { api } from "./api";

const tasksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], string>({
      query: (projectId) => `projects/${projectId}/tasks`,
    }),
    createTask: build.mutation<Task, { projectId: string; data: TaskData }>({
      query: ({ projectId, data }) => ({
        url: `projects/${projectId}/tasks`,
        method: "POST",
        body: data,
      }),
    }),
    updateTask: build.mutation<
      Task,
      { projectId: string; id: string; data: Partial<TaskData> }
    >({
      query: ({ projectId, id, data }) => ({
        url: `projects/${projectId}/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: build.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export const {
  endpoints: { getTasks, createTask, updateTask, deleteTask },
} = tasksApi;

export default tasksApi;
