import axios from "./axios";
import * as ApiEndpoint from "./ApiEndpoint";

export const LoginAdminService = async (data) => {
  return await axios.post(`${ApiEndpoint.ADMIN_ENDPOINT}/login`, data);
};
