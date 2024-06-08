import { baseUrl, ifLoggedInValidate } from ".";
import {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  UpdateUserDataRequest,
} from "../@types/types";

/**
 * Registers a new user with the provided user details.
 * @param body The user details to register.
 * @returns The response from the registration API.
 * @throws An error response object if the registration fails.
 */
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

/**
 * Logs in a user with the provided credentials.
 * @param body The login credentials.
 * @returns The response from the login API.
 * @throws An error response object if the login fails.
 */
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

/**
 * Fetches the details of the current logged-in user.
 * @returns The current user's details.
 * @throws An error response object if fetching user details fails.
 */
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

/**
 * Updates the details of the current logged-in user.
 * @param user The new user details to update.
 * @returns The response from the update API.
 * @throws An error response object if updating the user details fails.
 */
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

/**
 * Changes the password for the current logged-in user.
 * @param body The password change request details.
 * @returns The response from the password change API.
 * @throws An error response object if the password change fails.
 */
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

// Exporting authentication functions as a grouped object
export const Auth = {
  register,
  login,
  getUserDetails,
  updateUserDetails,
  changePassword,
};
