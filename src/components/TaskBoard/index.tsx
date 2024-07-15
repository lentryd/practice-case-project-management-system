import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useUpdateTaskMutation } from "../../services/tasks.api";
import { createProjectSelector } from "../../features/projectSlice";
import { selectTasksByProjectId } from "../../features/taskSlice";
import { selectStagesByProjectId } from "../../features/stageSlice";
import { updateTask as updateTaskAction } from "../../features/taskSlice";
import Grid from "@mui/material/Grid";
import Column from "./Column";
import "./index.scss";

type Props = {
  projectId: string;
};

const TaskBoard: FC<Props> = ({ projectId }) => {
  const dispatch = useDispatch();
  const [updateTask] = useUpdateTaskMutation();

  // This is a custom selector that gets the project data from the store
  const project = useSelector(createProjectSelector(projectId));
  const stages = useSelector(selectStagesByProjectId(projectId));
  const tasks = useSelector(selectTasksByProjectId(projectId));

  // If the project is not found, return null
  if (!project) {
    return null;
  }

  // This function is called when a task is dragged and dropped
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Do nothing if the task is dropped outside the droppable area
    if (!destination) {
      return;
    }

    const oldStageId = source.droppableId;
    const newStageId = destination.droppableId;
    const oldIndexAtStage = source.index;
    const newIndexAtStage = destination.index;

    // Do nothing if the task is dropped in the same place
    if (newStageId === oldStageId && newIndexAtStage === oldIndexAtStage) {
      return;
    }

    // Обновляем числа в индексах задач
    if (oldStageId !== newStageId) {
      // If task is moved to a different stage
      // Decrement indices of tasks in old stage
      tasks
        .filter(
          (t) => t.stageId === oldStageId && t.indexAtStage > oldIndexAtStage
        )
        .forEach((t) => {
          dispatch(
            updateTaskAction({
              ...t,
              indexAtStage: t.indexAtStage - 1,
            })
          );
        });

      // Increment indices of tasks in new stage
      tasks
        .filter(
          (t) => t.stageId === newStageId && t.indexAtStage >= newIndexAtStage
        )
        .forEach((t) => {
          dispatch(
            updateTaskAction({
              ...t,
              indexAtStage: t.indexAtStage + 1,
            })
          );
        });
    } else {
      // If task is moved within the same stage
      if (newIndexAtStage < oldIndexAtStage) {
        // Increment indices of tasks between newIndexAtStage and oldIndexAtStage
        tasks
          .filter(
            (t) =>
              t.stageId === oldStageId &&
              t.indexAtStage >= newIndexAtStage &&
              t.indexAtStage < oldIndexAtStage
          )
          .forEach((t) => {
            dispatch(
              updateTaskAction({
                ...t,
                indexAtStage: t.indexAtStage + 1,
              })
            );
          });
      } else if (newIndexAtStage > oldIndexAtStage) {
        // Decrement indices of tasks between oldIndexAtStage and newIndexAtStage
        tasks
          .filter(
            (t) =>
              t.stageId === oldStageId &&
              t.indexAtStage > oldIndexAtStage &&
              t.indexAtStage <= newIndexAtStage
          )
          .forEach((t) => {
            dispatch(
              updateTaskAction({
                ...t,
                indexAtStage: t.indexAtStage - 1,
              })
            );
          });
      }
    }

    // Получаем задачу, которую перемещаем
    const originalTask = tasks.find((t) => t.id === draggableId);
    if (!originalTask) return;

    // Update the task in the frontend
    dispatch(
      updateTaskAction({
        ...originalTask,
        stageId: destination.droppableId,
        indexAtStage: destination.index,
      })
    );

    // Update the task at the backend
    updateTask({
      id: draggableId,
      projectId,
      data: {
        stageId: destination.droppableId,
        indexAtStage: destination.index,
      },
    })
      .unwrap()
      .catch((error) => {
        console.error("Failed to update task:", error);
        dispatch(updateTaskAction(originalTask));
      });

    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2} wrap="nowrap" sx={{ overflowX: "auto" }}>
        {stages.map((stage) => {
          const tasksInStage = tasks.filter((t) => t.stageId === stage.id);
          return (
            <Grid item key={stage.id} xs={8} sm={4} minWidth={300}>
              <Column key={stage.id} stage={stage} tasks={tasksInStage} />
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
  );
};

export default TaskBoard;
