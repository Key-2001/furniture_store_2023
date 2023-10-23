import axios from "./axios";
import * as ApiEndpoint from "./ApiEndpoint";
import { tokenAdmin } from "../utils";

export const LoginAdminService = async (data) => {
  return await axios.post(`${ApiEndpoint.ADMIN_ENDPOINT}/login`, data);
};

export const GetProductAdminService = async (query) => {
  return await axios.get(`${ApiEndpoint.ADMIN_ENDPOINT}/product`, {
    headers: { Authorization: `Bearer ${tokenAdmin}` },
    params: query,
  });
};

export const GetUserAdminService = async (query) => {
  return await axios.get(`${ApiEndpoint.ADMIN_ENDPOINT}/user`, {
    headers: { Authorization: `Bearer ${tokenAdmin}` },
    params: query,
  });
};
