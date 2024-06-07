import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { useLocation } from "react-router-dom";

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
