import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProjectSelector } from "../../features/projectSlice";
import { selectUser } from "../../features/userSlice";
import { dateToString } from "../../utils/dateToString";
import "./index.scss";

type Props = {
  projectId: string;
};

const ProjectCard: FC<Props> = ({ projectId }) => {
  const { user } = useSelector(selectUser);
  const selector = createProjectSelector(projectId);
  const project = useSelector(selector);
  const navigate = useNavigate();

  if (!project) {
    return null;
  }

  return (
    <>
      <div
        className="projectCard"
        onClick={() => navigate(`/projects/${project.id}`)}
      >
        <div className="info">
          <h2>{project.name}</h2>
          {project.description && <p>{project.description}</p>}
        </div>

        <div className="details">
          <span className="badge">
            Автор: {project.owner.name}{" "}
            {user?.id === project.owner.id && "(Вы)"}
          </span>
          <span className="badge">
            Начало: {dateToString(project.startDate).day}
          </span>
          <span className="badge red">
            Конец: {dateToString(project.endDate).day}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
