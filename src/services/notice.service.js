import { API_HOST } from "../utils/contants";
import axios from "axios";

export const save = async (notice) => {
  try {
    const response = await axios.post(`${API_HOST}/notice`, notice);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error;
  }
};

export const getAll = async (page) => {
  try {
    const response = await axios.get(`${API_HOST}/notice/${page}`);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${API_HOST}/notice/id/${id}`);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error;
  }
};

export const update = async (id, notice) => {
  try {
    const response = await axios.put(`${API_HOST}/notice/${id}`, notice);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error;
  }
};

export const deleteNotice = async (id) => {
  try {
    const response = await axios.delete(`${API_HOST}/notice/${id}`);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error;
  }
};
