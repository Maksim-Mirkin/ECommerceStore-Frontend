import { createContext, useState } from "react";
import { CartItem, FC } from "../@types/types";
import { useLocalStorage } from "../hooks";

type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
};

const initialValues: ShoppingCartContextType = {
  openCart: () => {},
  closeCart: () => {},
  getItemQuantity: () => 0,
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  removeItem: () => {},
  cartQuantity: 0,
  cartItems: [],
  isCartOpen: false,
};

/**
 * ShoppingCartContext
 * Provides a context for managing and accessing the shopping cart's state throughout the application.
 * This context allows components to interact with the cart's state, such as opening/closing the cart, 
 * adjusting item quantities, and accessing cart items and quantities.
 *
 * ShoppingCartContextType defines the structure of the context's value, including:
 * - Functions to open and close the cart.
 * - Functions to get, increase, decrease, and remove item quantities.
 * - The current quantity of items in the cart.
 * - The array of cart items.
 * - A boolean indicating if the cart is open.
 *
 * ShoppingCartContextProvider
 * A provider component that encapsulates the ShoppingCartContext logic, using `useLocalStorage` to persist 
 * the cart's state in the browser's localStorage. It initializes and manages the state related to the cart,
 * providing it to the consuming components through the ShoppingCartContext.
 *
 * Features:
 * - Persistent state management with localStorage integration.
 * - Reduces cart-related state management redundancy across components.
 * - Direct manipulation functions for cart operations, ensuring that cart state is centrally controlled and updated.
 */
export const ShoppingCartContext =
  createContext<ShoppingCartContextType>(initialValues);

export const ShoppingCartContextProvider: FC = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  };
  const increaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }] as CartItem[];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeItem = (id: number) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        cartQuantity,
        cartItems,
        isCartOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
