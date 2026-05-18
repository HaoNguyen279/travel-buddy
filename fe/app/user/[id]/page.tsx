"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { PostCard } from "@/components/ui/Post/PostCard";
import { getPosts, type Post } from "@/services/postService";
import {
  followUser,
  getFollowers,
  getUserProfile,
  unfollowUser,
  type FollowListItem,
  type UserProfile,
} from "@/services/userProfileService";

const navProps = {
  webName: "TravelBuddy",
  subtitle: "Đặt chỗ, khám phá và lên kế hoạch cho chuyến đi của bạn",
  itemOnNav: [
    { itemName: "Post", linkTo: "/post" },
    { itemName: "Place", linkTo: "/place/da-nang" },
    { itemName: "Chat", linkTo: "/chat" },
  ],
};

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params?.id;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<FollowListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [followSubmitting, setFollowSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) return;
    async function loadData() {
      try {
        const profileData = await getUserProfile(userId);
        setProfile(profileData);
        const [postData, friendsData] = await Promise.all([
          getPosts(userId),
          getFollowers(userId),
        ]);
        setPosts(postData);
        setFriends(friendsData.items || []);
      } catch {
        setError("Không thể tải hồ sơ người dùng.");
      }
    }
    void loadData();
  }, [userId]);

  const handleToggleFollow = async () => {
    if (!profile || followSubmitting) return;
    setFollowSubmitting(true);
    try {
      if (profile.is_following) {
        const ok = await unfollowUser(profile.user_id);
        if (ok) {
          setProfile({
            ...profile,
            is_following: false,
            stats: { ...profile.stats, followers: Math.max(0, profile.stats.followers - 1) },
          });
        }
      } else {
        const ok = await followUser(profile.user_id);
        if (ok) {
          setProfile({
            ...profile,
            is_following: true,
            stats: { ...profile.stats, followers: profile.stats.followers + 1 },
          });
        }
      }
      setError(null);
    } catch {
      setError("Không thể cập nhật theo dõi lúc này. Vui lòng đăng nhập lại.");
    } finally {
      setFollowSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar
        webName={navProps.webName}
        subtitle={navProps.subtitle}
        itemOnNav={navProps.itemOnNav}
      />
      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center text-rose-700">
            {error}
          </div>
        ) : !profile ? (
          <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
            Đang tải hồ sơ...
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-100 text-3xl font-bold text-sky-700">
                    {(profile.full_name || profile.username).slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {profile.full_name || profile.username}
                    </h1>
                    <p className="text-sm text-slate-500">@{profile.username}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {profile.bio || "Người dùng chưa có phần giới thiệu."}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleToggleFollow}
                    disabled={followSubmitting}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 ${
                      profile.is_following ? "bg-slate-700" : "bg-sky-600"
                    }`}
                  >
                    {profile.is_following ? "Đang theo dõi" : "Theo dõi"}
                  </button>
                  <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
                    Nhắn tin
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-5 border-t border-slate-200 pt-3 text-sm">
                <span>
                  <strong>{profile.stats.posts}</strong> bài viết
                </span>
                <span>
                  <strong>{profile.stats.followers}</strong> người theo dõi
                </span>
                <span>
                  <strong>{profile.stats.following}</strong> đang theo dõi
                </span>
              </div>
              <div className="mt-3 border-t border-slate-200 pt-3">
                <span className="border-b-2 border-sky-600 pb-2 text-sm font-semibold text-sky-600">
                  Bài viết
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
              <aside className="space-y-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <h2 className="text-base font-semibold text-slate-900">Giới thiệu</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {profile.bio || "Không có mô tả."}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <h2 className="text-base font-semibold text-slate-900">Bạn bè</h2>
                  <div className="mt-2 space-y-2">
                    {friends.length > 0 ? (
                      friends.map((friend) => (
                        <Link
                          key={friend.user_id}
                          href={`/user/${friend.user_id}`}
                          className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-100"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                            {(friend.full_name || friend.username)
                              .slice(0, 1)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {friend.full_name || friend.username}
                            </p>
                            <p className="text-xs text-slate-500">@{friend.username}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">Chưa có bạn bè.</p>
                    )}
                  </div>
                </div>
              </aside>
              <section className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => <PostCard key={post.post_id} post={post} />)
                ) : (
                  <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
                    Người dùng chưa có bài viết nào.
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
