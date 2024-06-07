import { useContext } from "react";
import { DarkModeThemeContext } from "../../../contexts";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  const { isDark } = useContext(DarkModeThemeContext);
  const theme = isDark ? "dark" : "light";
  return (
    <div
      className={`${styles["toggle-button"]} ${styles[theme]}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <FaMoon className="h-6 w-6 text-blue-200"/> : <FaSun className="h-8 w-8 pt-2 -translate-y-[0.2rem] text-yellow-200"/>}
    </div>
  );
};

export default ThemeToggle;
