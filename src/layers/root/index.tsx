import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../../features/userSlice";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TopAppBarItem from "../../components/TopAppBar/TopAppBarItem";
import initializeEvents from "../../services/events.sse";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Dialog from "../../components/Dialog";
import { useCreateProjectMutation } from "../../services/projects.api";

const DATE_REGEX = /^\d{2}.\d{2}.\d{4}$/;

export default function Root() {
  // Redirect to login if not authenticated
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [showDialog, setShowDialog] = useState(false);
  const [createProject, { isLoading: createLoading }] =
    useCreateProjectMutation();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");

  const [projectNameError, setProjectNameError] = useState(false);
  const [projectDescriptionError, setProjectDescriptionError] = useState(false);
  const [projectStartDateError, setProjectStartDateError] = useState(false);
  const [projectEndDateError, setProjectEndDateError] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else {
      initializeEvents();
    }
  }, [navigate, isAuthenticated]);

  const dispatch = useDispatch();
  const location = useLocation();
  const appTitle =
    location.pathname === "/"
      ? "Проекты"
      : location.pathname.startsWith("/projects/")
      ? "Проект"
      : "Project management system";

  const showAddButton = location.pathname === "/";
  const showBackButton = location.pathname !== "/";

  const handleCreateProject = async () => {
    setProjectNameError(!projectName);
    setProjectDescriptionError(!projectDescription);
    setProjectStartDateError(!DATE_REGEX.test(projectStartDate));
    setProjectEndDateError(!DATE_REGEX.test(projectEndDate));

    if (
      !projectName ||
      !projectDescription ||
      !DATE_REGEX.test(projectStartDate) ||
      !DATE_REGEX.test(projectEndDate)
    ) {
      return;
    }

    const startDate = projectStartDate.split(".").reverse().join("-");
    const endDate = projectEndDate.split(".").reverse().join("-");

    await createProject({
      name: projectName,
      description: projectDescription,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
    setShowDialog(false);
  };

  const handleOpenDialog = () => {
    setProjectName("");
    setProjectDescription("");
    setProjectStartDate("");
    setProjectEndDate("");

    setProjectNameError(false);
    setProjectDescriptionError(false);
    setProjectStartDateError(false);
    setProjectEndDateError(false);

    setShowDialog(true);
  };

  return (
    <>
      {showAddButton && (
        <Dialog
          title="Создать проект"
          description="Заполните данные проекта"
          modelValue={showDialog}
          onModelValueChange={setShowDialog}
        >
          {{
            body: [
              <TextField
                label="Название"
                error={projectNameError}
                errorMsg="Введите название проекта"
                modelValue={projectName}
                onUpdateModelValue={setProjectName}
              />,
              <TextField
                label="Описание"
                error={projectDescriptionError}
                errorMsg="Введите описание проекта"
                modelValue={projectDescription}
                onUpdateModelValue={setProjectDescription}
              />,
              <TextField
                label="Дата начала"
                error={projectStartDateError}
                errorMsg="Введите в формате ДД.ММ.ГГГГ"
                modelValue={projectStartDate}
                onUpdateModelValue={setProjectStartDate}
              />,
              <TextField
                label="Дата окончания"
                error={projectEndDateError}
                errorMsg="Введите в формате ДД.ММ.ГГГГ"
                modelValue={projectEndDate}
                onUpdateModelValue={setProjectEndDate}
              />,
            ],
            actions: [
              <Button label="Отмена" onClick={() => setShowDialog(false)} />,
              <Button
                label="Создать"
                filled
                loading={createLoading}
                onClick={handleCreateProject}
              />,
            ],
          }}
        </Dialog>
      )}

      <TopAppBar title={appTitle} scrollEl="#root">
        <div slot="navigation">
          {showBackButton && (
            <TopAppBarItem icon="arrow_back" onClick={() => navigate("/")} />
          )}
        </div>
        <div slot="actions">
          {showAddButton && (
            <TopAppBarItem icon="add" onClick={handleOpenDialog} />
          )}
          <TopAppBarItem icon="logout" onClick={() => dispatch(logout())} />
        </div>
      </TopAppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
