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
