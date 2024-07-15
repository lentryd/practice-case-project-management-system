import { useSelector } from "react-redux";
import { selectProjectLoading } from "../../features/projectSlice";
import { useGetAllProjectsQuery } from "../../services/projects.api";
import { createProjectIdsSelector } from "../../features/projectSlice";
import Grid from "@mui/material/Grid";
import ProjectCard from "../../components/ProjectCard";
import ProjectCardSkeleton from "../../components/ProjectCard/skeleton";

export default function Main() {
  useGetAllProjectsQuery();
  const selector = createProjectIdsSelector();
  const projectIds = useSelector(selector);
  const isLoading = useSelector(selectProjectLoading);

  return (
    <Grid container spacing={2}>
      {isLoading
        ? [...Array(6)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <ProjectCardSkeleton />
            </Grid>
          ))
        : projectIds.map((id) => (
            <Grid key={id} item xs={12} sm={6}>
              <ProjectCard projectId={id} />
            </Grid>
          ))}
    </Grid>
  );
}
