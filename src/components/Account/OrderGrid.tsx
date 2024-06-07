import { FaExternalLinkAlt } from "react-icons/fa";
import { OrderList, StatusRequest } from "../../@types/types";
import { extractDate } from "../../utils/formatUtils";
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { useNavigate, useLocation } from "react-router-dom";
import { OrderService } from "../../services";
import { Dialogs } from "../../ui/dialogs";
import OrderStatusForm from "./OrderStatusForm";
import { generateRandomId, statusColor } from ".";

const OrderGrid = ({ orders, navigateToOrder }: OrderList) => {
  const { isAdmin } = useContext(AuthContext);
  const nav = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const lastPath = path.substring(path.lastIndexOf("/") + 1) === "all-orders";

  const onSubmit = async (data: StatusRequest) => {
    Dialogs.confirm(
      "Do you want to change the status of this order?",
      async () => {
        try {
          await OrderService.updateOrderStatus(data);
          Dialogs.success("Order updated successfully!");
          setTimeout(() => {
            nav(0);
          }, 2000);
        } catch (e) {
          if (
            e != null &&
            typeof e == "object" &&
            "message" in e &&
            typeof e["message"] == "string"
          ) {
            Dialogs.error(e.message);
          } else {
            Dialogs.error("An unexpected error occurred. Please try again.");
          }
        }
      },
      () => {
        return;
      }
    );
  };
  return (
    <div className="md:hidden">
      {orders.orders.map((order) => {
        return (
          <div
            key={order.id}
            onClick={() => {
              const specificOrder = orders.orders.find(
                (o) => o.id === order.id
              );
              if (specificOrder) {
                navigateToOrder(generateRandomId(), specificOrder);
              }
            }}
            className={`flex flex-col justify-center gap-2 text-center border border-black dark:border-white cursor-pointer my-4 mx-1 ${statusColor(
              order.status
            )}`}
          >
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">Order ID</p>
              <p className="dark:text-white">{order.id}</p>
            </div>
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">Address</p>
              <p className="dark:text-white">{order.address}</p>
            </div>
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">City</p>
              <p className="dark:text-white">{order.city}</p>
            </div>
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">Postal Code</p>
              <p className="dark:text-white">{order.postalCode}</p>
            </div>
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">Payment Information</p>
              <p className="dark:text-white">{order.paymentInformation}</p>
            </div>
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">Total Price</p>
              <p className="dark:text-white">{order.totalPrice}$</p>
            </div>
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">Status</p>
              <p className="dark:text-white">{order.status}</p>
            </div>
            <div className="flex justify-between items-center px-4 border-b border-black dark:border-white">
              <p className="dark:text-white font-bold">Date</p>
              <p className="dark:text-white">{extractDate(order.createdAt)}</p>
            </div>
            <div className="flex justify-between items-center px-4">
              <p className="dark:text-white font-bold">Order Items</p>
              <p className="dark:text-white">
                <FaExternalLinkAlt />
              </p>
            </div>
            {isAdmin && lastPath && (
              <OrderStatusForm
                orderId={order.id}
                initialStatus={order.status}
                onSubmit={onSubmit}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderGrid;
