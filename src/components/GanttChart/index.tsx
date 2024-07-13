import { FC } from "react";
import { Task, Gantt } from "gantt-task-react";
import { useSelector, useDispatch } from "react-redux";
import { formatGattData } from "../../utils/formatGattData";
import { createProjectSelector } from "../../features/projectSlice";
import { selectStagesByProjectId } from "../../features/stageSlice";
import {
  updateTask as updateTaskAction,
  selectTasksByProjectId,
} from "../../features/taskSlice";
import { useUpdateTaskMutation } from "../../services/tasks.api";

import "gantt-task-react/dist/index.css";
import "./index.scss";

type Props = {
  projectId: string;
  showDependencies?: boolean;
};

const GanttChart: FC<Props> = ({ projectId, showDependencies }) => {
  // This is a custom hook that dispatches actions
  const dispatch = useDispatch();
  const [updateTask] = useUpdateTaskMutation();

  // This is a custom selector that gets the project data from the store
  const tasks = useSelector(selectTasksByProjectId(projectId));
  const stages = useSelector(selectStagesByProjectId(projectId));
  const project = useSelector(createProjectSelector(projectId));

  // If the project is not found, return null
  if (!project) {
    return null;
  }

  // If the project is found, render the project data
  const ganttData: Task[] = [
    {
      id: project.id,
      name: project.name,

      type: "project",
      progress: 0,

      start: new Date(project.startDate),
      end: new Date(project.endDate),

      styles: {
        backgroundColor: "",
        backgroundSelectedColor: "",
      },
    },
  ];
  ganttData.push(...formatGattData(stages, tasks, showDependencies));

  const onDateChange = (task: Task) => {
    // Find the original task
    const originalTask = tasks.find((t) => t.id === task.id);
    if (!originalTask) return;

    // Update the task in the frontend
    dispatch(
      updateTaskAction({
        ...originalTask,
        startDate: task.start.toISOString(),
        endDate: task.end.toISOString(),
      })
    );

    // Update the task at the backend
    updateTask({
      id: task.id,
      projectId,
      data: {
        startDate: task.start,
        endDate: task.end,
      },
    })
      .unwrap()
      // If the request fails, revert the changes
      .catch(() => {
        dispatch(updateTaskAction(originalTask));
      });
  };

  return (
    <div className="gantt-chart">
      <Gantt
        tasks={ganttData}
        locale="ru-RU"
        onDateChange={onDateChange}
        // Delete default colors
        arrowColor=""
        fontFamily=""
        listCellWidth=""
        barProgressColor=""
        barBackgroundColor=""
        barBackgroundSelectedColor=""
      />
    </div>
  );
};

export default GanttChart;
