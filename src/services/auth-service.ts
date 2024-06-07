import { baseUrl, ifLoggedInValidate } from ".";
import {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  UpdateUserDataRequest,
} from "../@types/types";

async function register(body: RegisterRequest) {
  const res = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }
  return json;
}

async function login(body: LoginRequest) {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }
  return json;
}

async function getUserDetails() {
  const token = ifLoggedInValidate();

  const res = await fetch(`${baseUrl}/auth/current-user`, {
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
}

async function updateUserDetails(user: UpdateUserDataRequest) {
  const token = ifLoggedInValidate();

  const res = await fetch(`${baseUrl}/auth/update-data`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }

  return json;
}

async function changePassword(body: ChangePasswordRequest) {
  const token = ifLoggedInValidate();

  const res = await fetch(`${baseUrl}/auth/update-password`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }

  return json;
}

export const Auth = {
  register,
  login,
  getUserDetails,
  updateUserDetails,
  changePassword,
};
