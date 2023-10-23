import axios from "./axios";
import * as ApiEndpoint from "./ApiEndpoint";
import { token } from "../utils";

export const CheckoutOrderService = async (data) => {
  return await axios.post(`${ApiEndpoint.ORDER_ENDPOINT}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetAllOrderUserService = async (query) => {
  return await axios.get(`${ApiEndpoint.ORDER_ENDPOINT}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: query,
  });
};
