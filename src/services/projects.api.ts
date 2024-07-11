import { api } from "./api";
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

export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;

export const {
  endpoints: {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  },
} = projectsApi;

export default projectsApi;
