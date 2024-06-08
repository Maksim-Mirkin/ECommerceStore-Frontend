import { CiLock } from "react-icons/ci";
import { CartItem } from "../components/Cart";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductService } from "../services";
import { Dialogs } from "../ui/dialogs";
import { useShoppingCart } from "../hooks";

/**
 * Cart Route
 * Manages and displays the shopping cart contents, including product details, quantity adjustments, and subtotal calculations.
 * Provides a secure checkout link and handles user redirection if the cart is empty. Utilizes dynamic subtotal calculations
 * based on cart contents and real-time price fetching from the ProductService.
 *
 * Features:
 * - Displays each cart item with options for viewing detailed product info and adjusting quantities.
 * - Calculates subtotals dynamically based on product prices and quantities, with added delivery charges.
 * - Secure payment prompt with a link to the checkout process.
 * - Utilizes dialog boxes for user notifications if the cart is empty and redirects to the login page.
 */
const Cart = () => {
  const { cartItems } = useShoppingCart();
  const [subtotal, setSubtotal] = useState(0);
  const delivery = 10;

  useEffect(() => {
    const calculateTotal = async () => {
      const total = await Promise.all(
        cartItems.map(async (cartItem) => {
          const item = await ProductService.fetchProduct(cartItem.id);
          return item.price * cartItem.quantity;
        })
      ).then((items) => items.reduce((acc, item) => acc + item, 0));

      setSubtotal(total);
    };

    calculateTotal();
  }, [cartItems]);
  if (cartItems.length === 0) {
    Dialogs.warning(
      "Your cart is empty. Please add some items to continue shopping."
    );
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex">
      <div className="py-4 relative flex-1">
        <div className="hidden lg:flex justify-around mr-4 text-center sticky top-0 z-50 bg-transparent">
          <h2 className="w-96">Product</h2>
          <h2 className="w-16">Quantity</h2>
          <h2 className="w-16 pl-3">Price</h2>
          <h2 className="w-16">Subtotal</h2>
        </div>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="lg:hidden border-t border-black sticky bottom-0 mt-4 flex flex-col gap-2 justify-center items-center bg-slate-100 dark:bg-slate-700">
          <div>
            <h3 className="text-2xl">Subtotal: {subtotal.toFixed(2)}$</h3>
            <h3 className="text-2xl">Delivery: {delivery}$</h3>
          </div>
          <h1>Total: {subtotal.toFixed(2)}$</h1>
          <Link to="/order" className="action-button text-center mb-0 w-fit">
            Continue with payment
          </Link>
          <div className="flex gap-2 items-center pb-2 dark:text-white">
            <CiLock className="size-5" />
            Secure payment
          </div>
        </div>
      </div>
      <div className="hidden lg:block border-2 border-black w-fit sticky h-fit mt-4 mr-8 top-2">
        <h2 className="text-center">Total</h2>
        <hr className="border border-black" />
        <div className="px-4 flex flex-col gap-2">
          <h3>Subtotal: {subtotal.toFixed(2)}$</h3>
          <h3>Delivery: {delivery}$</h3>
          <h2>Total: {(subtotal + delivery).toFixed(2)}$</h2>
          <Link to="/order" className="action-button text-center mb-0">
            Continue with payment
          </Link>
          <div className="flex gap-2 items-center justify-center pb-2 dark:text-white">
            <CiLock className="size-5" />
            Secure payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
