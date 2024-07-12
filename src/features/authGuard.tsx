import { FC, ReactNode } from "react";
import { useMeQuery } from "../services/user.api";
import { useGetAllProjectsQuery } from "../services/projects.api";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isLoading: userLoading } = useMeQuery();
  const { isLoading: projectsLoading } = useGetAllProjectsQuery();

  return userLoading || projectsLoading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    <>{children}</>
  );
};

export default AuthGuard;
