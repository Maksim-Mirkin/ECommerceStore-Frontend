import { createContext, useEffect, useState } from "react";
import type { FC, Theme } from "../@types/types";

const initialValues = { isDark: false, toggleTheme: () => {} };

export const DarkModeThemeContext = createContext<Theme>(initialValues);

export const DarkModeThemeProvider: FC = (props) => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);

    if (isDark) {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const isDark = !prev;

      if (isDark) {
        localStorage.setItem("theme", "dark");
        document.body.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("dark");
      }

      return isDark;
    });
  };

  const values = { toggleTheme, isDark };
  return (
    <DarkModeThemeContext.Provider value={values}>
      {props.children}
    </DarkModeThemeContext.Provider>
  );
};
