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

export type PlaceTour = {
  tour_id: string;
  name: string;
  description?: string | null;
  base_price: number;
  days: number;
  nights: number;
  booking_count: number;
  image_url?: string | null;
  average_rating: number;
  ratings?: Array<{ rating_id: string }>;
  category?: {
    name?: string | null;
  } | null;
};

export type PlaceWithTours = {
  place_id: string;
  name: string;
  description?: string | null;
  city?: string | null;
  country?: string | null;
  slug?: string | null;
  image_url?: string | null;
  tours?: PlaceTour[];
};

export const getPlacesWithTours = async (tourLimit = 3) => {
  const res = await api.get("/place", {
    params: { includeTours: true, tourLimit },
  });
  return res.data;
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
