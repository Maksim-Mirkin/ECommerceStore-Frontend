import { createContext, useEffect, useState } from "react";
import { AuthContextType, FC, User } from "../@types/types";
import { Auth } from "../services";

const initialValues: AuthContextType = {
  isLoggedIn: false,
  jwt: "",
  login: (_) => {},
  logout: () => {},
  user: null,
  isAdmin: false,
};

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
