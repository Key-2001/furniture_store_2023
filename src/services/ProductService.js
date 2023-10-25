import axios from "./axios";
import * as APIEndpoint from "./ApiEndpoint";

export const GetAllProductsService = async (query) => {
  return await axios.get(APIEndpoint.PRODUCTS_ENDPOINT, { params: query });
};

export const GetDetailProductService = async (id) => {
  return await axios.get(`${APIEndpoint.PRODUCTS_ENDPOINT}/${id}`);
};

export const CreateProductService = async (data, token) => {
  return await axios.post(`${APIEndpoint.PRODUCTS_ENDPOINT}/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const UpdateProductService = async (id, data, token) => {
  return await axios.patch(`${APIEndpoint.PRODUCTS_ENDPOINT}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const RemoveProductService = async (ids, token) => {
  return await axios.delete(
    `${APIEndpoint.PRODUCTS_ENDPOINT}/multiple?${ids}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
