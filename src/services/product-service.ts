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

/**
 * Builds a URL for fetching products based on combined pagination and filtering parameters.
 * @param params Combined pagination and product filtering parameters.
 * @returns string The constructed URL for product search.
 */
const buildProductSearchUrl = (
  params: PaginationParams & ProductParams
): string => {
  const paginationParams = buildPaginationParams(params);
  const productFilterParams = buildProductFilterParams(params);
  return `${baseUrl}/products?${paginationParams}&${productFilterParams}`;
};

/**
 * Fetches products based on specified pagination and filtering criteria.
 * Requires user authentication.
 * @param params Combined pagination and product filtering parameters.
 * @returns Promise<ProductPage> A promise that resolves to a page of products.
 * @throws Error if the API request is unsuccessful.
 */
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

/**
 * Fetches products sorted by ratings in descending order, limited to 8 items.
 * No authentication required.
 * @returns Promise<ProductPage> A promise that resolves to a page of top-rated products.
 * @throws Error if the API request is unsuccessful.
 */
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

/**
 * Fetches details for a specific product identified by ID.
 * Requires user authentication.
 * @param id The product ID.
 * @returns Promise<Product> A promise that resolves to the detailed information of a product.
 * @throws Error if the API request is unsuccessful.
 */
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

/**
 * Adds a new product with specified details.
 * Requires user authentication.
 * @param data Product details to add.
 * @returns Promise<Product> A promise that resolves to the newly created product.
 * @throws Error if the API request is unsuccessful or fails to add the product.
 */
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

/**
 * Updates the details of an existing product.
 * Requires user authentication.
 * @param id The ID of the product to update.
 * @param data Updated product details.
 * @returns Promise<Product> A promise that resolves to the updated product.
 * @throws Error if the API request is unsuccessful.
 */
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

/**
 * Deletes a product identified by its ID.
 * Requires user authentication.
 * @param id The ID of the product to delete.
 * @returns Promise<Product> A promise that resolves to the deleted product.
 * @throws Error if the API request is unsuccessful.
 */
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

// Exporting ProductService to be used across the application
export const ProductService = {
  fetchProducts,
  fetchProductsByRating,
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
