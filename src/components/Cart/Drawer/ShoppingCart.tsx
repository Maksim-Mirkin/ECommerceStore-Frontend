import Drawer from "react-modern-drawer";

import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { ProductService } from "../../../services";
import { Link } from "react-router-dom";
import DrawerItem from "./DrawerItem";
import { useShoppingCart } from "../../../hooks";
import { baseURL } from "../../../utils/config";

/**
 * ShoppingCart component provides a slide-in drawer that displays cart items.
 * It allows users to view their selected items, update quantities, and proceed to checkout.
 * It also calculates the total price of the items in the cart.
 *
 * Features:
 * - Real-time cart updates: Changes in cart items trigger recalculation of the total price.
 * - Responsive design: Uses a `Drawer` from `react-modern-drawer` to fit various screen sizes,
 *   providing a consistent user experience across devices.
 * - Efficient fetching: Retrieves product details only when the cart is open to minimize data fetching.
 * - User interactions: Allows for closing the cart through a UI button and navigating to the checkout page.
 */

const ShoppingCart = () => {
  const { closeCart, cartItems, isCartOpen } = useShoppingCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = async () => {
      const total = await Promise.all(
        cartItems.map(async (cartItem) => {
          const item = await ProductService.fetchProduct(cartItem.id);
          return item.price * cartItem.quantity;
        })
      ).then((items) => items.reduce((acc, item) => acc + item, 0));

      setTotal(total);
    };

    calculateTotal();
  }, [cartItems]);

  return (
    <Drawer
      open={isCartOpen}
      onClose={closeCart}
      direction={"right"}
      lockBackgroundScroll
      className="w-full flex flex-col overflow-y-auto overflow-x-hidden sm:w-3/4 lg:w-1/2 xl:w-1/3 py-12 sm:p-0"
    >
      <div className="flex-1">
        <div className="flex justify-between items-center w-full mt-2 mx-1">
          <h2>Cart</h2>
          <IoMdClose
            className="h-8 w-8 hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={closeCart}
          />
        </div>
        <div className="flex flex-col gap-4">
          {cartItems.length !== 0 ? (
            cartItems.map((item) => <DrawerItem key={item.id} {...item} />)
          ) : (
            <h1 className="text-center mt-16">Cart is empty</h1>
          )}
        </div>
      </div>
      <div className="flex flex-col border-t-2 border-black my-2">
        <div className="flex gap-2 ml-1 my-2">
          <h1>Total:</h1>
          <h1>{total.toFixed(2)}$</h1>
        </div>
        <Link
          to={`${baseURL}cart`}
          className="action-button w-11/12 mt-2 self-center text-center"
          onClick={closeCart}
        >
          Checkout
        </Link>
      </div>
    </Drawer>
  );
};

export default ShoppingCart;
