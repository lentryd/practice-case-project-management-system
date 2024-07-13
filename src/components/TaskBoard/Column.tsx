import { FC, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Stage, Task as TaskType } from "../../types";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import Dialog from "../Dialog";
import Task from "./Task";
import {
  useDeleteStageMutation,
  useUpdateStageMutation,
} from "../../services/stages.api";
import { dateToString } from "../../utils/dateToString";
import { useCreateTaskMutation } from "../../services/tasks.api";

type Props = {
  stage: Stage;
  tasks: TaskType[];
};

const DATE_REGEX = /^(\d{2})\.(\d{2})\.(\d{4})$/;

const Column: FC<Props> = ({ stage, tasks }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);

  const [deleteStage, { isLoading: deleteLoading }] = useDeleteStageMutation();
  const [updateStage, { isLoading: updateLoading }] = useUpdateStageMutation();
  const [createTask, { isLoading: createLoading }] = useCreateTaskMutation();

  const [stageName, setStageName] = useState(stage.name);
  const [stageDescription, setStageDescription] = useState(stage.description);
  const [stageStartDate, setStageStartDate] = useState(
    dateToString(stage.startDate).day
  );
  const [stageEndDate, setStageEndDate] = useState(
    dateToString(stage.endDate).day
  );

  const [stageNameError, setStageNameError] = useState(false);
  const [stageStartDateError, setStageStartDateError] = useState(false);
  const [stageEndDateError, setStageEndDateError] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const [taskNameError, setTaskNameError] = useState(false);
  const [taskStartDateError, setTaskStartDateError] = useState(false);
  const [taskEndDateError, setTaskEndDateError] = useState(false);

  const handleEdit = () => {
    setStageName(stage.name);
    setStageDescription(stage.description);
    setStageStartDate(dateToString(stage.startDate).day);
    setStageEndDate(dateToString(stage.endDate).day);

    setStageNameError(false);
    setStageStartDateError(false);
    setStageEndDateError(false);

    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleAddTask = () => {
    setTaskName("");
    setTaskDescription("");
    setTaskStartDate("");
    setTaskEndDate("");

    setTaskNameError(false);
    setTaskStartDateError(false);
    setTaskEndDateError(false);

    setAddTaskDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setAddTaskDialogOpen(false);
  };

  const handleUpdateStage = async () => {
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

    const startDate = stageStartDate.split(".").map(Number).reverse().join("-");
    const endDate = stageEndDate.split(".").map(Number).reverse().join("-");

    await updateStage({
      ...stage,
      data: {
        name: stageName,
        description: stageDescription,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    setEditDialogOpen(false);
  };

  const handleCreateTask = async () => {
    setTaskNameError(!taskName);
    setTaskStartDateError(!DATE_REGEX.test(taskStartDate));
    setTaskEndDateError(!DATE_REGEX.test(taskEndDate));

    if (
      !taskName ||
      !DATE_REGEX.test(taskStartDate) ||
      !DATE_REGEX.test(taskEndDate)
    ) {
      return;
    }

    const startDate = taskStartDate.split(".").map(Number).reverse().join("-");
    const endDate = taskEndDate.split(".").map(Number).reverse().join("-");

    await createTask({
      ...stage,
      data: {
        name: taskName,
        description: taskDescription,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        stageId: stage.id,
        indexAtStage: tasks.length + 1,
      },
    });

    setAddTaskDialogOpen(false);
  };

  return (
    <>
      <Dialog
        title="Удалить этап?"
        description={`Вы уверены, что хотите удалить этап "${stage.name}"? Все задачи этапа будут также удалены.`}
        modelValue={deleteDialogOpen}
        onModelValueChange={setDeleteDialogOpen}
      >
        {{
          icon: <span className="material-symbols-rounded">delete</span>,
          actions: [
            <Button label="Отмена" onClick={handleCloseDialogs} />,
            <Button
              label="Удалить"
              filled
              loading={deleteLoading}
              onClick={() => deleteStage({ ...stage })}
            />,
          ],
        }}
      </Dialog>

      <Dialog
        title="Изменить этап"
        description={`Введите новые данные этапа "${stage.name}"`}
        modelValue={editDialogOpen}
        onModelValueChange={setEditDialogOpen}
      >
        {{
          body: [
            <TextField
              key="name"
              label="Название этапа"
              error={stageNameError}
              errorMsg="Введите название этапа"
              modelValue={stageName}
              onUpdateModelValue={setStageName}
            />,
            <TextField
              key="description"
              label="Описание этапа"
              modelValue={stageDescription}
              onUpdateModelValue={setStageDescription}
            />,
            <TextField
              key="startDate"
              label="Дата начала"
              error={stageStartDateError}
              errorMsg="Введите в формате дд.мм.гггг"
              modelValue={stageStartDate}
              onUpdateModelValue={setStageStartDate}
            />,
            <TextField
              key="endDate"
              label="Дата окончания"
              error={stageEndDateError}
              errorMsg="Введите в формате дд.мм.гггг"
              modelValue={stageEndDate}
              onUpdateModelValue={setStageEndDate}
            />,
          ],
          actions: [
            <Button label="Отмена" onClick={handleCloseDialogs} />,
            <Button
              label="Сохранить"
              filled
              loading={updateLoading}
              onClick={handleUpdateStage}
            />,
          ],
        }}
      </Dialog>

      <Dialog
        title="Добавить задачу"
        description={`Введите данные новой задачи для этапа "${stage.name}"`}
        modelValue={addTaskDialogOpen}
        onModelValueChange={setAddTaskDialogOpen}
      >
        {{
          body: [
            <TextField
              key="name"
              label="Название задачи"
              error={taskNameError}
              errorMsg="Введите название задачи"
              modelValue={taskName}
              onUpdateModelValue={setTaskName}
            />,
            <TextField
              key="description"
              label="Описание задачи"
              modelValue={taskDescription}
              onUpdateModelValue={setTaskDescription}
            />,
            <TextField
              key="startDate"
              label="Дата начала"
              error={taskStartDateError}
              errorMsg="Введите в формате дд.мм.гггг"
              modelValue={taskStartDate}
              onUpdateModelValue={setTaskStartDate}
            />,
            <TextField
              key="endDate"
              label="Дата окончания"
              error={taskEndDateError}
              errorMsg="Введите в формате дд.мм.гггг"
              modelValue={taskEndDate}
              onUpdateModelValue={setTaskEndDate}
            />,
          ],
          actions: [
            <Button label="Отмена" onClick={handleCloseDialogs} />,
            <Button
              label="Создать"
              filled
              loading={createLoading}
              onClick={handleCreateTask}
            />,
          ],
        }}
      </Dialog>

      <div className="board-column">
        <div className="info">
          <h3>{stage.name}</h3>
          {stage.description && <p>{stage.description}</p>}

          <div className="menu">
            <Button onClick={handleDelete}>
              <span className="material-symbols-rounded">delete</span>
            </Button>
            <Button onClick={handleEdit}>
              <span className="material-symbols-rounded">edit</span>
            </Button>
            <Button onClick={handleAddTask}>
              <span className="material-symbols-rounded">add</span>
            </Button>
          </div>
        </div>
        <Droppable droppableId={stage.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="column-content"
            >
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default Column;
