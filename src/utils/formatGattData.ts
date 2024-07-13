import { Task as GanttTask } from "gantt-task-react";
import { Stage } from "../types";
import { Task } from "../types";

export function formatGattData(
  stages: Stage[],
  tasks: Task[],
  showDependencies = false
) {
  const ganttTasks: GanttTask[] = [];

  // Loop through each stage
  stages.forEach((stage) => {
    // Add stage as a project to the Gantt chart
    ganttTasks.push({
      id: stage.id,
      type: "project",
      name: stage.name,
      start: new Date(stage.startDate),
      end: new Date(stage.endDate),
      progress: 0,
      styles: {
        backgroundColor: "",
        backgroundSelectedColor: "",
      },
    });

    // Loop through each task in the stage
    const stageTasks = tasks
      .filter((task) => task.stageId === stage.id)
      .sort((a, b) => a.indexAtStage - b.indexAtStage);
    stageTasks.forEach((task) => {
      ganttTasks.push({
        id: task.id,
        type: "task",
        name: task.name,
        start: new Date(task.startDate),
        end: new Date(task.endDate),
        progress: 0,
        dependencies: !showDependencies ? [] : [task.stageId],
      });
    });
  });

  return ganttTasks;
}
