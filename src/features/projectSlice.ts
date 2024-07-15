import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import projectsApi from "../services/projects.api";
import { Project } from "../types";

interface InitialState {
  projects: Project[];
  projectLoading: boolean;
  projectsLastFetchTime: number;
}

const initialState: InitialState = {
  projects: [],
  projectLoading: false,
  projectsLastFetchTime: 0,
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setProjectLoading: (state, action: PayloadAction<boolean>) => {
      state.projectLoading = action.payload;
    },
    setProjectsLastFetchTime: (state, action: PayloadAction<number>) => {
      state.projectsLastFetchTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        projectsApi.endpoints.getAllProjects.matchPending,
        (state) => {
          state.projectLoading = true;
        }
      )
      .addMatcher(
        projectsApi.endpoints.getAllProjects.matchFulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload;
          state.projectLoading = false;
          state.projectsLastFetchTime = Date.now();
        }
      )
      .addMatcher(
        projectsApi.endpoints.getAllProjects.matchRejected,
        (state) => {
          state.projectLoading = false;
        }
      )
      .addMatcher(projectsApi.endpoints.getProject.matchPending, (state) => {
        state.projectLoading = true;
      })
      .addMatcher(
        projectsApi.endpoints.getProject.matchFulfilled,
        (state, action) => {
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          } else {
            state.projects.push(action.payload);
          }
          state.projectLoading = false;
        }
      )
      .addMatcher(projectsApi.endpoints.getProject.matchRejected, (state) => {
        state.projectLoading = false;
      })
      .addMatcher(
        projectsApi.endpoints.createProject.matchFulfilled,
        (state, action) => {
          state.projects.push(action.payload);
        }
      )
      .addMatcher(
        projectsApi.endpoints.updateProject.matchFulfilled,
        (state, action) => {
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
        }
      )
      .addMatcher(
        projectsApi.endpoints.deleteProject.matchFulfilled,
        (state, action) => {
          state.projects = state.projects.filter(
            (project) => project.id !== action.meta.arg.originalArgs
          );
        }
      );
  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
  setProjects,
  setProjectLoading,
  setProjectsLastFetchTime,
} = slice.actions;

// Selectors
export const selectProjects = (state: { project: InitialState }) =>
  state.project.projects;

export const selectProjectLoading = (state: { project: InitialState }) =>
  state.project.projectLoading;

export const createProjectSelector = (id: string) =>
  createSelector([selectProjects], (projects) =>
    projects.find((project) => project.id === id)
  );

export const createProjectIdsSelector = () =>
  createSelector([selectProjects], (projects) =>
    projects.map((project) => project.id)
  );

export default slice.reducer;
