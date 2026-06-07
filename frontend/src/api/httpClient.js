import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function sendRequest(config) {
  const response = await httpClient.request(config);
  return response.data;
}
