import api from "./api";

export type TourPayload = {
  place_id: string;
  category_id: string;
  name: string;
  description?: string;
  base_price: number;
  days: number;
  nights: number;
  max_guests: number;
  min_guests: number;
  image_url?: string;
  status?: string;
};

export const getTours = async () => {
  const res = await api.get("/tour");
  return res.data;
};

export const getToursByPlaceSlug = async (slug: string) => {
  const res = await api.get(`/tour/destination/${slug}`);
  return res.data;
};

export const getToursLimit = async (limit = 6) => {
  const res = await api.get("/tour", {
    params: { limit },
  });
  return res.data;
};

export const createTour = async (payload: TourPayload) => {
  const res = await api.post("/tour", payload);
  return res.data;
};

export const updateTour = async (tour_id: string, payload: TourPayload) => {
  const res = await api.put(`/tour/${tour_id}`, payload);
  return res.data;
};

export const deleteTour = async (tour_id: string) => {
  const res = await api.delete(`/tour/${tour_id}`);
  return res.data;
};

export const getTourFormData = async () => {
  const res = await api.get("/tour/form-data");
  return res.data;
};
