import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Task } from "../types";
import tasksApi from "../services/tasks.api";

interface InitialState {
  tasksByProjectId: { [projectId: string]: Task[] };
  taskLoading: boolean;
  tasksLastFetchTime: number;
}

const initialState: InitialState = {
  tasksByProjectId: {},
  taskLoading: false,
  tasksLastFetchTime: 0,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const { projectId } = action.payload;
      if (!state.tasksByProjectId[projectId]) {
        state.tasksByProjectId[projectId] = [];
      }
      state.tasksByProjectId[projectId].push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      const { id, projectId } = action.payload;
      state.tasksByProjectId[projectId] = state.tasksByProjectId[
        projectId
      ].filter((task) => task.id !== id);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const { id, projectId } = action.payload;
      const index = state.tasksByProjectId[projectId]?.findIndex(
        (task) => task.id === id
      );
      if (index !== -1) {
        state.tasksByProjectId[projectId][index] = action.payload;
      }
    },
    clearTask: () => initialState,
    setTasks: (
      state,
      action: PayloadAction<{ projectId: string; tasks: Task[] }>
    ) => {
      const { projectId, tasks } = action.payload;
      state.tasksByProjectId[projectId] = tasks;
    },
    setTaskLoading: (state, action: PayloadAction<boolean>) => {
      state.taskLoading = action.payload;
    },
    setTasksLastFetchTime: (state, action: PayloadAction<number>) => {
      state.tasksLastFetchTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(tasksApi.endpoints.getTasks.matchPending, (state) => {
        state.taskLoading = true;
      })
      .addMatcher(
        tasksApi.endpoints.getTasks.matchFulfilled,
        (state, action) => {
          const tasks = action.payload;
          const projectId = action.meta.arg.originalArgs;
          state.tasksByProjectId[projectId] = tasks;
          state.taskLoading = false;
          state.tasksLastFetchTime = Date.now();
        }
      )
      .addMatcher(tasksApi.endpoints.getTasks.matchRejected, (state) => {
        state.taskLoading = false;
      })
      .addMatcher(
        tasksApi.endpoints.createTask.matchFulfilled,
        (state, action) => {
          const task = action.payload;
          const projectId = action.meta.arg.originalArgs.projectId;
          state.tasksByProjectId[projectId].push(task);
        }
      )
      .addMatcher(
        tasksApi.endpoints.updateTask.matchFulfilled,
        (state, action) => {
          const task = action.payload;
          const projectId = action.meta.arg.originalArgs.projectId;
          const index = state.tasksByProjectId[projectId].findIndex(
            (t) => t.id === task.id
          );
          if (index !== -1) {
            state.tasksByProjectId[projectId][index] = task;
          } else {
            state.tasksByProjectId[projectId].push(task);
          }
        }
      )
      .addMatcher(
        tasksApi.endpoints.deleteTask.matchFulfilled,
        (state, action) => {
          const { id, projectId } = action.meta.arg.originalArgs;
          state.tasksByProjectId[projectId] = state.tasksByProjectId[
            projectId
          ].filter((task) => task.id !== id);
        }
      );
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  clearTask,
  setTasks,
  setTaskLoading,
  setTasksLastFetchTime,
} = slice.actions;

// Selectors
const getTasksByProjectId =
  (projectId: string) => (state: { task: InitialState }) =>
    state.task.tasksByProjectId[projectId] || [];

export const selectTasksByProjectId = (projectId: string) =>
  createSelector([getTasksByProjectId(projectId)], (tasks) =>
    [...tasks].sort((a, b) => a.indexAtStage - b.indexAtStage)
  );

export const selectTaskById = (id: string, projectId: string) =>
  createSelector([selectTasksByProjectId(projectId)], (tasks) =>
    tasks.find((task) => task.id === id)
  );

export const selectTaskByStageId = (stageId: string, projectId: string) =>
  createSelector([selectTasksByProjectId(projectId)], (tasks) =>
    tasks.filter((task) => task.stageId === stageId)
  );

export const selectTaskIdsByStageId = (stageId: string, projectId: string) =>
  createSelector([selectTaskByStageId(stageId, projectId)], (tasks) =>
    tasks.map((task) => task.id)
  );

export const selectTaskLoading = (state: { task: InitialState }) =>
  state.task.taskLoading;

export default slice.reducer;
