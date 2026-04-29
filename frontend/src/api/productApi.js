import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const fetchProducts = async () => {
  const { data } = await API.get("/products");
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};