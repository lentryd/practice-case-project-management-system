import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Stage } from "../types";
import stagesApi from "../services/stages.api";

interface InitialState {
  stagesByProjectId: { [projectId: string]: Stage[] };
  stageLoading: boolean;
  stagesLastFetchTime: number;
}

const initialState: InitialState = {
  stagesByProjectId: {},
  stageLoading: false,
  stagesLastFetchTime: 0,
};

const slice = createSlice({
  name: "stage",
  initialState,
  reducers: {
    addStage: (state, action: PayloadAction<Stage>) => {
      const { projectId } = action.payload;
      if (!state.stagesByProjectId[projectId]) {
        state.stagesByProjectId[projectId] = [];
      }
      state.stagesByProjectId[projectId].push(action.payload);
    },
    deleteStage: (state, action: PayloadAction<Stage>) => {
      const { id, projectId } = action.payload;
      state.stagesByProjectId[projectId] = state.stagesByProjectId[
        projectId
      ].filter((stage) => stage.id !== id);
    },
    updateStage: (state, action: PayloadAction<Stage>) => {
      const { id, projectId } = action.payload;
      const index = state.stagesByProjectId[projectId]?.findIndex(
        (stage) => stage.id === id
      );
      if (index !== -1) {
        state.stagesByProjectId[projectId][index] = action.payload;
      }
    },
    clearStage: () => initialState,
    setStages: (
      state,
      action: PayloadAction<{ projectId: string; stages: Stage[] }>
    ) => {
      const { projectId, stages } = action.payload;
      state.stagesByProjectId[projectId] = stages;
    },
    setStageLoading: (state, action: PayloadAction<boolean>) => {
      state.stageLoading = action.payload;
    },
    setStagesLastFetchTime: (state, action: PayloadAction<number>) => {
      state.stagesLastFetchTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(stagesApi.endpoints.getStages.matchPending, (state) => {
        state.stageLoading = true;
      })
      .addMatcher(
        stagesApi.endpoints.getStages.matchFulfilled,
        (state, action) => {
          const projectId = action.meta.arg.originalArgs;
          const stages = action.payload;
          state.stagesByProjectId[projectId] = stages;
          state.stageLoading = false;
          state.stagesLastFetchTime = Date.now();
        }
      )
      .addMatcher(stagesApi.endpoints.getStages.matchRejected, (state) => {
        state.stageLoading = false;
      })
      .addMatcher(
        stagesApi.endpoints.createStage.matchFulfilled,
        (state, action) => {
          const { projectId } = action.meta.arg.originalArgs;
          state.stagesByProjectId[projectId].push(action.payload);
        }
      )
      .addMatcher(
        stagesApi.endpoints.updateStage.matchFulfilled,
        (state, action) => {
          const { projectId } = action.meta.arg.originalArgs;
          const index = state.stagesByProjectId[projectId].findIndex(
            (stage) => stage.id === action.payload.id
          );
          if (index !== -1) {
            state.stagesByProjectId[projectId][index] = action.payload;
          }
        }
      )
      .addMatcher(
        stagesApi.endpoints.deleteStage.matchFulfilled,
        (state, action) => {
          const { projectId, id } = action.meta.arg.originalArgs;
          state.stagesByProjectId[projectId] = state.stagesByProjectId[
            projectId
          ].filter((stage) => stage.id !== id);
        }
      );
  },
});

export const {
  addStage,
  deleteStage,
  updateStage,
  clearStage,
  setStages,
  setStageLoading,
  setStagesLastFetchTime,
} = slice.actions;

// Селекторы
export const selectStagesByProjectId =
  (projectId: string) => (state: { stage: InitialState }) =>
    state.stage.stagesByProjectId[projectId] || [];

export const selectStageById = (id: string, projectId: string) =>
  createSelector([selectStagesByProjectId(projectId)], (stages) =>
    stages.find((stage) => stage.id === id)
  );

export const selectStageLoading = (state: { stage: InitialState }) =>
  state.stage.stageLoading;

export default slice.reducer;
