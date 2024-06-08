import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { useLocation } from "react-router-dom";

/**
 * `OrderHeader` Component
 * Renders a header row for an order list, primarily used in administrative interfaces to display column titles for order attributes.
 * It dynamically adjusts content based on the user's administrative status and the specific page being viewed.
 *
 * Features:
 * - Displays headers for various order attributes like Order ID, Address, City, Postal Code, Payment Information, Total Price, Status, Date, and Order Items.
 * - Conditionally renders an additional header for changing order status if the user is an administrator and is viewing the "all-orders" page.
 * - The component is hidden on smaller screens and only visible in medium and larger viewports.
 */

const OrderHeader = () => {
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;
  const lastPath = path.substring(path.lastIndexOf("/") + 1) === "all-orders";
  return (
    <div className="md:flex justify-around items-center text-center border border-black dark:border-white mx-1 px-4 hidden">
      <p className="flex-1">Order ID</p>
      <p className="flex-1">Address</p>
      <p className="flex-1">City</p>
      <p className="flex-1">Postal Code</p>
      <p className="flex-1">Payment Information</p>
      <p className="flex-1">Total Price</p>
      <p className="flex-1">Status</p>
      <p className="flex-1">Date</p>
      <p className="flex-1">Order Items</p>
      {isAdmin && lastPath && <p className="flex-1">Change Status</p>}
    </div>
  );
};

export default OrderHeader;
