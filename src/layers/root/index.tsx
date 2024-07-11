import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../../features/userSlice";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TopAppBarItem from "../../components/TopAppBar/TopAppBarItem";

export default function Root() {
  // Redirect to login if not authenticated
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [navigate, isAuthenticated]);

  const dispatch = useDispatch();
  const location = useLocation();
  const appTitle =
    location.pathname === "/"
      ? "Проекты"
      : location.pathname.startsWith("/projects/")
      ? "Проект"
      : location.pathname === "/profile"
      ? "Профиль"
      : "404";

  return (
    <>
      <TopAppBar title={appTitle} scrollEl="#root">
        <div slot="actions">
          <TopAppBarItem icon="account_circle" />
          <TopAppBarItem icon="logout" onClick={() => dispatch(logout())} />
        </div>
      </TopAppBar>

      <main>
        <Outlet />
      </main>
    </>
  );
}
