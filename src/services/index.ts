import { PaginationParams, ProductParams } from "../@types/types";
import { Auth } from "./auth-service";
import { FilterService } from "./filter-service";
import { OrderService } from "./order-service";
import { ProductService } from "./product-service";
import { RatingService } from "./rating-service";

export const baseUrl = `http://localhost:8080/api/v1`;

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

export const buildProductFilterParams = (params: ProductParams): string => {
    const queryParams = new URLSearchParams();
  
    // Add product filter parameters
    if (params.name) queryParams.append("name", params.name);
    if (params.brand) queryParams.append("brand", params.brand.join(","));
    if (params.minPrice !== undefined) queryParams.append("minPrice", String(params.minPrice));
    if (params.maxPrice !== undefined) queryParams.append("maxPrice", String(params.maxPrice));
    if (params.color) queryParams.append("color", params.color.join(","));
    if (params.memory) queryParams.append("memory", params.memory.join(","));
    if (params.screenSize !== undefined) queryParams.append("screenSize", String(params.screenSize));
    if (params.batteryCapacity) queryParams.append("batteryCapacity", params.batteryCapacity.join(","));
    if (params.category) queryParams.append("category", params.category.join(","));
  
    return queryParams.toString();
  };

  export const ifLoggedInValidate = () => {
    const token = localStorage.getItem("token") ?? "";
  
    if (!token) {
      throw new Error("Must be logged in");
    }

    return token;
  }

  export {FilterService, ProductService, Auth, OrderService, RatingService}