import api from "./api";

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
