"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Navbar } from "@/components/nav/Navbar";
import { PostCard } from "@/components/ui/Post/PostCard";
import { getPosts, type Post } from "@/services/postService";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";
import {
  getFollowing,
  getMyProfile,
  getUserProfile,
  resolveUserIdByEmail,
  updateMyProfile,
  type FollowListItem,
  type UserProfile,
} from "@/services/userProfileService";
import { navProps } from "@/constants/navigation";

function MyProfileContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<FollowListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editFullName, setEditFullName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAvatarFile, setEditAvatarFile] = useState<File | null>(null);
  const [editAvatarPreview, setEditAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (editAvatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(editAvatarPreview);
      }
    };
  }, [editAvatarPreview]);

  const closeEditModal = () => {
    if (editAvatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(editAvatarPreview);
    }
    setIsEditOpen(false);
    setEditError(null);
    setEditAvatarFile(null);
    setEditAvatarPreview(null);
  };

  const openEditModal = () => {
    if (!profile) return;
    if (editAvatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(editAvatarPreview);
    }
    setEditFullName(profile.full_name ?? "");
    setEditBio(profile.bio ?? "");
    setEditPhone(profile.phone ?? "");
    setEditAvatarFile(null);
    setEditAvatarPreview(profile.avatar_url ?? null);
    setEditError(null);
    setIsEditOpen(true);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (editAvatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(editAvatarPreview);
    }

    if (!file) {
      setEditAvatarFile(null);
      setEditAvatarPreview(profile?.avatar_url ?? null);
      return;
    }

    const preview = URL.createObjectURL(file);
    setEditAvatarFile(file);
    setEditAvatarPreview(preview);
  };

  const handleSubmitProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditError(null);

    const fullName = editFullName.trim();
    if (!fullName) {
      setEditError("Vui lòng nhập tên hiển thị.");
      return;
    }

    setIsSavingProfile(true);
    try {
      const avatarUrl = editAvatarFile
        ? await uploadImageToCloudinary(editAvatarFile)
        : profile?.avatar_url ?? null;

      const updatedProfile = await updateMyProfile({
        full_name: fullName,
        phone: editPhone.trim() || null,
        bio: editBio.trim() || null,
        avatar_url: avatarUrl,
      });

      setProfile(updatedProfile);
      setPosts((prev) =>
        prev.map((post) =>
          post.user_id === updatedProfile.user_id
            ? {
                ...post,
                author: {
                  username: post.author?.username ?? updatedProfile.username,
                  full_name: updatedProfile.full_name,
                  avatar_url: updatedProfile.avatar_url,
                },
              }
            : post,
        ),
      );
      closeEditModal();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Không thể cập nhật hồ sơ.";
      setEditError(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const queryId = searchParams.get("id");
        let profileData: UserProfile | null = null;

        if (queryId) {
          profileData = await getUserProfile(queryId);
          if (user?.email) {
            const myId = await resolveUserIdByEmail(user.email);
            setIsOwnProfile(Boolean(myId && myId === queryId));
          } else {
            setIsOwnProfile(false);
          }
        } else {
          profileData = await getMyProfile();
          setIsOwnProfile(true);
        }

        if (!profileData) {
          setError("Không xác định được hồ sơ của bạn.");
          return;
        }

        setProfile(profileData);
        const [postData, followingData] = await Promise.all([
          getPosts(profileData.user_id),
          getFollowing(profileData.user_id),
        ]);
        setPosts(postData);
        setFriends(followingData.items || []);
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
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || profile.username}
                      className="h-24 w-24 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-100 text-3xl font-bold text-sky-700">
                      {(profile.full_name || profile.username)
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {profile.full_name || profile.username}
                    </h1>
                    <p className="text-sm text-slate-500">
                      @{profile.username}
                    </p>
                    {profile.phone ? (
                      <p className="mt-1 text-sm text-slate-600">SĐT: {profile.phone}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-slate-600">
                      {profile.bio || "Chưa có phần giới thiệu."}
                    </p>
                  </div>
                </div>
                {isOwnProfile ? (
                  <button
                    type="button"
                    onClick={openEditModal}
                    className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800"
                  >
                    Chỉnh sửa trang cá nhân
                  </button>
                ) : null}
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
                          {friend.avatar_url ? (
                            <img
                              src={friend.avatar_url}
                              alt={friend.full_name || friend.username}
                              className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                              {(friend.full_name || friend.username)
                                .slice(0, 1)
                                .toUpperCase()}
                            </div>
                          )}
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

      {isEditOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 sm:items-center">
          <div className="my-4 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:my-0 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Chỉnh sửa hồ sơ</h2>
                <p className="text-sm text-slate-500">Cập nhật tên, ảnh đại diện, giới thiệu và số điện thoại.</p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                disabled={isSavingProfile}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
              >
                Đóng
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmitProfile}>
              <div className="space-y-2">
                <label htmlFor="profile-full-name" className="text-sm font-medium text-slate-700">
                  Tên hiển thị
                </label>
                <input
                  id="profile-full-name"
                  type="text"
                  value={editFullName}
                  disabled={isSavingProfile}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="profile-phone" className="text-sm font-medium text-slate-700">
                  Số điện thoại
                </label>
                <input
                  id="profile-phone"
                  type="text"
                  value={editPhone}
                  disabled={isSavingProfile}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="profile-bio" className="text-sm font-medium text-slate-700">
                  Giới thiệu
                </label>
                <textarea
                  id="profile-bio"
                  rows={4}
                  value={editBio}
                  disabled={isSavingProfile}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="profile-avatar" className="text-sm font-medium text-slate-700">
                  Ảnh đại diện
                </label>
                <input
                  id="profile-avatar"
                  type="file"
                  accept="image/*"
                  disabled={isSavingProfile}
                  onChange={handleAvatarChange}
                  className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-100"
                />
                {editAvatarPreview ? (
                  <img
                    src={editAvatarPreview}
                    alt="Ảnh đại diện xem trước"
                    className="h-24 w-24 rounded-full border border-slate-200 object-cover"
                  />
                ) : null}
              </div>

              {editError ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {editError}
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSavingProfile}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  {isSavingProfile ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
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
