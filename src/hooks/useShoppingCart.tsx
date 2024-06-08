import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";

/**
 * useShoppingCart Hook
 * Provides access to the shopping cart context, enabling components to interact with the shopping cart's state and behaviors.
 * This hook abstracts the context consumption mechanism, making it easier and cleaner to use the shopping cart data and functions throughout the application.
 *
 * Returns:
 * - An object containing the shopping cart's data and methods, such as cart items, item addition and removal functions, and more, depending on the implementation details of the ShoppingCartContext.
 */
export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
  };