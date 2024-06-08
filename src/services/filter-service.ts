import { baseUrl, buildProductFilterParams, ifLoggedInValidate } from ".";
import { ProductFilterOption, ProductFilterParams } from "../@types/types";

/**
 * Constructs a URL for fetching products based on provided filtering criteria.
 * This utilizes a helper function to build a query string from the filter parameters.
 *
 * @param params The filtering criteria used to build the query string for product searches.
 * @returns string The fully constructed URL ready for fetching filtered product data.
 */
const buildProductFilterOptionSearchUrl = (
  params: ProductFilterParams
): string => {
  const productFilterParams = buildProductFilterParams(params);
  return `${baseUrl}/filter/products?${productFilterParams}`;
};

/**
 * Fetches available filtering options for products based on specified criteria.
 * It ensures the user is logged in by checking for a valid token.
 * The response is parsed as JSON and thrown as an error if the request fails.
 *
 * @param params Optional filtering parameters to refine product options.
 * @returns Promise<ProductFilterOption> A promise that resolves with the filtering options for products.
 * @throws If the response from the server is not ok, throws the error response.
 */
const fetchProductFilterOption = async (
  params: ProductFilterParams = {}
): Promise<ProductFilterOption> => {
  const token = ifLoggedInValidate();

  const url = buildProductFilterOptionSearchUrl(params);

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

// Exporting FilterService for use elsewhere in the application
export const FilterService = { fetchProductFilterOption };
