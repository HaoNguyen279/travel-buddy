import api from "./api";

export const getPosts = async () => {
  const res = await api.get("/post");
  return res.data;
};
