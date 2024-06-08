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
