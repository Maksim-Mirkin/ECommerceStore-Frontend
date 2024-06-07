import { FaExternalLinkAlt } from "react-icons/fa";
import { OrderList, StatusRequest } from "../../@types/types";
import { extractDate } from "../../utils/formatUtils";
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { OrderService } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialogs } from "../../ui/dialogs";
import { OrderStatusForm, generateRandomId, statusColor } from ".";

const OrderRow = ({ orders, navigateToOrder }: OrderList) => {
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
    <div>
      {orders.orders.map((order) => (
        <div
          key={order.id}
          onClick={() => {
            const specificOrder = orders.orders.find((o) => o.id === order.id);
            if (specificOrder) {
              navigateToOrder(generateRandomId(), specificOrder);
            }
          }}
          className={`md:flex justify-around items-center text-center border border-black dark:border-white mx-1 px-4 hidden cursor-pointer ${statusColor(
            order.status
          )}`}
        >
          <p className="dark:text-white flex-1">{order.id}</p>
          <p className="dark:text-white flex-1">{order.address}</p>
          <p className="dark:text-white flex-1">{order.city}</p>
          <p className="dark:text-white flex-1">{order.postalCode}</p>
          <p className="dark:text-white flex-1">{order.paymentInformation}</p>
          <p className="dark:text-white flex-1">{order.totalPrice}$</p>
          <p className="dark:text-white flex-1">{order.status}</p>
          <p className="dark:text-white flex-1">
            {extractDate(order.createdAt)}
          </p>
          <p className="dark:text-white flex-1 flex justify-center">
            <FaExternalLinkAlt />
          </p>
          {isAdmin && lastPath && (
            <OrderStatusForm
              orderId={order.id}
              initialStatus={order.status}
              onSubmit={onSubmit}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderRow;
