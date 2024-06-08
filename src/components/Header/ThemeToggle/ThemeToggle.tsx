import { useContext } from "react";
import { DarkModeThemeContext } from "../../../contexts";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./ThemeToggle.module.scss";

/**
 * ThemeToggle Component
 * This component provides a button to toggle between light and dark themes.
 *
 * Context:
 * - DarkModeThemeContext: Context that provides the current theme state (isDark) and toggle function.
 *
 * Icons:
 * - FaMoon: Icon displayed when the current theme is dark.
 * - FaSun: Icon displayed when the current theme is light.
 *
 * Styling:
 * - The button applies different styles based on the current theme (dark or light).
 * - The styles are imported from the "ThemeToggle.module.scss" file.
 *
 * Accessibility:
 * - aria-label: Provides an accessible label indicating the action of the button (e.g., "Switch to light mode" or "Switch to dark mode").
 */

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
