import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stage } from "../types";
import stagesApi from "../services/stages.api";

interface InitialState {
  stages: Stage[];
  stageLoading: boolean;
  stagesLastFetchTime: number;
}

const initialState: InitialState = {
  stages: [],
  stageLoading: false,
  stagesLastFetchTime: 0,
};

const slice = createSlice({
  name: "stage",
  initialState,
  reducers: {
    addStage: (state, action: PayloadAction<Stage>) => {
      state.stages.push(action.payload);
    },
    deleteStage: (state, action: PayloadAction<string>) => {
      state.stages = state.stages.filter(
        (stage) => stage.id !== action.payload
      );
    },
    updateStage: (state, action: PayloadAction<Stage>) => {
      const index = state.stages.findIndex(
        (stage) => stage.id === action.payload.id
      );
      if (index !== -1) {
        state.stages[index] = action.payload;
      }
    },
    clearStage: () => initialState,
    setStages: (state, action: PayloadAction<Stage[]>) => {
      state.stages = action.payload;
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
        (state, action: PayloadAction<Stage[]>) => {
          state.stages = action.payload;
          state.stageLoading = false;
          state.stagesLastFetchTime = Date.now();
        }
      )
      .addMatcher(stagesApi.endpoints.createStage.matchRejected, (state) => {
        state.stageLoading = false;
      });
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

export const selectStages = (state: { stage: InitialState }) =>
  state.stage.stages;
export const selectStageLoading = (state: { stage: InitialState }) =>
  state.stage.stageLoading;

export default slice.reducer;
