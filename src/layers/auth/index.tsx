import { useEffect } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/userSlice";

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
      <Container component="main" maxWidth="xs">
        <Outlet />
      </Container>
    </>
  );
}
