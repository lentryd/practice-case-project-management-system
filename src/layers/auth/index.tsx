import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/userSlice";
import "./index.scss";
import { useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <div className="auth-container">
        <Outlet />
      </div>
    </>
  );
}
