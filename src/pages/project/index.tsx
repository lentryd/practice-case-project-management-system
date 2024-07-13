import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProjectSelector,
  selectProjectLoading,
} from "../../features/projectSlice";
import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../../services/projects.api";
import { selectStageLoading } from "../../features/stageSlice";
import { selectTaskLoading } from "../../features/taskSlice";
import {
  useCreateStageMutation,
  useGetStagesQuery,
} from "../../services/stages.api";
import { useGetTasksQuery } from "../../services/tasks.api";
import GanttChart from "../../components/GanttChart";
import TaskBoard from "../../components/TaskBoard";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Dialog from "../../components/Dialog";
import "./index.scss";
import { dateToString } from "../../utils/dateToString";
import { selectUser } from "../../features/userSlice";

const DATE_REGEX = /^\d{2}.\d{2}.\d{4}$/;

export default function Project() {
  const { user } = useSelector(selectUser);

  // This is a custom hook that gets the project ID from the URL
  const navigate = useNavigate();
  const { id = "1" } = useParams();

  // This is a custom hook that fetches the project data
  useGetTasksQuery(id);
  useGetStagesQuery(id);

  // This is a custom selector that gets the project data from the store
  const project = useSelector(createProjectSelector(id));
  const projectLoading = useSelector(selectProjectLoading);
  // This is a custom selector that gets the stages data from the store
  const stagesLoading = useSelector(selectStageLoading);
  // This is a custom selector that gets the tasks data from the store
  const tasksLoading = useSelector(selectTaskLoading);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [updateProject, { isLoading: updateLoading }] =
    useUpdateProjectMutation();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");

  const [projectNameError, setProjectNameError] = useState(false);
  const [projectStartDateError, setProjectStartDateError] = useState(false);
  const [projectEndDateError, setProjectEndDateError] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteProject, { isLoading: deleteLoading }] =
    useDeleteProjectMutation();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addStage, { isLoading: addLoading }] = useCreateStageMutation();

  const [stageName, setStageName] = useState("");
  const [stageDescription, setStageDescription] = useState("");
  const [stageStartDate, setStageStartDate] = useState("");
  const [stageEndDate, setStageEndDate] = useState("");

  const [stageNameError, setStageNameError] = useState(false);
  const [stageStartDateError, setStageStartDateError] = useState(false);
  const [stageEndDateError, setStageEndDateError] = useState(false);

  // This is a custom hook that redirects to the home page if the project is not found
  useEffect(() => {
    if (!id || (!project && !projectLoading)) {
      navigate("/", { replace: true });
    }
  }, [id, project, projectLoading, navigate]);

  // This is a custom hook that shows a loading message while the data is being fetched
  if (tasksLoading || stagesLoading || projectLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // This is a custom hook that renders the project data
  if (!project || !user) {
    return null;
  }

  const handleCloseDialogs = () => {
    setShowEditDialog(false);
  };

  const handleEditProject = () => {
    setProjectName(project.name);
    setProjectDescription(project.description || "");
    setProjectStartDate(dateToString(project.startDate).day);
    setProjectEndDate(dateToString(project.endDate).day);

    setProjectNameError(false);
    setProjectStartDateError(false);
    setProjectEndDateError(false);

    setShowEditDialog(true);
  };

  const handleUpdateProject = async () => {
    setProjectNameError(!projectName);
    setProjectStartDateError(!DATE_REGEX.test(projectStartDate));
    setProjectEndDateError(!DATE_REGEX.test(projectEndDate));

    if (
      !projectName ||
      !DATE_REGEX.test(projectStartDate) ||
      !DATE_REGEX.test(projectEndDate)
    ) {
      return;
    }

    const startDate = projectStartDate.split(".").reverse().join("-");
    const endDate = projectEndDate.split(".").reverse().join("-");

    await updateProject({
      id,
      data: {
        name: projectName,
        description: projectDescription || undefined,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      },
    });

    setShowEditDialog(false);
  };

  const handleDeleteProject = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDeleteProject = async () => {
    await deleteProject(id);
    setShowDeleteDialog(false);
  };

  const handleAddStage = () => {
    setStageName("");
    setStageDescription("");
    setStageStartDate("");
    setStageEndDate("");

    setStageNameError(false);
    setStageStartDateError(false);
    setStageEndDateError(false);

    setShowAddDialog(true);
  };

  const handleCreateStage = async () => {
    setStageNameError(!stageName);
    setStageStartDateError(!DATE_REGEX.test(stageStartDate));
    setStageEndDateError(!DATE_REGEX.test(stageEndDate));

    if (
      !stageName ||
      !DATE_REGEX.test(stageStartDate) ||
      !DATE_REGEX.test(stageEndDate)
    ) {
      return;
    }

    const startDate = stageStartDate.split(".").reverse().join("-");
    const endDate = stageEndDate.split(".").reverse().join("-");

    await addStage({
      projectId: id,
      data: {
        name: stageName,
        description: stageDescription || undefined,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    setShowAddDialog(false);
  };

  return (
    <>
      <Dialog
        title="Редактировать проект"
        description="Измените данные проекта"
        modelValue={showEditDialog}
        onModelValueChange={setShowEditDialog}
      >
        {{
          body: [
            <TextField
              label="Название проекта"
              error={projectNameError}
              errorMsg="Введите название проекта"
              modelValue={projectName}
              onUpdateModelValue={setProjectName}
            />,
            <TextField
              label="Описание проекта"
              modelValue={projectDescription}
              onUpdateModelValue={setProjectDescription}
            />,
            <TextField
              label="Дата начала проекта"
              error={projectStartDateError}
              errorMsg="Введите в формате ДД.ММ.ГГГГ"
              modelValue={projectStartDate}
              onUpdateModelValue={setProjectStartDate}
            />,
            <TextField
              label="Дата окончания проекта"
              error={projectEndDateError}
              errorMsg="Введите в формате ДД.ММ.ГГГГ"
              modelValue={projectEndDate}
              onUpdateModelValue={setProjectEndDate}
            />,
          ],
          actions: [
            <Button label="Отмена" onClick={handleCloseDialogs} />,
            <Button
              label="Сохранить"
              filled
              onClick={handleUpdateProject}
              loading={updateLoading}
            />,
          ],
        }}
      </Dialog>

      <Dialog
        title="Удалить проект"
        description="Вы уверены, что хотите удалить проект?"
        modelValue={showDeleteDialog}
        onModelValueChange={setShowDeleteDialog}
      >
        {{
          icon: <span className="material-symbols-rounded">delete</span>,
          actions: [
            <Button label="Отмена" onClick={handleCloseDialogs} />,
            <Button
              label="Удалить"
              filled
              onClick={handleConfirmDeleteProject}
              loading={deleteLoading}
            />,
          ],
        }}
      </Dialog>

      <Dialog
        title="Добавить этап"
        description="Введите данные этапа"
        modelValue={showAddDialog}
        onModelValueChange={setShowAddDialog}
      >
        {{
          body: [
            <TextField
              label="Название этапа"
              error={stageNameError}
              errorMsg="Введите название этапа"
              modelValue={stageName}
              onUpdateModelValue={setStageName}
            />,
            <TextField
              label="Описание этапа"
              modelValue={stageDescription}
              onUpdateModelValue={setStageDescription}
            />,
            <TextField
              label="Дата начала этапа"
              error={stageStartDateError}
              errorMsg="Введите в формате ДД.ММ.ГГГГ"
              modelValue={stageStartDate}
              onUpdateModelValue={setStageStartDate}
            />,
            <TextField
              label="Дата окончания этапа"
              error={stageEndDateError}
              errorMsg="Введите в формате ДД.ММ.ГГГГ"
              modelValue={stageEndDate}
              onUpdateModelValue={setStageEndDate}
            />,
          ],
          actions: [
            <Button label="Отмена" onClick={handleCloseDialogs} />,
            <Button
              label="Добавить"
              filled
              onClick={handleCreateStage}
              loading={addLoading}
            />,
          ],
        }}
      </Dialog>

      <div className="project-info">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>

      <div className="project-actions">
        <Button label="Добавить этап" filled onClick={handleAddStage}>
          <span className="material-symbols-rounded">add</span>
        </Button>
        <Button label="Редактировать проект" onClick={handleEditProject}>
          <span className="material-symbols-rounded">edit</span>
        </Button>
        {project.ownerId === user.id && (
          <Button label="Удалить проект" onClick={handleDeleteProject}>
            <span className="material-symbols-rounded">delete</span>
          </Button>
        )}
      </div>

      <h2 className="project-title">Доска задач</h2>

      <TaskBoard projectId={id} />

      <h2 className="project-title">Таблица задач</h2>

      <GanttChart projectId={id} />

      <br />
    </>
  );
}
