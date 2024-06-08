import { baseUrl, buildPaginationParams, ifLoggedInValidate } from ".";
import {
  Order,
  OrderPage,
  OrderRequest,
  PaginationParams,
  StatusRequest,
} from "../@types/types";

/**
 * Creates a new order with the provided order data.
 * Requires user authentication.
 *
 * @param data The order data to be submitted.
 * @returns Promise<Order> A promise that resolves with the newly created order.
 * @throws Throws the error response if the API request fails.
 */
const createOrder = async (data: OrderRequest): Promise<Order> => {
  const token = ifLoggedInValidate();
  const url = `${baseUrl}/orders`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw json;
  }
  return json;
};

/**
 * Fetches orders for the authenticated user based on provided pagination parameters.
 *
 * @param params Optional pagination parameters to refine the order query.
 * @returns Promise<OrderPage> A promise that resolves with a page of orders.
 * @throws Throws the error response if the API request fails.
 */
const fetchCustomerOrders = async (
  params: PaginationParams = {}
): Promise<OrderPage> => {
  const token = ifLoggedInValidate();
  const paginationParams = buildPaginationParams(params);
  const url = `${baseUrl}/orders?${paginationParams}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw json;
  }
  return json;
};

/**
 * Fetches all orders in the system based on provided pagination parameters.
 * Requires administrative privileges.
 *
 * @param params Optional pagination parameters to refine the order query.
 * @returns Promise<OrderPage> A promise that resolves with a page of all orders.
 * @throws Throws the error response if the API request fails.
 */
const fetchAllOrders = async (
  params: PaginationParams = {}
): Promise<OrderPage> => {
  const token = ifLoggedInValidate();
  const paginationParams = buildPaginationParams(params);
  const url = `${baseUrl}/orders/all?${paginationParams}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw json;
  }
  return json;
};

/**
 * Updates the status of an existing order.
 * Requires user authentication and authorization to modify the order.
 *
 * @param data The status update request containing the order ID and new status.
 * @returns Promise<Order> A promise that resolves with the updated order.
 * @throws Throws the error response if the API request fails.
 */
const updateOrderStatus = async (data: StatusRequest): Promise<Order> => {
  const token = ifLoggedInValidate();
  const url = `${baseUrl}/orders/${data.orderId}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw json;
  }
  return json;
};

// Exporting OrderService for use elsewhere in the application
export const OrderService = {
  createOrder,
  fetchCustomerOrders,
  fetchAllOrders,
  updateOrderStatus,
};
