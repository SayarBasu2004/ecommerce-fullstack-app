import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const loginUser = async (data) => {
  const res = await API.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/users/register", data);
  return res.data;
};