"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Navbar } from "@/components/nav/Navbar";
import { PostCard } from "@/components/ui/Post/PostCard";
import { getPosts, type Post } from "@/services/postService";
import {
  getFollowers,
  getUserProfile,
  resolveUserIdByEmail,
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

function MyProfileContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<FollowListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const queryId = searchParams.get("id");
        let targetId = queryId;
        if (!targetId && user?.email) {
          targetId = await resolveUserIdByEmail(user.email);
        }

        if (!targetId) {
          setError("Không xác định được hồ sơ của bạn.");
          return;
        }

        const profileData = await getUserProfile(targetId);
        setProfile(profileData);
        const [postData, friendsData] = await Promise.all([
          getPosts(profileData.user_id),
          getFollowers(profileData.user_id),
        ]);
        setPosts(postData);
        setFriends(friendsData.items || []);
      } catch {
        setError("Không thể tải trang hồ sơ.");
      }

    }

    void loadData();
  }, [searchParams, user?.email]);

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
                    {(profile.full_name || profile.username)
                      .slice(0, 1)
                      .toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {profile.full_name || profile.username}
                    </h1>
                    <p className="text-sm text-slate-500">
                      @{profile.username}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {profile.bio || "Chưa có phần giới thiệu."}
                    </p>
                  </div>
                </div>
                <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
                  Chỉnh sửa trang cá nhân
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-5 border-t text-slate-500 border-slate-200 pt-3 text-sm">
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
                  <h2 className="text-base font-semibold text-slate-900">
                    Giới thiệu
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {profile.bio || "Bạn chưa thêm mô tả."}
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
                  posts.map((post) => (
                    <PostCard key={post.post_id} post={post} />
                  ))
                ) : (
                  <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
                    Bạn chưa có bài viết nào.
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

export default function MyProfilePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-100" />}>
      <MyProfileContent />
    </Suspense>
  );
}
