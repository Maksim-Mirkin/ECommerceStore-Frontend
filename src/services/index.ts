import { PaginationParams, ProductParams } from "../@types/types";
import { Auth } from "./auth-service";
import { FilterService } from "./filter-service";
import { OrderService } from "./order-service";
import { ProductService } from "./product-service";
import { RatingService } from "./rating-service";

// Base URL for all API requests
// export const baseUrl = `http://localhost:8080/api/v1`;

export const baseUrl =
  "https://ecommerce-store-e805668c131b.herokuapp.com/api/v1";

/**
 * Constructs a query string for pagination parameters.
 * Converts pagination details into a URL search parameter string.
 *
 * @param params The pagination parameters to be included in API requests.
 * @returns string A query string with encoded pagination parameters.
 */
export const buildPaginationParams = (params: PaginationParams): string => {
  const queryParams = new URLSearchParams();

  // Add pagination parameters
  if (params.pageNumber !== undefined)
    queryParams.set("pageNumber", String(params.pageNumber));
  if (params.pageSize !== undefined)
    queryParams.set("pageSize", String(params.pageSize));
  if (params.sortDir) queryParams.set("sortDir", params.sortDir);
  if (params.sortBy) queryParams.set("sortBy", params.sortBy);

  return queryParams.toString();
};

/**
 * Constructs a query string for product filtering parameters.
 * Converts product filter details into a URL search parameter string.
 *
 * @param params The product filtering parameters to be included in API requests.
 * @returns string A query string with encoded product filtering parameters.
 */
export const buildProductFilterParams = (params: ProductParams): string => {
  const queryParams = new URLSearchParams();

  // Add product filter parameters
  if (params.name) queryParams.append("name", params.name);
  if (params.brand) queryParams.append("brand", params.brand.join(","));
  if (params.minPrice !== undefined)
    queryParams.append("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined)
    queryParams.append("maxPrice", String(params.maxPrice));
  if (params.color) queryParams.append("color", params.color.join(","));
  if (params.memory) queryParams.append("memory", params.memory.join(","));
  if (params.screenSize !== undefined)
    queryParams.append("screenSize", String(params.screenSize));
  if (params.batteryCapacity)
    queryParams.append("batteryCapacity", params.batteryCapacity.join(","));
  if (params.category)
    queryParams.append("category", params.category.join(","));

  return queryParams.toString();
};

/**
 * Validates if the user is logged in by checking for a token in localStorage.
 * Throws an error if no token is found, indicating the user is not authenticated.
 *
 * @returns string The authentication token if present.
 * @throws Error if the user is not authenticated.
 */
export const ifLoggedInValidate = () => {
  const token = localStorage.getItem("token") ?? "";

  if (!token) {
    throw new Error("Must be logged in");
  }

  return token;
};

// Export services to be used throughout the application
export { FilterService, ProductService, Auth, OrderService, RatingService };
