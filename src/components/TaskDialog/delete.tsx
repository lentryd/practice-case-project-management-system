import { useDeleteTaskMutation } from "../../services/tasks.api";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  id: string;
  projectId: string;
  show: boolean;
  onClose: (val: boolean) => void;
};

export default function DeleteTaskDialog({
  id,
  projectId,
  show,
  onClose,
}: Props) {
  const [mutate, { isLoading }] = useDeleteTaskMutation();

  const handleDelete = async () => {
    await mutate({ id, projectId });
    onClose(false);
  };

  return (
    <Dialog open={show} onClose={() => onClose(false)}>
      <DialogTitle>Удаление задачи</DialogTitle>

      <DialogContent>
        <DialogTitle>Вы уверены, что хотите удалить эту задачу?</DialogTitle>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose(false)}>Отмена</Button>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={handleDelete}
        >
          Удалить
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
