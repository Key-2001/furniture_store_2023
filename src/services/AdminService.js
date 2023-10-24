import axios from "./axios";
import * as ApiEndpoint from "./ApiEndpoint";

export const LoginAdminService = async (data) => {
  return await axios.post(`${ApiEndpoint.ADMIN_ENDPOINT}/login`, data);
};

export const GetProductAdminService = async (query, token) => {
  return await axios.get(`${ApiEndpoint.ADMIN_ENDPOINT}/product`, {
    headers: { Authorization: `Bearer ${token}` },
    params: query,
  });
};

export const GetUserAdminService = async (query, token) => {
  return await axios.get(`${ApiEndpoint.ADMIN_ENDPOINT}/user`, {
    headers: { Authorization: `Bearer ${token}` },
    params: query,
  });
};

export const GetOrderAdminService = async (query, token) => {
  return await axios.get(`${ApiEndpoint.ADMIN_ENDPOINT}/order`, {
    headers: { Authorization: `Bearer ${token}` },
    params: query,
  });
};

export const GetOrderAdminDetailService = async (id, token) => {
  return await axios.get(`${ApiEndpoint.ADMIN_ENDPOINT}/order/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
