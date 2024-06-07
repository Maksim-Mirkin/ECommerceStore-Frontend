import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Dialogs } from "../ui/dialogs";
import { AuthContext } from "../contexts";
import { FC } from "../@types/types";

const ProtectedRoute: FC = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    Dialogs.warning("You need to login to access this page");
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
