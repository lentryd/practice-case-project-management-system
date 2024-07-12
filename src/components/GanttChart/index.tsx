import { FC } from "react";
import { useSelector } from "react-redux";
import { Task, Gantt } from "gantt-task-react";
import { createProjectSelector } from "../../features/projectSlice";
import "./index.scss";

type Props = {
  tasks: Task[];
  projectId: string;

  onDateChange: (task: Task) => void;
};

const GanttChart: FC<Props> = ({ tasks, projectId, onDateChange }) => {
  const project = useSelector(createProjectSelector(projectId));
  if (!project) {
    return null;
  }

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
  ganttData.push(...tasks);

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
