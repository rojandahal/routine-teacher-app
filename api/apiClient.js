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

export const getBatch = async endpoint => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getProfile = async (endpoint, token) => {
  try {
    const response = await apiClient.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getBatchId = async (endpoint, batch) => {
  try {
    const response = await apiClient.get(endpoint, {
      params: {
        batch: batch,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getRoutine = async endpoint => {
  return apiClient.get(endpoint);
};

export const getAllRoutine = async endpoint => {
  return apiClient.get(endpoint);
};

export const updateRoutine = async (endpoint, data) => {
  return apiClient.put(endpoint);
}