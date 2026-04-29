import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
};