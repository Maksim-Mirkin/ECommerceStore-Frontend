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

export const RatingService = {
  postRating,
  updateRating,
  fetchRatingByProductId,
};
