import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTasksQuery } from "../../services/tasks.api";
import { useGetStagesQuery } from "../../services/stages.api";
import { useGetProjectQuery } from "../../services/projects.api";
import { selectUser } from "../../features/userSlice";
import { createProjectSelector } from "../../features/projectSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import ToggleButton from "@mui/material/ToggleButton";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TableChartRounded from "@mui/icons-material/TableChartRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import Loader from "../../components/Loader";
import TaskBoard from "../../components/TaskBoard";
import GanttChart from "../../components/GanttChart";
import StageDialog from "../../components/StageDialog";
import ProjectDialog from "../../components/ProjectDialog";
import DeleteProjectDialog from "../../components/ProjectDialog/delete";
import { dateToString } from "../../utils/dateToString";

export default function Project() {
  const { user } = useSelector(selectUser);

  const navigate = useNavigate();
  const { id = "1" } = useParams();
  const project = useSelector(createProjectSelector(id));

  const { isLoading: tasksLoading } = useGetTasksQuery(id);
  const { isLoading: stagesLoading } = useGetStagesQuery(id);
  const { isLoading: projectLoading } = useGetProjectQuery(id);

  const [addStage, setAddStage] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);
  const [currentTab, setCurrentTab] = useState<"board" | "chart">("board");

  const handleTabChange = (val: string) => {
    if (!["board", "chart"].includes(val)) return;
    setCurrentTab(val as "board" | "chart");
  };

  useEffect(() => {
    if (!projectLoading && !project) {
      navigate("/", { replace: true });
    }
  }, [id, project, projectLoading, navigate]);

  if (!project && projectLoading) {
    return <Loader />;
  }

  if (!project || !user) {
    return null;
  }

  return (
    <>
      <ProjectDialog
        id={project.id}
        show={editProject}
        onClose={setEditProject}
      />

      <DeleteProjectDialog
        id={project.id}
        show={deleteProject}
        onClose={setDeleteProject}
      />

      <StageDialog
        projectId={project.id}
        show={addStage}
        onClose={setAddStage}
      />

      <Box>
        <Typography variant="h4" component="h1">
          {project.name}
        </Typography>

        <Typography variant="subtitle1" component="p" color="text.secondary">
          {dateToString(project.startDate).day} -{" "}
          {dateToString(project.endDate).day}
        </Typography>

        <Typography variant="body1" component="p" sx={{ mt: 1 }}>
          {project.description}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddRounded />}
              onClick={() => setAddStage(true)}
            >
              Добавить этап
            </Button>
          </Grid>

          <Grid item>
            <Button
              startIcon={<EditRounded />}
              onClick={() => setEditProject(true)}
            >
              Редактировать проект
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="error"
              startIcon={<DeleteRounded />}
              onClick={() => setDeleteProject(true)}
            >
              Удалить проект
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
            {currentTab === "board" ? "Доска задач" : "Таблица задач"}
          </Typography>

          <ToggleButtonGroup
            value={currentTab}
            exclusive
            onChange={(_, val) => handleTabChange(val)}
          >
            <ToggleButton value="board">
              <TableChartRounded />
            </ToggleButton>

            <ToggleButton value="chart">
              <CalendarMonthRounded />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          {tasksLoading || stagesLoading ? (
            <Loader />
          ) : currentTab === "board" ? (
            <TaskBoard projectId={id} />
          ) : (
            <GanttChart projectId={id} />
          )}
        </Box>
      </Box>
    </>
  );
}
