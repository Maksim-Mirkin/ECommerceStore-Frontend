import { baseUrl, buildProductFilterParams, ifLoggedInValidate } from ".";
import { ProductFilterOption, ProductFilterParams } from "../@types/types";

const buildProductFilterOptionSearchUrl = (
  params: ProductFilterParams
): string => {
  const productFilterParams = buildProductFilterParams(params);
  return `${baseUrl}/filter/products?${productFilterParams}`;
};

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

export const FilterService = { fetchProductFilterOption };
