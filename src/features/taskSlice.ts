import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types";
import tasksApi from "../services/tasks.api";

interface InitialState {
  tasks: Task[];
  taskLoading: boolean;
  tasksLastFetchTime: number;
}

const initialState: InitialState = {
  tasks: [],
  taskLoading: false,
  tasksLastFetchTime: 0,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    clearTask: () => initialState,
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
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
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.taskLoading = false;
          state.tasksLastFetchTime = Date.now();
        }
      )
      .addMatcher(tasksApi.endpoints.createTask.matchRejected, (state) => {
        state.taskLoading = false;
      });
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

export const selectTasks = (state: { task: InitialState }) => state.task.tasks;
export const selectTaskLoading = (state: { task: InitialState }) =>
  state.task.taskLoading;

export default slice.reducer;
