import { FC, ReactNode } from "react";
import { useMeQuery } from "../services/user.api";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isLoading } = useMeQuery();

  return isLoading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    <>{children}</>
  );
};

export default AuthGuard;
