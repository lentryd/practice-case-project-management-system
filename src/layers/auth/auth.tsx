import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/userSlice";
import "./auth.scss";
import { useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      <div className="auth-container">
        <Outlet />
      </div>
    </>
  );
}
