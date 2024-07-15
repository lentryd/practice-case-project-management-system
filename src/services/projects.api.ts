import { TypedUseQuery, TypedUseMutation } from "@reduxjs/toolkit/query/react";
import { api, baseQuery } from "./api";
import { ProjectData, Project } from "../types";

const projectsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProjects: build.query<Project[], void>({
      query: () => "projects",
    }),
    getProject: build.query<Project, string>({
      query: (id) => `projects/${id}`,
    }),
    createProject: build.mutation<Project, ProjectData>({
      query: (data) => ({
        url: "projects",
        method: "POST",
        body: data,
      }),
    }),
    updateProject: build.mutation<
      Project,
      { id: string; data: Partial<ProjectData> }
    >({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProject: build.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const useGetAllProjectsQuery: TypedUseQuery<
  Project[],
  void,
  typeof baseQuery
> = projectsApi.endpoints.getAllProjects.useQuery;
export const useGetProjectQuery: TypedUseQuery<
  Project,
  string,
  typeof baseQuery
> = projectsApi.endpoints.getProject.useQuery;
export const useCreateProjectMutation: TypedUseMutation<
  Project,
  ProjectData,
  typeof baseQuery
> = projectsApi.endpoints.createProject.useMutation;
export const useUpdateProjectMutation: TypedUseMutation<
  Project,
  { id: string; data: Partial<ProjectData> },
  typeof baseQuery
> = projectsApi.endpoints.updateProject.useMutation;
export const useDeleteProjectMutation: TypedUseMutation<
  void,
  string,
  typeof baseQuery
> = projectsApi.endpoints.deleteProject.useMutation;

export default projectsApi;
