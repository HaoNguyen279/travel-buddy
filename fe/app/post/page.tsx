"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { PenSquare, Search } from "lucide-react";
import { Navbar } from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { createPost, getPosts, type Post } from "@/services/postService";
import { getPlaces, type PlaceSummary } from "@/services/placeService";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";
import {
  getFollowing,
  resolveUserIdByEmail,
  type FollowListItem,
} from "@/services/userProfileService";
import { PostCard } from "@/components/ui/Post/PostCard";
import { useAuth } from "@/app/context/AuthContext";

const navProps = {
  webName: "TravelBuddy",
  subtitle: "Đặt chỗ, khám phá và lên kế hoạch cho chuyến đi của bạn",
  itemOnNav: [
    { itemName: "Post", linkTo: "/post" },
    { itemName: "Place", linkTo: "/place/da-nang" },
    { itemName: "Chat", linkTo: "/chat" },
  ],
};

const dataFooter = [
  {
    footerTitle: "Community",
    footerItems: [
      { itemName: "Quy tắc cộng đồng", linkTo: "#" },
      { itemName: "Mẹo chia sẻ bài viết", linkTo: "#" },
      { itemName: "Trung tâm hỗ trợ", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Khám phá",
    footerItems: [
      { itemName: "Điểm đến thịnh hành", linkTo: "#" },
      { itemName: "Gợi ý lịch trình", linkTo: "#" },
      { itemName: "Top review mới", linkTo: "#" },
    ],
  },
  {
    footerTitle: "TravelBuddy",
    footerItems: [
      { itemName: "Điều khoản", linkTo: "#" },
      { itemName: "Chính sách riêng tư", linkTo: "#" },
      { itemName: "Liên hệ", linkTo: "#" },
    ],
  },
];

export default function PostPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState<"all" | "content" | "author" | "placeName">("all");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [draftContent, setDraftContent] = useState("");
  const [draftPlaceName, setDraftPlaceName] = useState("");
  const [draftPlaceId, setDraftPlaceId] = useState<string | null>(null);
  const [draftImageFile, setDraftImageFile] = useState<File | null>(null);
  const [draftImagePreview, setDraftImagePreview] = useState<string | null>(null);
  const [draftImageName, setDraftImageName] = useState("");
  const [composerError, setComposerError] = useState<string | null>(null);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [places, setPlaces] = useState<PlaceSummary[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [placeLoadError, setPlaceLoadError] = useState<string | null>(null);
  const [isPlaceSuggestionOpen, setIsPlaceSuggestionOpen] = useState(false);
  const [friends, setFriends] = useState<FollowListItem[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [friendsError, setFriendsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        setError("Không thể tải bài viết.");
      } finally {
        setLoading(false);
      }
    }

    void fetchData();
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setFriends([]);
      setFriendsError(null);
      setIsLoadingFriends(false);
      return;
    }

    let isMounted = true;
    const loadFriends = async () => {
      setIsLoadingFriends(true);
      setFriendsError(null);
      try {
        const currentUserId = await resolveUserIdByEmail(user.email || "");
        if (!currentUserId) {
          throw new Error("Không xác định được tài khoản hiện tại.");
        }
        const following = await getFollowing(currentUserId);
        if (isMounted) {
          setFriends(following.items || []);
        }
      } catch {
        if (isMounted) {
          setFriends([]);
          setFriendsError("Không thể tải danh sách bạn bè.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingFriends(false);
        }
      }
    };

    void loadFriends();
    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  useEffect(() => () => {
    if (draftImagePreview) {
      URL.revokeObjectURL(draftImagePreview);
    }
  }, [draftImagePreview]);

  useEffect(() => {
    if (!isComposerOpen || places.length > 0) return;

    let isMounted = true;
    const fetchPlaces = async () => {
      setIsLoadingPlaces(true);
      setPlaceLoadError(null);
      try {
        const data = await getPlaces();
        const validPlaces = data.filter(
          (item) => Boolean(item.place_id) && Boolean(item.name),
        );
        if (isMounted) {
          setPlaces(validPlaces);
        }
      } catch {
        if (isMounted) {
          setPlaceLoadError("Không thể tải danh sách địa điểm.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingPlaces(false);
        }
      }
    };

    void fetchPlaces();
    return () => {
      isMounted = false;
    };
  }, [isComposerOpen, places.length]);

  const resetComposer = () => {
    if (draftImagePreview) {
      URL.revokeObjectURL(draftImagePreview);
    }
    setDraftContent("");
    setDraftPlaceName("");
    setDraftPlaceId(null);
    setDraftImageFile(null);
    setDraftImagePreview(null);
    setDraftImageName("");
    setComposerError(null);
    setPlaceLoadError(null);
    setIsPlaceSuggestionOpen(false);
  };

  const closeComposer = () => {
    setIsComposerOpen(false);
    resetComposer();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (draftImagePreview) {
      URL.revokeObjectURL(draftImagePreview);
    }
    if (!file) {
      setDraftImageFile(null);
      setDraftImagePreview(null);
      setDraftImageName("");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setDraftImageFile(file);
    setDraftImagePreview(previewUrl);
    setDraftImageName(file.name);
  };

  const handleSubmitPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComposerError(null);

    const content = draftContent.trim();
    const placeName = draftPlaceName.trim();

    if (!content) {
      setComposerError("Vui lòng nhập nội dung bài viết.");
      return;
    }
    if (!draftPlaceId || !placeName) {
      setComposerError("Vui lòng chọn địa điểm từ danh sách gợi ý.");
      return;
    }

    if (!user?.email) {
      setComposerError("Bạn cần đăng nhập để đăng bài.");
      return;
    }

    setIsSubmittingPost(true);
    try {
      const userId = await resolveUserIdByEmail(user.email);
      if (!userId) {
        throw new Error("Không xác định được tài khoản hiện tại.");
      }

      const imageUrl = draftImageFile
        ? await uploadImageToCloudinary(draftImageFile)
        : null;

      await createPost({
        user_id: userId,
        place_id: draftPlaceId,
        content,
        image_url: imageUrl,
      });

      const latestPosts = await getPosts();
      setPosts(latestPosts);
      setIsComposerOpen(false);
      resetComposer();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Đăng bài thất bại, vui lòng thử lại.";
      setComposerError(message);
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const filteredPosts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return posts;

    return posts.filter((post) => {
      const displayName = (
        post.author?.full_name ??
        post.author?.username ??
        ""
      ).toLowerCase();
      const content = String(post.content ?? "").toLowerCase();
      const placeName = String(post.place?.name ?? "").toLowerCase();

      if (searchCriteria === "content") return content.includes(keyword);
      if (searchCriteria === "author") return displayName.includes(keyword);
      if (searchCriteria === "placeName") return placeName.includes(keyword);

      return (
        content.includes(keyword) ||
        displayName.includes(keyword) ||
        placeName.includes(keyword)
      );
    });
  }, [posts, searchCriteria, searchKeyword]);

  const filteredPlaceSuggestions = useMemo(() => {
    const keyword = draftPlaceName.trim().toLowerCase();
    if (!keyword) return [];
    return places.filter((item) => {
      const name = String(item.name ?? "").toLowerCase();
      const city = String(item.city ?? "").toLowerCase();
      const country = String(item.country ?? "").toLowerCase();
      return (
        name.includes(keyword) ||
        city.includes(keyword) ||
        country.includes(keyword)
      );
    }).slice(0, 8);
  }, [draftPlaceName, places]);

  const handlePlaceInputChange = (value: string) => {
    setDraftPlaceName(value);
    setDraftPlaceId(null);
    setComposerError(null);
    setIsPlaceSuggestionOpen(true);
  };

  const handleSelectPlace = (place: PlaceSummary) => {
    setDraftPlaceName(place.name ?? "");
    setDraftPlaceId(place.place_id ?? null);
    setComposerError(null);
    setIsPlaceSuggestionOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-amber-50">
      <Navbar
        webName={navProps.webName}
        subtitle={navProps.subtitle}
        itemOnNav={navProps.itemOnNav}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-sky-700 sm:text-3xl">
                Cộng đồng TravelBuddy
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Chia sẻ trải nghiệm thật từ những chuyến đi gần đây.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Tìm bài viết theo nội dung, tác giả, tên địa điểm..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <select
                  value={searchCriteria}
                  onChange={(e) =>
                    setSearchCriteria(
                      e.target.value as "all" | "content" | "author" | "placeName",
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="all">Tất cả tiêu chí</option>
                  <option value="content">Nội dung bài viết</option>
                  <option value="author">Tác giả</option>
                  <option value="placeName">Tên địa điểm</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              <PenSquare className="h-4 w-4" />
              Tạo bài viết
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500">
                Đang tải bài viết...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
                {error}
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((item) => <PostCard key={item.post_id} post={item} />)
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500">
                {posts.length === 0
                  ? "Chưa có bài viết nào."
                  : "Không có bài viết phù hợp với bộ lọc."}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Bạn bè</h2>
            <div className="mt-4 space-y-2">
              {isLoadingFriends ? (
                <p className="text-sm text-slate-500">Đang tải danh sách bạn bè...</p>
              ) : friendsError ? (
                <p className="text-sm text-rose-600">{friendsError}</p>
              ) : friends.length > 0 ? (
                friends.slice(0, 8).map((friend) => (
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
                        {(friend.full_name || friend.username).slice(0, 1).toUpperCase()}
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
                <p className="text-sm text-slate-500">Bạn chưa theo dõi ai.</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      {isComposerOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 sm:items-center">
          <div className="my-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:my-0 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Tạo bài viết mới</h2>
                <p className="text-sm text-slate-500">
                  Chia sẻ trải nghiệm mới của bạn với cộng đồng.
                </p>
              </div>
              <button
                type="button"
                onClick={closeComposer}
                disabled={isSubmittingPost}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
              >
                Đóng
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmitPost}>
              <div className="space-y-2">
                <label htmlFor="post-content" className="text-sm font-medium text-slate-700">
                  Nội dung bài viết
                </label>
                <textarea
                  id="post-content"
                  rows={5}
                  value={draftContent}
                  disabled={isSubmittingPost}
                  onChange={(e) => setDraftContent(e.target.value)}
                  placeholder="Bạn vừa đi đâu, có gì hay muốn chia sẻ?"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="post-place" className="text-sm font-medium text-slate-700">
                  Địa điểm
                </label>
                <div className="relative">
                  <input
                    id="post-place"
                    type="text"
                    value={draftPlaceName}
                    disabled={isSubmittingPost}
                    onChange={(e) => handlePlaceInputChange(e.target.value)}
                    onFocus={() => setIsPlaceSuggestionOpen(true)}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsPlaceSuggestionOpen(false);
                      }, 120);
                    }}
                    placeholder="Gõ để tìm địa điểm có trong hệ thống"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                  {isPlaceSuggestionOpen && draftPlaceName.trim() ? (
                    <div className="absolute z-10 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                      {isLoadingPlaces ? (
                        <p className="px-3 py-2 text-sm text-slate-500">Đang tải địa điểm...</p>
                      ) : filteredPlaceSuggestions.length > 0 ? (
                        filteredPlaceSuggestions.map((item) => {
                          const itemName = item.name ?? "Địa điểm";
                          const itemCity = item.city ? ` · ${item.city}` : "";
                          return (
                            <button
                              key={item.place_id ?? item.name}
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSelectPlace(item)}
                              className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-sky-50"
                            >
                              <span className="font-medium">{itemName}</span>
                              <span className="text-slate-500">{itemCity}</span>
                            </button>
                          );
                        })
                      ) : (
                        <p className="px-3 py-2 text-sm text-slate-500">
                          Không tìm thấy địa điểm phù hợp.
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>
                {draftPlaceId ? (
                  <p className="text-xs text-emerald-600">Đã chọn địa điểm hợp lệ từ hệ thống.</p>
                ) : (
                  <p className="text-xs text-slate-500">Bạn cần chọn một địa điểm trong danh sách gợi ý.</p>
                )}
                {placeLoadError ? <p className="text-xs text-rose-600">{placeLoadError}</p> : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="post-image" className="text-sm font-medium text-slate-700">
                  Ảnh đính kèm
                </label>
                <input
                  id="post-image"
                  type="file"
                  accept="image/*"
                  disabled={isSubmittingPost}
                  onChange={handleImageChange}
                  className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-100"
                />
                {draftImageName ? <p className="text-xs text-slate-500">{draftImageName}</p> : null}
              </div>

              {draftImagePreview ? (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <Image
                    src={draftImagePreview}
                    alt="Xem trước ảnh bài viết"
                    width={1200}
                    height={800}
                    className="h-auto max-h-72 w-full object-cover"
                    unoptimized
                  />
                </div>
              ) : null}

              {composerError ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {composerError}
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeComposer}
                  disabled={isSubmittingPost}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPost}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  <PenSquare className="h-4 w-4" />
                  {isSubmittingPost ? "Đang đăng..." : "Đăng bài"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <Footer props={dataFooter} />
    </main>
  );
}
