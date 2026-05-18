"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass, MapPin, PenSquare, Search } from "lucide-react";
import { Navbar } from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { getPosts, type Post } from "@/services/postService";
import { PostCard } from "@/components/ui/Post/PostCard";

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState<"all" | "content" | "author" | "placeName">("all");

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
            <button className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700">
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
            <h2 className="text-lg font-semibold text-slate-800">Gợi ý khám phá</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <Compass className="mt-0.5 h-4 w-4 text-sky-600" />
                <p>Chia sẻ nơi bạn vừa ghé để giúp cộng đồng dễ chọn điểm đến.</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-violet-600" />
                <p>Gắn địa điểm trong bài viết để liên kết nhanh sang trang Place.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer props={dataFooter} />
    </main>
  );
}
