import { createContext, useEffect, useState } from "react";
import type { FC, Theme } from "../@types/types";

const initialValues = { isDark: false, toggleTheme: () => {} };

/**
 * DarkModeThemeContext
 * Provides a context for managing the dark mode theme across the application. This context allows components
 * to access and modify the theme state, enabling dynamic theme switching.
 *
 * Context Structure:
 * - isDark (boolean): Indicates whether dark mode is currently enabled.
 * - toggleTheme (function): A function to toggle the theme between dark and light modes.
 *
 * DarkModeThemeProvider
 * A provider component that encapsulates the logic for the DarkModeThemeContext, utilizing localStorage to persist
 * the theme preference across sessions. It also applies the corresponding class to the document body to change themes.
 *
 * Features:
 * - Persists theme preference in localStorage under the key 'theme'.
 * - Dynamically adds or removes the 'dark' class to the body of the document based on the theme state, affecting the overall styling.
 * - Provides a toggle function that allows user interaction components to switch themes easily.
 */
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
