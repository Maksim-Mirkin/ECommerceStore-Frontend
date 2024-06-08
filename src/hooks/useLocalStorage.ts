import { useEffect, useState } from "react";

/**
 * useLocalStorage Hook
 * A custom hook for interfacing with the browser's localStorage to persist state across sessions. 
 * It initializes the state from localStorage if available, or sets it to an initial value provided when not found.
 *
 * Parameters:
 * - key (string): The key under which to store the data in localStorage.
 * - initialValue (T | (() => T)): The initial value for the state, or a function that returns it.
 *   This value is used if nothing is yet stored under the specified key in localStorage.
 *
 * Returns:
 * - A stateful value and a function to update it, both persisted to localStorage automatically on changes.
 *
 * Usage:
 * This hook is particularly useful for storing user preferences or other stateful information that needs to be persisted
 * across browser sessions, such as themes, authentication tokens, or application settings.
 */
export function useLocalStorage<T>(key: string, initalValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initalValue === "function") {
      return (initalValue as () => T)();
    } else {
      return initalValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
