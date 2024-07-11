import { useSelector } from "react-redux";
import {
  createProjectIdsSelector,
  selectProjectLoading,
} from "../../features/projectSlice";
import { useGetAllProjectsQuery } from "../../services/projects.api";
import ProjectCard from "../../components/ProjectCard";
import "./index.scss";

export default function Main() {
  useGetAllProjectsQuery();
  const selector = createProjectIdsSelector();
  const projectIds = useSelector(selector);
  const isLoading = useSelector(selectProjectLoading);

  return isLoading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    <div className="projects-list">
      {projectIds.map((id) => (
        <ProjectCard key={id} projectId={id} />
      ))}
    </div>
  );
}
