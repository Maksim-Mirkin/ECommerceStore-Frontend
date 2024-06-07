import { SortInput } from "../../@types/types";
import AddProduct from "./AddProduct";
import AllOrders from "./AllOrders";
import DemoProduct from "./DemoProduct";
import LoadingNavLinks from "./LoadingNavLinks";
import OrderStatusForm from "./OrderStatusForm";
import PaginationController from "./PaginationController";
import SortButton from "./SortButton";
import UserData from "./UserData";
import UserOrders from "./UserOrders";

const sortInputs: SortInput[] = [
  { id: "createdAt_asc", label: "Order date: oldest first" },
  { id: "createdAt_desc", label: "Order date: newest first" },
  { id: "status_asc", label: "Status: pending first" },
  { id: "status_desc", label: "Status: declined first" },
  { id: "totalPrice_asc", label: "Total price: low to high" },
  { id: "totalPrice_desc", label: "Total price: high to low" },
];

function statusColor(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-300 dark:bg-yellow-500 hover:bg-amber-400 dark:hover:bg-yellow-600 transition-colors duration-300 ease-in-out active:bg-amber-300 dark:active:bg-yellow-500";
    case "approved":
      return "bg-green-300 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-600 transition-colors duration-300 ease-in-out active:bg-green-300 dark:active:bg-green-500";
    case "declined":
      return "bg-red-300 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-600 transition-colors duration-300 ease-in-out active:bg-red-300 dark:active:bg-red-500";
    default:
      return "";
  }
}

function generateRandomId(): string {
  const hexCharacters = "0123456789abcdef";

  function getRandomHex(length: number): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
    }
    return result;
  }

  return `${getRandomHex(8)}-${getRandomHex(4)}-${getRandomHex(
    4
  )}-${getRandomHex(4)}-${getRandomHex(12)}`;
}

export {
  UserData,
  UserOrders,
  AllOrders,
  AddProduct,
  DemoProduct,
  LoadingNavLinks,
  OrderStatusForm,
  SortButton,
  PaginationController,
  sortInputs,
  statusColor,
  generateRandomId,
};
