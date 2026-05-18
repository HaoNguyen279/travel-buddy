import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-buddy-hbw8.onrender.com",
  withCredentials: true, // mỗi khi gửi request sẽ tự động gửi cookie (nếu có) đi kèm ez
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config as
      | (typeof error.config & { _retry?: boolean })
      | undefined;

    if (
      originalRequest &&
      (status === 401 || status === 403) &&
      !originalRequest._retry &&
      !String(originalRequest.url || "").includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      await api.post("/auth/refresh");
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
