import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectTaskById } from "../../features/taskSlice";
import { useCreateTaskMutation } from "../../services/tasks.api";
import { useUpdateTaskMutation } from "../../services/tasks.api";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { dateToString } from "../../utils/dateToString";

type Props = {
  id?: string;
  stageId: string;
  projectId: string;

  show: boolean;
  onClose: (val: boolean) => void;
};

export default function TaskDialog({
  id,
  stageId,
  projectId,
  show,
  onClose,
}: Props) {
  const task = useSelector(selectTaskById(id || "1", projectId || "1"));
  const [create, { isLoading }] = useCreateTaskMutation();
  const [update, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const handleClose: DialogProps["onClose"] = (_, reason) => {
    if (reason === "escapeKeyDown") {
      onClose(false);
    }
  };

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const startDate = data.get("startDate") as string;
    const endDate = data.get("endDate") as string;

    if (!name) setNameError("Название не может быть пустым");
    if (!startDate) setStartDateError("Дата начала не может быть пустой");
    if (!endDate) setEndDateError("Дата окончания не может быть пустой");

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end)
      setEndDateError("Дата окончания не может быть раньше даты начала");

    if (nameError || startDateError || endDateError) return;

    const taskData = {
      name,
      description,
      startDate: start,
      endDate: end,
      stageId,
      indexAtStage: task?.indexAtStage || 0,
    };

    (!task
      ? create({
          projectId,
          data: taskData,
        })
      : update({
          id: task.id,
          projectId,
          data: taskData,
        })
    )
      .unwrap()
      .then(() => onClose(false))
      .catch((error) => {
        console.error(error);
        setError(error.data.message);
      });
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        component: "form",
        noValidate: true,
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {!task ? "Создание задачи" : "Обновление задачи"}
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Название задачи"
          type="text"
          fullWidth
          defaultValue={task?.name}
          error={!!nameError}
          helperText={nameError}
          onChange={() => setNameError("")}
        />

        <TextField
          required
          multiline
          maxRows={4}
          margin="dense"
          id="description"
          name="description"
          label="Описание задачи"
          type="text"
          fullWidth
          defaultValue={task?.description}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="startDate"
              name="startDate"
              label="Дата начала"
              type="date"
              fullWidth
              defaultValue={task && dateToString(task.startDate).dayISO}
              error={!!startDateError}
              helperText={startDateError}
              onChange={() => setStartDateError("")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="endDate"
              name="endDate"
              label="Дата окончания"
              type="date"
              fullWidth
              defaultValue={task && dateToString(task.endDate).dayISO}
              error={!!endDateError}
              helperText={endDateError}
              onChange={() => setEndDateError("")}
            />
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose(false)}>Отмена</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading || isUpdating}
        >
          {!task ? "Создать" : "Сохранить"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
