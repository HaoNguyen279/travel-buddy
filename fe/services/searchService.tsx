import api from "./api";

export type SearchItem =
  | {
      type: "tour";
      tour_id: string;
      name: string;
      image_url?: string | null;
      average_rating: number;
      base_price: number;
      days: number;
      nights: number;
      booking_count: number;
      ratings_count: number;
      place?: {
        name?: string | null;
        slug?: string | null;
      } | null;
      category?: {
        name?: string | null;
      } | null;
    }
  | {
      type: "place";
      place_id: string;
      name: string;
      slug?: string | null;
      image_url?: string | null;
      average_rating: number;
    };

export const searchAll = async (query: string, limit = 6) => {
  const res = await api.get("/search", {
    params: { q: query, limit },
  });
  return res.data as { query: string; items: SearchItem[] };
};
