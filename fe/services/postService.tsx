import api from "./api";

export type PostAuthor = {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type Post = {
  post_id: string;
  user_id: string;
  place_id: string;
  content: string;
  image_url: string | null;
  createdAt?: string;
  created_at?: string;
  author?: PostAuthor;
  place?: {
    name?: string | null;
  } | null;
};
export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const res = await api.post("/post", payload);
  return res.data as Post;
}

export type CreatePostPayload = {
  user_id: string;
  place_id: string;
  content: string;
  image_url?: string | null;
};

export const getPosts = async (userId?: string): Promise<Post[]> => {
  const res = await api.get("/post", {
    params: userId ? { user_id: userId } : undefined,
  });
  return Array.isArray(res.data) ? res.data : [];
};

export const getPostsByPlaceSlug = async (
  slug: string,
  limit?: number,
): Promise<Post[]> => {
  const res = await api.get(`/post/place/${slug}`, {
    params: limit ? { limit } : undefined,
  });
  return Array.isArray(res.data) ? res.data : [];
};
