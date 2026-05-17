import api from "./api";

export const getTours = async () => {
  const res = await api.get("/tour");
  return res.data;
};
