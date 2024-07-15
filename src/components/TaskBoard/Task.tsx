import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import TaskDialog from "../TaskDialog";
import { dateToString } from "../../utils/dateToString";
import { Task as TaskType } from "../../types";
import DeleteTaskDialog from "../TaskDialog/delete";

interface Props {
  task: TaskType;
}

const Task: FC<Props> = ({ task }) => {
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  return (
    <>
      <TaskDialog
        id={task.id}
        stageId={task.stageId}
        projectId={task.projectId}
        show={editTask}
        onClose={setEditTask}
      />

      <DeleteTaskDialog
        id={task.id}
        projectId={task.projectId}
        show={deleteTask}
        onClose={setDeleteTask}
      />

      <Draggable draggableId={task.id} index={task.indexAtStage}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
            className="column-task"
            sx={{
              p: 2,
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" component="h1">
              {task.name}
            </Typography>

            <Typography variant="subtitle2" component="p" sx={{ opacity: 0.8 }}>
              {dateToString(task.startDate).day} -{" "}
              {dateToString(task.endDate).day}
            </Typography>

            <Typography variant="body1" component="p" sx={{ mt: 1 }}>
              {task.description}
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="flex-end"
            >
              <Grid item>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => setEditTask(true)}
                >
                  <EditRounded fontSize="small" />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => setDeleteTask(true)}
                >
                  <DeleteRounded fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </Draggable>
    </>
  );
};

export default Task;
