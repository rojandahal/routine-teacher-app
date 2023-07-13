import axios from "axios";
import { baseURl } from "../env";

const apiClient = axios.create({
  baseURL: baseURl, // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response;
  } catch (error) {
    console.log("error.response", error.response);
    return error.response;
  }
};

export const registerUser = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
