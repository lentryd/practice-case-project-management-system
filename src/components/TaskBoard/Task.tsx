import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task as TaskType } from "../../types";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../services/tasks.api";
import { dateToString } from "../../utils/dateToString";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import Dialog from "../Dialog";

interface Props {
  task: TaskType;
}

const DATE_REGEX = /^\d{2}\.\d{2}\.\d{4}$/;

const Task: FC<Props> = ({ task }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation();

  const [showEditDialog, setShowDialog] = useState(false);
  const [editTask, { isLoading: editLoading }] = useUpdateTaskMutation();

  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskStartDate, setTaskStartDate] = useState(
    dateToString(task.startDate).day
  );
  const [taskEnd, setTaskStartEnd] = useState(dateToString(task.endDate).day);

  const [taskNameError, setTaskNameError] = useState(false);
  const [taskStartDateError, setTaskStartDateError] = useState(false);
  const [taskEndDateError, setTaskEndDateError] = useState(false);

  const openEditDialog = () => {
    setTaskName(task.name);
    setTaskDescription(task.description);
    setTaskStartDate(dateToString(task.startDate).day);
    setTaskStartEnd(dateToString(task.endDate).day);

    setTaskNameError(false);
    setTaskEndDateError(false);
    setTaskStartDateError(false);

    setShowDialog(true);
  };

  const editHandler = async () => {
    setTaskNameError(!taskName);
    setTaskStartDateError(!DATE_REGEX.test(taskStartDate));
    setTaskEndDateError(!DATE_REGEX.test(taskEnd));

    if (
      !taskName ||
      !DATE_REGEX.test(taskStartDate) ||
      !DATE_REGEX.test(taskEnd)
    ) {
      return;
    }

    const startDate = taskStartDate.split(".").map(Number).reverse().join("-");
    const endDate = taskEnd.split(".").map(Number).reverse().join("-");

    await editTask({
      ...task,
      data: {
        name: taskName,
        description: taskDescription,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    setShowDialog(false);
  };

  return (
    <>
      <Dialog
        title="Удаление задачи"
        description={`Вы уверены, что хотите удалить задачу "${task.name}"?`}
        modelValue={showDeleteDialog}
        onModelValueChange={setShowDeleteDialog}
      >
        {{
          icon: <span className="material-symbols-rounded">delete</span>,
          actions: [
            <Button
              label="Отмена"
              onClick={() => setShowDeleteDialog(false)}
            />,
            <Button
              label="Удалить"
              filled
              loading={deleteLoading}
              onClick={() => deleteTask({ ...task })}
            />,
          ],
        }}
      </Dialog>

      <Dialog
        title="Изменение задачи"
        description="Введите новые данные для задачи"
        modelValue={showEditDialog}
        onModelValueChange={setShowDialog}
      >
        {{
          body: [
            <TextField
              label="Название"
              error={taskNameError}
              errorMsg="Название не может быть пустым"
              modelValue={taskName}
              onUpdateModelValue={(v) => {
                setTaskName(v);
                setTaskNameError(false);
              }}
            />,
            <TextField
              label="Описание"
              modelValue={taskDescription}
              onUpdateModelValue={setTaskDescription}
            />,
            <TextField
              label="Дата начала"
              error={taskStartDateError}
              errorMsg="Введите в формате ДД.ММ.ГГГГ"
              modelValue={taskStartDate}
              onUpdateModelValue={(v) => {
                setTaskStartDate(v);
                setTaskStartDateError(false);
              }}
            />,
            <TextField
              label="Дата окончания"
              error={taskEndDateError}
              errorMsg="Введите в формате ДД.ММ.ГГГГ"
              modelValue={taskEnd}
              onUpdateModelValue={(v) => {
                setTaskStartEnd(v);
                setTaskEndDateError(false);
              }}
            />,
          ],
          actions: [
            <Button label="Отмена" onClick={() => setShowDialog(false)} />,
            <Button
              label="Сохранить"
              filled
              loading={editLoading}
              onClick={editHandler}
            />,
          ],
        }}
      </Dialog>

      <Draggable draggableId={task.id} index={task.indexAtStage}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="board-task"
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <div className="info">
              <h4>{task.name}</h4>
              {task.description && <p>{task.description}</p>}
            </div>

            <div className="details">
              <div>
                <span className="material-symbols-rounded">today</span>
                <span>{dateToString(task.startDate).day}</span>
              </div>
              <div>
                <span className="material-symbols-rounded">event</span>
                <span>{dateToString(task.endDate).day}</span>
              </div>
            </div>

            <div className="actions">
              <Button onClick={() => setShowDeleteDialog(true)}>
                <span className="material-symbols-rounded">delete</span>
              </Button>
              <Button onClick={openEditDialog}>
                <span className="material-symbols-rounded">edit</span>
              </Button>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
