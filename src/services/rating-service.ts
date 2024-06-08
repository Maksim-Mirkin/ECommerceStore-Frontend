import { baseUrl, ifLoggedInValidate } from ".";
import { RatingRequest } from "../@types/types";

export type Rating = {
  id: number;
  rating: number;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * Posts a new rating for a product.
 * Requires user authentication.
 *
 * @param data The rating data including the product ID and the rating value.
 * @returns Promise<Rating> A promise that resolves to the newly created rating.
 * @throws Throws the error response if the API request fails.
 */
const postRating = async (data: RatingRequest): Promise<Rating> => {
  const token = ifLoggedInValidate();

  const url = `${baseUrl}/products/${data.productId}/ratings`;

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
 * Updates an existing rating for a product.
 * Requires user authentication.
 *
 * @param data The updated rating data including the product ID and the rating value.
 * @returns Promise<Rating> A promise that resolves to the updated rating.
 * @throws Throws the error response if the API request fails.
 */
const updateRating = async (data: RatingRequest): Promise<Rating> => {
  const token = ifLoggedInValidate();

  const url = `${baseUrl}/products/${data.productId}/ratings`;

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

/**
 * Fetches the rating of a product by its product ID.
 * Requires user authentication.
 *
 * @param productId The ID of the product whose rating is to be fetched.
 * @returns Promise<Rating> A promise that resolves to the rating of the product.
 * @throws Throws the error response if the API request fails.
 */
const fetchRatingByProductId = async (productId: number): Promise<Rating> => {
  const token = ifLoggedInValidate();

  const url = `${baseUrl}/products/${productId}/ratings`;

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

// Exporting RatingService to be used throughout the application
export const RatingService = {
  postRating,
  updateRating,
  fetchRatingByProductId,
};
