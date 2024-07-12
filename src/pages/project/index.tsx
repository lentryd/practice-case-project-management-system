import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  createProjectSelector,
  selectProjectLoading,
} from "../../features/projectSlice";
import { useGetStagesQuery } from "../../services/stages.api";
import { useGetTasksQuery } from "../../services/tasks.api";
import GanttChart from "../../components/GanttChart";

import { Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function Project() {
  // This is a custom hook that gets the project ID from the URL
  const navigate = useNavigate();
  const { id = "1" } = useParams();

  // This is a custom hook that fetches the project data
  const { data: tasks = [], isLoading: tasksLoading } = useGetTasksQuery(id);
  const { data: stages = [], isLoading: stagesLoading } = useGetStagesQuery(id);

  // This is a custom selector that gets the project data from the store
  const project = useSelector(createProjectSelector(id));
  const projectLoading = useSelector(selectProjectLoading);

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
  if (!project) {
    return null;
  }

  const ganttData: Task[] = stages.map<Task>((stage) => ({
    type: "project",
    id: stage.id,
    name: stage.name,
    start: new Date(stage.startDate),
    end: new Date(stage.endDate),
    progress: 0,

    styles: {
      backgroundColor: "",
      backgroundSelectedColor: "",
    },
  }));

  ganttData.push(
    ...tasks.map<Task>((task) => ({
      type: "task",
      id: task.id,
      name: task.name,
      start: new Date(
        stages.find((stage) => stage.id === task.stageId)?.startDate || ""
      ),
      end: new Date(
        stages.find((stage) => stage.id === task.stageId)?.endDate || ""
      ),
      progress: 0,
      dependencies: [task.stageId],
    }))
  );

  const onDateChange = (task: Task) => {
    const index = ganttData.findIndex((t) => t.id === task.id);
    if (index === -1) {
      return;
    }
    ganttData[index] = task;
  };

  return (
    <>
      <div className="project-info">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>

      <GanttChart
        tasks={ganttData}
        projectId={id}
        onDateChange={onDateChange}
      />

      <h2>Stages</h2>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            {stage.name} {`(${stage.id})`}
          </li>
        ))}
      </ul>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} {`(${task.id})`}
          </li>
        ))}
      </ul>
    </>
  );
}
