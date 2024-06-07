import {
  baseUrl,
  buildPaginationParams,
  buildProductFilterParams,
  ifLoggedInValidate,
} from ".";
import {
  PaginationParams,
  Product,
  ProductPage,
  ProductParams,
  ProductRequest,
} from "../@types/types";

const buildProductSearchUrl = (
  params: PaginationParams & ProductParams
): string => {
  const paginationParams = buildPaginationParams(params);
  const productFilterParams = buildProductFilterParams(params);
  return `${baseUrl}/products?${paginationParams}&${productFilterParams}`;
};

const fetchProducts = async (
  params: PaginationParams & ProductParams = {}
): Promise<ProductPage> => {
  const token = ifLoggedInValidate();

  const url = buildProductSearchUrl(params);

  const res = await fetch(url, {
    method: "GET",
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

const fetchProductsByRating = async (): Promise<ProductPage> => {
  const url = `${baseUrl}/products?pageSize=8&sortBy=ratings&sortDir=desc`;

  const res = await fetch(url, {
    method: "GET",
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }

  return json;
};

const fetchProduct = async (id: number): Promise<Product> => {
  const token = ifLoggedInValidate();

  const url = `${baseUrl}/products/${id}`;

  const res = await fetch(url, {
    method: "GET",
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

const addProduct = async (data: ProductRequest): Promise<Product> => {
  const token = ifLoggedInValidate();

  const url = `${baseUrl}/products`;

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
    throw new Error(json.message || "Failed to add product");
  }

  return json;
};

const updateProduct = async (
  id: number,
  data: ProductRequest
): Promise<Product> => {
  const token = ifLoggedInValidate();

  const url = `${baseUrl}/products/${id}`;

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
    throw new Error(json.message || "Failed to update product");
  }

  return json;
};

const deleteProduct = async (id: number): Promise<Product> => {
  const token = ifLoggedInValidate();

  const url = `${baseUrl}/products/${id}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to delete product");
  }

  return json;
};

export const ProductService = {
  fetchProducts,
  fetchProductsByRating,
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
