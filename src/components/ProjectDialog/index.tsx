import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "../../services/projects.api";
import { useUpdateProjectMutation } from "../../services/projects.api";
import { createProjectSelector } from "../../features/projectSlice";
import { dateToString } from "../../utils/dateToString";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  id?: string;

  show: boolean;
  onClose: (val: boolean) => void;
};

export default function ProjectDialog({ id, show, onClose }: Props) {
  const navigate = useNavigate();

  const project = useSelector(createProjectSelector(id || "1"));
  const [create, { isLoading }] = useCreateProjectMutation();
  const [update, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const handleClose: DialogProps["onClose"] = (_, reason) => {
    if (reason === "escapeKeyDown") {
      onClose(false);
    }
  };

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
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
    if (!description) setDescriptionError("Описание не может быть пустым");
    if (!startDate) setStartDateError("Дата начала не может быть пустой");
    if (!endDate) setEndDateError("Дата окончания не может быть пустой");

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end)
      setEndDateError("Дата окончания не может быть раньше даты начала");

    if (nameError || descriptionError || startDateError || endDateError) return;

    const projectData = {
      name,
      description,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };

    (!project
      ? create(projectData)
      : update({ id: project.id, data: projectData })
    )
      .unwrap()
      .then((data) => {
        onClose(false);
        if (!project) navigate(`/projects/${data.id}`);
      })
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
        {!project ? "Создание проекта" : "Обновление проекта"}
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Название проекта"
          type="text"
          fullWidth
          defaultValue={project?.name}
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
          label="Описание проекта"
          type="text"
          fullWidth
          defaultValue={project?.description}
          error={!!descriptionError}
          helperText={descriptionError}
          onChange={() => setDescriptionError("")}
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
              defaultValue={project && dateToString(project.startDate).dayISO}
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
              defaultValue={project && dateToString(project.endDate).dayISO}
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
          {!project ? "Создать" : "Сохранить"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
