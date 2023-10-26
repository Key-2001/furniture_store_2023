import axios from "./axios";
import * as APIEndpoint from "./ApiEndpoint";

export const SendMailDiscountService = async (email) => {
  return await axios.post(`${APIEndpoint.DISCOUNT_ENDPOINT}/email`, {
    email: email,
  });
};

export const CheckDiscountService = async (discount) => {
  return await axios.post(`${APIEndpoint.DISCOUNT_ENDPOINT}/code`, discount);
};

export const GetAllDiscountService = async (token, query) => {
  return await axios.get(`${APIEndpoint.DISCOUNT_ENDPOINT}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: query,
  });
};
