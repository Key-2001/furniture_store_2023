import axios from "./axios";
import * as APIEndpoint from "./ApiEndpoint";

export const GetAnalyticService = async (token) => {
  return await axios.get(`${APIEndpoint.ANALYTIC_ENDPOINT}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
