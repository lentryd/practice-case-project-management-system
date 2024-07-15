import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import initializeEvents from "../../services/events.sse";
import { logout, selectIsAuthenticated } from "../../features/userSlice";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AddRounded from "@mui/icons-material/AddRounded";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ProjectDialog from "../../components/ProjectDialog";

type Props = {
  window?: () => Window;
  children: React.ReactElement;
};

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Root() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else {
      initializeEvents();
    }
  }, [isAuthenticated]);

  // Buttons in the app bar
  const location = useLocation();
  const [showAdd, setShowAdd] = useState(false);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setShowAdd(location.pathname === "/");
    setShowBack(location.pathname !== "/");
  }, [location.pathname]);

  // Logout user
  const handleLogout = () => {
    dispatch(logout());
  };

  // Show create project dialog
  const [showCreateProject, setShowCreateProject] = useState(false);
  const handleAddProject = () => {
    setShowCreateProject(true);
  };

  return (
    <>
      <ProjectDialog show={showCreateProject} onClose={setShowCreateProject} />

      <HideOnScroll>
        <AppBar>
          <Toolbar>
            {showBack && (
              <IconButton
                size="large"
                aria-label="back"
                color="inherit"
                onClick={() => navigate("/")}
                sx={{ mr: 2 }}
              >
                <ArrowBackRounded />
              </IconButton>
            )}

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Project management system
            </Typography>

            {showAdd && (
              <IconButton
                size="large"
                aria-label="add-project"
                aria-haspopup="true"
                color="inherit"
                onClick={handleAddProject}
              >
                <AddRounded />
              </IconButton>
            )}

            <IconButton
              size="large"
              aria-label="logout"
              aria-haspopup="true"
              color="inherit"
              onClick={handleLogout}
            >
              <LogoutRounded />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      <Container component="main" sx={{ my: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
