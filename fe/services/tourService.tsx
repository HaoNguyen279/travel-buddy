import api from "./api";

export const getTours = async () => {
  const res = await api.get("/tour");
  return res.data;
};

export const getToursByPlaceSlug = async (slug: string) => {
  const res = await api.get(`/tour/destination/${slug}`);
  return res.data;
};

export const getToursByPlaceId = async (placeId: string) => {
  const res = await api.get("/tour", {
    params: { place_id: placeId },
  });
  return res.data;
};

export const getToursLimit = async (limit = 6) => {
  const res = await api.get("/tour", {
    params: { limit },
  });
  return res.data;
};
