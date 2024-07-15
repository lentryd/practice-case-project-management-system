import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { createProjectSelector } from "../../features/projectSlice";
import { selectUser } from "../../features/userSlice";
import { dateToString } from "../../utils/dateToString";

type Props = {
  projectId: string;
};

const ProjectCard: FC<Props> = ({ projectId }) => {
  const { user } = useSelector(selectUser);
  const project = useSelector(createProjectSelector(projectId));
  const navigate = useNavigate();

  if (!project) {
    return null;
  }

  const handleOpenProject = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleOpenProject}>
        <CardHeader
          title={project.name}
          subheader={
            dateToString(project.startDate).day +
            " - " +
            dateToString(project.endDate).day
          }
        />
        <CardContent>
          <Typography paragraph>{project.description}</Typography>
          <Typography paragraph>
            Автор: {project.owner.name}{" "}
            {project.owner.id === user?.id && "(Вы)"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
