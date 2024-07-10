import { FC, ReactNode } from "react";
import { useMeQuery } from "../services/user.api";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isLoading } = useMeQuery();
  return isLoading ? <div>Loading...</div> : <>{children}</>;
};

export default AuthGuard;
