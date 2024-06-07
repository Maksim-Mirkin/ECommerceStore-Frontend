import { baseUrl, buildPaginationParams, ifLoggedInValidate } from ".";
import {
  Order,
  OrderPage,
  OrderRequest,
  PaginationParams,
  StatusRequest,
} from "../@types/types";

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

const updateOrderStatus = async (
  data: StatusRequest
): Promise<Order> => {
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

export const OrderService = {
  createOrder,
  fetchCustomerOrders,
  fetchAllOrders,
  updateOrderStatus,
};
