import axios from "./axios";
import * as APIEndpoint from "./ApiEndpoint";
import { token } from "../utils";

export const UpdateAccountService = async (data) => {
  return await axios.put(`${APIEndpoint.USER_ENDPOINT}/edit`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const GetProfileAccountService = async () => {
  return await axios.get(`${APIEndpoint.USER_ENDPOINT}/profile/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const ChangePasswordAccountService = async (password) => {
  return await axios.put(
    `${APIEndpoint.USER_ENDPOINT}/change-password`,
    password,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const ForgotPasswordAccountService = async (data) => {
  return await axios.post(`${APIEndpoint.USER_ENDPOINT}/send-mail`, data);
};
