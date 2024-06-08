import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Dialogs } from "../ui/dialogs";
import { AuthContext } from "../contexts";
import { FC } from "../@types/types";

/**
 * ProtectedRoute Component
 * Ensures that only authenticated users can access certain routes. If the user is not logged in,
 * they are redirected to the login page with a warning dialog.
 *
 * Props:
 * - children (React.ReactNode): The component(s) to render if the user is authenticated.
 *
 * Features:
 * - Checks the authentication status using the AuthContext.
 * - Redirects unauthenticated users to the login page and displays a warning dialog.
 * - Renders the specified child components or an Outlet for nested routes if the user is authenticated.
 */
const ProtectedRoute: FC = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    Dialogs.warning("You need to login to access this page");
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
