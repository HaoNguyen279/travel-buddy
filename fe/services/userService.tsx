import api from "./api";

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
