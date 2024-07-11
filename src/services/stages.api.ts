import { api } from "./api";
import { Stage, StageData } from "../types";

const stagesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStages: build.query<Stage[], string>({
      query: (projectId) => `projects/${projectId}/stages`,
    }),
    createStage: build.mutation<Stage, { projectId: string; data: StageData }>({
      query: ({ projectId, data }) => ({
        url: `projects/${projectId}/stages`,
        method: "POST",
        body: data,
      }),
    }),
    updateStage: build.mutation<
      Stage,
      { projectId: string; id: string; data: Partial<StageData> }
    >({
      query: ({ projectId, id, data }) => ({
        url: `projects/${projectId}/stages/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteStage: build.mutation<void, { projectId: string; id: string }>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/stages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetStagesQuery,
  useCreateStageMutation,
  useUpdateStageMutation,
  useDeleteStageMutation,
} = stagesApi;

export const {
  endpoints: { getStages, createStage, updateStage, deleteStage },
} = stagesApi;

export default stagesApi;
