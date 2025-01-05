import axios from "axios";
import Swal from "sweetalert2";
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

client.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error) {
      if (error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: error?.response?.data?.error?.message,
        });
      }
      return Promise.reject(error);
    }
  }
);

export default client;
