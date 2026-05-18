import api from "./api";

export type PlaceSummary = {
  place_id?: string;
  name?: string | null;
  slug?: string | null;
  image_url?: string | null;
  description?: string | null;
  city?: string | null;
  country?: string | null;
};

export const getPlaceById = async (placeId: string) => {
  const res = await api.get(`/place/${placeId}`);
  return res.data as PlaceSummary;
};

export const getPlaceBySlug = async (slug: string) => {
  const res = await api.get("/place", {
    params: { destination: slug },
  });
  const items = Array.isArray(res.data) ? (res.data as PlaceSummary[]) : [];
  return items[0] ?? null;
};

export const getPlacesLimit = async (limit = 4) => {
  const res = await api.get("/place", {
    params: { limit },
  });
  return Array.isArray(res.data) ? (res.data as PlaceSummary[]) : [];
};

export const getPlaces = async () => {
  const res = await api.get("/place");
  return Array.isArray(res.data) ? (res.data as PlaceSummary[]) : [];
};
