import api from "./api";

export type UserProfile = {
  user_id: string;
  username: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  is_following: boolean;
};

export type FollowListItem = {
  user_id: string;
  email?: string | null;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type FollowListResponse = {
  items: FollowListItem[];
  total: number;
};

export type BasicUser = {
  user_id: string;
  email: string;
};

export async function getMyProfile(): Promise<UserProfile> {
  const res = await api.get("/user/me/profile");
  return res.data;
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const res = await api.get(`/user/${userId}/profile`);
  return res.data;
}

export async function followUser(userId: string): Promise<boolean> {
  const res = await api.post(`/user/${userId}/follow`);
  return Boolean(res.data?.followed);
}

export async function unfollowUser(userId: string): Promise<boolean> {
  const res = await api.delete(`/user/${userId}/follow`);
  return Boolean(res.data?.unfollowed);
}

export async function getFollowers(userId: string): Promise<FollowListResponse> {
  const res = await api.get(`/user/${userId}/followers`);
  return res.data;
}

export async function getFollowing(userId: string): Promise<FollowListResponse> {
  const res = await api.get(`/user/${userId}/following`);
  return res.data;
}

export async function resolveUserIdByEmail(
  email: string,
): Promise<string | null> {
  const res = await api.get("/user");
  const users: BasicUser[] = Array.isArray(res.data) ? res.data : [];
  const matched = users.find(
    (item) => item.email?.toLowerCase() === email.toLowerCase(),
  );
  return matched?.user_id ?? null;
}
