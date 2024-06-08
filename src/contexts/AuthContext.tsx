import { createContext, useEffect, useState } from "react";
import { AuthContextType, FC, User } from "../@types/types";
import { Auth } from "../services";

const initialValues: AuthContextType = {
  isLoggedIn: false,
  jwt: "",
  login: () => {},
  logout: () => {},
  user: null,
  isAdmin: false,
};

/**
 * AuthContext
 * Provides a context for managing and accessing authentication-related data throughout the application. 
 * This context simplifies the process of handling authentication states, user information, and administrative status.
 *
 * Context Structure:
 * - isLoggedIn (boolean): Indicates whether the user is currently logged in.
 * - jwt (string | null): The JWT token used for authenticating API requests.
 * - login (function): Function to set the JWT token and update the logged-in status.
 * - logout (function): Function to clear the JWT token and update the logged-in status.
 * - user (User | null): The current user's information if logged in.
 * - isAdmin (boolean): Indicates whether the logged-in user has administrative privileges.
 *
 * AuthContextProvider
 * A provider component that encapsulates the logic for the AuthContext, using localStorage to persist 
 * authentication tokens across sessions. It initializes user data from localStorage and provides functions 
 * to log in and log out, as well as fetching user details from a remote server.
 *
 * Features:
 * - Initializes and persists authentication state using localStorage.
 * - Provides functionalities to log in and log out that also manage the JWT token in localStorage.
 * - Fetches and sets user details upon logging in and checks for administrative roles.
 */
export const AuthContext = createContext<AuthContextType>(initialValues);

export const AuthContextProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [jwt, setJwt] = useState<string | null>("");
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJwt(token);
      setIsLoggedIn(true);
      fetchUserDetails();
    } else {
      setJwt(null);
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = (await Auth.getUserDetails()) as User;
      setUser(res);
      if (res.roles.some((role) => role.roleName === "ROLE_ADMIN")) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const login = (jwt: string) => {
    setJwt(jwt);
    setIsLoggedIn(true);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setJwt(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  const values = { isLoggedIn, jwt, login, logout, user, isAdmin };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
