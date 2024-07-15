import { FC, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddRounded from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import TaskDialog from "../TaskDialog";
import StageDialog from "../StageDialog";
import DeleteStageDialog from "../StageDialog/delete";
import { dateToString } from "../../utils/dateToString";
import { Stage, Task as TaskType } from "../../types";
import Task from "./Task";

type Props = {
  stage: Stage;
  tasks: TaskType[];
};

const Column: FC<Props> = ({ stage, tasks }) => {
  const [addTask, setAddTask] = useState(false);
  const [editStage, setEditStage] = useState(false);
  const [deleteStage, setDeleteStage] = useState(false);

  return (
    <>
      <StageDialog
        id={stage.id}
        projectId={stage.projectId}
        show={editStage}
        onClose={setEditStage}
      />

      <DeleteStageDialog
        id={stage.id}
        projectId={stage.projectId}
        show={deleteStage}
        onClose={setDeleteStage}
      />

      <TaskDialog
        stageId={stage.id}
        projectId={stage.projectId}
        show={addTask}
        onClose={setAddTask}
      />

      <Box boxShadow={1}>
        <Box px={2} py={1} className="column-header">
          <Typography variant="h4" component="h1">
            {stage.name}
          </Typography>

          <Typography variant="subtitle1" component="p" sx={{ opacity: 0.8 }}>
            {dateToString(stage.startDate).day} -{" "}
            {dateToString(stage.endDate).day}
          </Typography>

          <Typography variant="body1" component="p" sx={{ mt: 1 }}>
            {stage.description}
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }} justifyContent="flex-end">
            <Grid item>
              <IconButton color="inherit" onClick={() => setAddTask(true)}>
                <AddRounded />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton color="inherit" onClick={() => setEditStage(true)}>
                <EditRounded />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton color="inherit" onClick={() => setDeleteStage(true)}>
                <DeleteRounded />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        <Droppable droppableId={stage.id}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="column-content"
              mt={2}
              px={1}
              pb={2}
              minHeight={100}
            >
              <Grid container spacing={2} flexDirection="column">
                {tasks.map((task) => (
                  <Grid item key={task.id}>
                    <Task task={task} />
                  </Grid>
                ))}
                {provided.placeholder}
              </Grid>
            </Box>
          )}
        </Droppable>
      </Box>
    </>
  );
};

export default Column;
