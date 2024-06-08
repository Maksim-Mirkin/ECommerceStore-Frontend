import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
  };