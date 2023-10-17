import axios from "./axios";
import * as APIEndpoint from "./ApiEndpoint";

export const GetAllProductsService = async (query) => {
  return await axios.get(APIEndpoint.PRODUCTS_ENDPOINT, { params: query });
};
