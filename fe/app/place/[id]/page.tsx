
"use client";

import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/nav/Navbar";
import { SectionHeading } from "@/components/section/SectionHeading";
import { getToursByPlaceSlug } from "@/services/tourService";
import { getPostsByPlaceSlug, type Post } from "@/services/postService";
import React, { useEffect, useMemo, useState } from "react";
import { ItemCard } from "@/components/ui/ItemCard";
type Props = {
  params: Promise<{ id: string }>;
};

type PlaceSummary = {
  name?: string | null;
  image_url?: string | null;
  description?: string | null;
};

type Tour = {
  tour_id: string;
  name: string;
  description?: string | null;
  base_price: number;
  days: number;
  nights: number;
  booking_count: number;
  image_url?: string | null;
  average_rating: number;
  ratings?: Array<unknown>;
  place?: PlaceSummary | null;
  category?: {
    name?: string | null;
  } | null;
};

type PlacePost = Post;

const navProps = {
  webName: "TravelBuddy",
  subtitle: "",
  itemOnNav: [
    { itemName: "Bài viết", linkTo: "/post" },
    { itemName: "Địa điểm", linkTo: "/place" },
    { itemName: "Chat", linkTo: "/chat" },
  ],
};

const dataFooter = [
  {
    footerTitle: "Hỗ trợ",
    footerItems: [
      { itemName: "Quản lý chuyến đi", linkTo: "#" },
      { itemName: "Liên hệ hỗ trợ", linkTo: "#" },
      { itemName: "Trung tâm an toàn", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Khám phá",
    footerItems: [
      { itemName: "Chương trình ưu đãi", linkTo: "#" },
      { itemName: "Deals theo mùa", linkTo: "#" },
      { itemName: "Bài viết du lịch", linkTo: "#" },
      { itemName: "Thuê xe", linkTo: "#" },
      { itemName: "Tìm chuyến bay", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Điều khoản",
    footerItems: [
      { itemName: "Chính sách bảo mật", linkTo: "#" },
      { itemName: "Điều khoản dịch vụ", linkTo: "#" },
      { itemName: "Quy định sử dụng", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Đối tác",
    footerItems: [
      { itemName: "Đăng ký đối tác", linkTo: "#" },
      { itemName: "Hỗ trợ đối tác", linkTo: "#" },
      { itemName: "Đăng ký chỗ nghỉ", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Về chúng tôi",
    footerItems: [
      { itemName: "Giới thiệu", linkTo: "#" },
      { itemName: "Cách hoạt động", linkTo: "#" },
      { itemName: "Tin tức", linkTo: "#" },
      { itemName: "Tuyển dụng", linkTo: "#" },
    ],
  },
];

const formatCurrency = (value: number) => new Intl.NumberFormat("vi-VN").format(value);

const getRatingText = (rating: number) => {
  if (rating >= 4.5) return "Xuất sắc";
  if (rating >= 4) return "Tuyệt hảo";
  if (rating >= 3.5) return "Rất tốt";
  if (rating >= 3) return "Tốt";
  return "Ổn";
};

export default function Place({ params }: Props) {
  const { id } = React.use(params);
  const [tours, setTours] = useState<Tour[]>([]);
  const [posts, setPosts] = useState<PlacePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);

  const placeInfo = useMemo(() => tours[0]?.place ?? null, [tours]);

  const placeTitle = useMemo(() => {
    const name = placeInfo?.name;
    if (name) return name;
    return decodeURIComponent(id)
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }, [id, placeInfo?.name]);

  useEffect(() => {
    let isMounted = true;

    const fetchTours = async () => {
      try {
        const [tourData, postData] = await Promise.all([
          getToursByPlaceSlug(id),
          getPostsByPlaceSlug(id, 6)
        ]);
        if (isMounted) {
          setTours(Array.isArray(tourData) ? tourData : []);
          setPosts(Array.isArray(postData) ? postData : []);
          setError(null);
          setPostError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Không tải được danh sách tour. Vui lòng thử lại sau.");
          setPostError("Không tải được bài viết về điểm đến này.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTours();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-amber-50">
      <Navbar webName={navProps.webName} subtitle={navProps.subtitle} itemOnNav={navProps.itemOnNav} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[240px]">
              {placeInfo?.image_url ? (
                <img
                  src={placeInfo.image_url}
                  alt={placeTitle}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-amber-100 text-sm font-semibold text-slate-500">
                  TravelBuddy
                </div>
              )}
            </div>
            <div className="space-y-4 p-6 lg:p-8">
              <div className="text-sm text-slate-500">Điểm đến</div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{placeTitle}</h1>
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                {placeInfo?.description ??
                  "Khám phá những hành trình được yêu thích nhất tại điểm đến này, từ tour ngắn ngày đến trải nghiệm cao cấp."}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">{tours.length} tour</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Đã chọn lọc theo điểm đến</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            title={`Tour tại ${placeTitle}`}
            description="Danh sách đầy đủ các tour hiện có cho điểm đến này."
          />

          {isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Đang tải dữ liệu tour...
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
              {error}
            </div>
          )}

          {!isLoading && !error && tours.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Chưa có tour nào cho điểm đến này.
            </div>
          )}

          {!isLoading && !error && tours.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => {
                const reviewsCount = tour.ratings?.length ?? tour.booking_count ?? 0;
                return (
                  <ItemCard
                    key={tour.tour_id}
                    tour_id={tour.tour_id}
                    imgUrl={
                      tour.image_url ??
                      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800"
                    }
                    title={tour.name}
                    type={tour.category?.name ?? "Tour"}
                    location={tour.place?.name ?? placeTitle}
                    rating={tour.average_rating ?? 0}
                    reviewsCount={reviewsCount}
                    ratingText={getRatingText(tour.average_rating ?? 0)}
                    distance={`${tour.days} ngày ${tour.nights} đêm`}
                    originalPrice={formatCurrency(tour.base_price)}
                    discountPrice={formatCurrency(tour.base_price)}
                    currency="VND"
                    isGenius={false}
                  />
                );
              })}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <SectionHeading
            title={`Bài viết về ${placeTitle}`}
            description="Cập nhật trải nghiệm và chia sẻ mới nhất từ cộng đồng."
          />

          {isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Đang tải bài viết...
            </div>
          )}

          {!isLoading && postError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
              {postError}
            </div>
          )}

          {!isLoading && !postError && posts.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Chưa có bài viết nào về điểm đến này.
            </div>
          )}

          {!isLoading && !postError && posts.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.post_id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                      {post.author?.avatar_url ? (
                        <img
                          src={post.author.avatar_url}
                          alt={post.author.full_name ?? "User"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400">
                          TB
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {post.author?.full_name ?? post.author?.username ?? "Ẩn danh"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {post.createdAt || post.created_at || "Vừa đăng"}
                      </p>
                    </div>
                  </div>

                  {post.image_url && (
                    <div className="mt-4 overflow-hidden rounded-xl">
                      <img
                        src={post.image_url}
                        alt={post.content}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}

                  <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-4">
                    {post.content}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer props={dataFooter} />
    </main>
  );
}
