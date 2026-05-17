"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/nav/Navbar";
import api from "@/services/api";
import { useAuth } from "@/app/context/AuthContext";

type Props = {
  params: Promise<{ id: string }>;
};

type TourRating = {
  rating_id: string;
  score: number;
  review?: string | null;
  created_at?: string | null;
  reviewer?: {
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
};

type TourPost = {
  post_id?: string;
  title?: string | null;
  content?: string | null;
  created_at?: string | null;
  author?: {
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
  comments?: Array<unknown>;
};

type RelatedTour = {
  tour_id: string;
  name: string;
  base_price: number;
  image_url?: string | null;
  average_rating: number;
  ratings?: Array<{ score: number }>;
  place?: {
    name?: string | null;
  } | null;
  category?: {
    name?: string | null;
  } | null;
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
  ratings?: Array<TourRating>;
  place?: {
    name?: string | null;
    posts?: Array<TourPost>;
    favorites?: Array<unknown>;
    tours?: Array<RelatedTour>;
  } | null;
  category?: {
    name?: string | null;
    tours?: Array<RelatedTour>;
  } | null;
};

const navProps = {
  webName: "TravelBuddy",
  subtitle: "Đặt chỗ, khám phá và lên kế hoạch cho chuyến đi của bạn",
  itemOnNav: [
    {
      itemName: "Post",
      linkTo: "/post",
    },
    {
      itemName: "Place",
      linkTo: "/place/da-nang",
    },
    {
      itemName: "Chat",
      linkTo: "/chat",
    },
  ],
};

const dataFooter = [
  {
    footerTitle: "Support",
    footerItems: [
      { itemName: "Manage your trips", linkTo: "#" },
      { itemName: "Contact Customer Service", linkTo: "#" },
      { itemName: "Safety Resource Center", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Discover",
    footerItems: [
      { itemName: "Seasonal and holiday deals", linkTo: "#" },
      { itemName: "Travel articles", linkTo: "#" },
      { itemName: "Booking.com for Business", linkTo: "#" },
      { itemName: "Traveller Review Awards", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Terms and settings",
    footerItems: [
      { itemName: "Privacy Notice", linkTo: "#" },
      { itemName: "Terms of Service", linkTo: "#" },
      { itemName: "Accessibility Statement", linkTo: "#" },
      { itemName: "Content guidelines and reporting", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Partners",
    footerItems: [
      { itemName: "Extranet login", linkTo: "#" },
      { itemName: "List your property", linkTo: "#" },
      { itemName: "Become an affiliate", linkTo: "#" },
    ],
  },
  {
    footerTitle: "About",
    footerItems: [
      { itemName: "About TravelBuddy", linkTo: "#" },
      { itemName: "How We Work", linkTo: "#" },
      { itemName: "Sustainability", linkTo: "#" },
      { itemName: "Careers", linkTo: "#" },
    ],
  },
];


export default function TourDetailPage({ params }: Props) {
  const { id } = React.use(params);
  const { user } = useAuth();
  const prettyTitle = decodeURIComponent(id)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState("2026-05-20");
  const [packageType, setPackageType] = useState<"standard" | "premium">("standard");
  const [note, setNote] = useState("");
  const [tourData, setTourData] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingReview, setRatingReview] = useState("");
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [ratingError, setRatingError] = useState<string | null>(null);
  const [ratingSuccess, setRatingSuccess] = useState<string | null>(null);

  const formatCurrency = (value: number) => new Intl.NumberFormat("vi-VN").format(value);
  const formatDate = (value?: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("vi-VN");
  };

  const getTourData = async () => {
    try {
      const res = await api.get(`/tour/${id}`);
      setTourData(res.data);
    }catch (error) {
      console.error("Failed to fetch tour data:", error);
      setError("Không thể tải thông tin tour. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };
  const price = useMemo(() => {
    const basePrice = tourData?.base_price ?? 2790000;
    const adultPrice = packageType === "premium" ? basePrice * 1.15 : basePrice;
    const childPrice = packageType === "premium" ? basePrice * 0.7 : basePrice * 0.6;
    const serviceFee = 120000;

    const subtotal = adults * adultPrice + children * childPrice;
    const total = subtotal + serviceFee;

    return {
      adultPrice,
      childPrice,
      serviceFee,
      subtotal,
      total,
    };
  }, [adults, children, packageType, tourData?.base_price]);

  useEffect(() => {
    getTourData();
  }, [id]);

  const handleSubmitRating = async () => {
    if (!user) {
      setRatingError("Bạn cần đăng nhập để đánh giá tour.");
      setRatingSuccess(null);
      return;
    }

    const tourId = tourData?.tour_id ?? id;
    if (!tourId) return;

    setRatingSubmitting(true);
    setRatingError(null);
    setRatingSuccess(null);

    try {
      const payload = {
        score: ratingScore,
        review: ratingReview.trim(),
      };
      const res = await api.post(`/tour/${tourId}/rating`, payload);
      const result = res.data;

      setTourData((prev) => {
        if (!prev) return prev;
        const newRating = result?.rating;
        const nextRatings = newRating
          ? [
              newRating,
              ...(prev.ratings ?? []).filter((item) => item.rating_id !== newRating.rating_id),
            ]
          : prev.ratings;

        return {
          ...prev,
          ratings: nextRatings,
          average_rating: result?.average_rating ?? prev.average_rating,
        };
      });

      setRatingReview("");
      setRatingSuccess("Cảm ơn bạn đã đánh giá tour!");
    } catch (err) {
      console.error("Failed to submit rating:", err);
      setRatingError("Gửi đánh giá thất bại. Vui lòng thử lại.");
    } finally {
      setRatingSubmitting(false);
    }
  };

  const ratingValue = tourData?.average_rating ?? 9.4;
  const reviewsCount = tourData?.ratings?.length ?? tourData?.booking_count ?? 215;
  const place = tourData?.place;
  const category = tourData?.category;
  const placeTours = place?.tours?.filter((tour) => tour.tour_id !== tourData?.tour_id) ?? [];
  const categoryTours = category?.tours?.filter((tour) => tour.tour_id !== tourData?.tour_id) ?? [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar webName={navProps.webName} subtitle={navProps.subtitle} itemOnNav={navProps.itemOnNav} />

      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="mb-5 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">
            Trang chủ
          </Link>
          <span className="px-2">/</span>
          <span className="text-slate-700">Tour chi tiết</span>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {isLoading && (
            <div className="p-6 text-sm text-slate-500">Đang tải thông tin tour...</div>
          )}
          {!isLoading && error && (
            <div className="p-6 text-sm text-red-600">{error}</div>
          )}
          {!isLoading && !error && (
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <img
                  src={
                    tourData?.image_url ??
                    "https://oldquartertravel.com/wp-content/uploads/2018/08/sapa-trekking-3d2n.jpg"
                  }
                  alt="Tour cover"
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>
              <div className="space-y-5 p-6 lg:p-8">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Tour {tourData?.days ?? 3} ngày {tourData?.nights ?? 2} đêm
                </span>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  {tourData?.name || "Sapa Trekking Homestay"}
                </h1>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  {tourData?.description ??
                    "Tour chi tiết dành cho nhóm nhỏ và cặp đôi, kết hợp trekking nhẹ, lưu trú homestay và trải nghiệm văn hóa bản địa."}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <article className="rounded-2xl border border-slate-200 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Đánh giá</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {ratingValue.toFixed(1)}/10 ({reviewsCount} đánh giá)
                    </p>
                  </article>
                  <article className="rounded-2xl border border-slate-200 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Điểm đến</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {tourData?.place?.name ?? "Sa Pa, Lao Cai"}
                    </p>
                  </article>
                  <article className="rounded-2xl border border-slate-200 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Danh mục</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {tourData?.category?.name ?? "Tour"}
                    </p>
                  </article>
                  <article className="rounded-2xl border border-slate-200 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Giá cơ bản</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {formatCurrency(tourData?.base_price ?? 0)} VND
                    </p>
                  </article>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-slate-900">Tổng quan tour</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {tourData?.description ??
                  "Lịch trình tối ưu cho 3 ngày 2 đêm, vừa đủ thời gian để khám phá cảnh đẹp Sa Pa, vừa đảm bảo nghỉ ngơi hợp lý. Tour phù hợp cho người lần đầu đến Tây Bắc và mong muốn đi theo nhóm nhỏ có hướng dẫn viên."}
              </p>
            </section>

            {!isLoading && !error && place && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Thông tin điểm đến</h2>
                  <p className="text-sm text-slate-500">
                    {place.posts?.length ?? 0} bài viết · {place.favorites?.length ?? 0} lượt yêu thích
                  </p>
                </div>

                {place.posts && place.posts.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {place.posts.slice(0, 4).map((post, index) => (
                      <article key={post.post_id ?? index} className="rounded-2xl border border-slate-200 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">Bài viết nổi bật</p>
                        <h3 className="mt-2 text-base font-semibold text-slate-900">
                          {post.title ?? "Chia sẻ hành trình"}
                        </h3>
                        {post.content && (
                          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.content}</p>
                        )}
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                          <span>{post.author?.full_name ?? "TravelBuddy"}</span>
                          <span>
                            {formatDate(post.created_at)} · {post.comments?.length ?? 0} bình luận
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}

            {!isLoading && !error && placeTours.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-xl font-semibold text-slate-900">Tour khác tại {place?.name}</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {placeTours.slice(0, 4).map((tour) => (
                    <article key={tour.tour_id} className="overflow-hidden rounded-2xl border border-slate-200">
                      <img
                        src={
                          tour.image_url ??
                          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200"
                        }
                        alt={tour.name}
                        className="h-40 w-full object-cover"
                      />
                      <div className="space-y-2 p-4">
                        <h3 className="text-base font-semibold text-slate-900">{tour.name}</h3>
                        <p className="text-sm text-slate-500">
                          {tour.category?.name ?? "Tour"} · {tour.place?.name ?? ""}
                        </p>
                        <p className="text-sm text-emerald-700">
                          ★ {tour.average_rating.toFixed(1)} ({tour.ratings?.length ?? 0} đánh giá)
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                          {formatCurrency(tour.base_price)} VND
                        </p>
                        <Link
                          href={`/tour/${tour.tour_id}`}
                          className="inline-flex rounded-full bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          Xem tour
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {!isLoading && !error && categoryTours.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-xl font-semibold text-slate-900">Tour cùng danh mục</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {categoryTours.slice(0, 4).map((tour) => (
                    <article key={tour.tour_id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{tour.name}</h3>
                          <p className="text-sm text-slate-500">{tour.place?.name ?? ""}</p>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatCurrency(tour.base_price)} VND
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                        <span>★ {tour.average_rating.toFixed(1)}</span>
                        <span>{tour.ratings?.length ?? 0} đánh giá</span>
                      </div>
                      <Link
                        href={`/tour/${tour.tour_id}`}
                        className="mt-3 inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Xem tour
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {!isLoading && !error && tourData?.ratings && tourData.ratings.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Đánh giá gần đây</h2>
                  <p className="text-sm text-slate-500">{tourData.ratings.length} đánh giá</p>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {tourData.ratings.slice(0, 6).map((rating) => (
                    <article key={rating.rating_id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">
                          {rating.reviewer?.full_name ?? "Khách du lịch"}
                        </p>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          {rating.score}/5
                        </span>
                      </div>
                      {rating.review && (
                        <p className="mt-2 text-sm text-slate-600">{rating.review}</p>
                      )}
                      {rating.created_at && (
                        <p className="mt-3 text-xs text-slate-500">{formatDate(rating.created_at)}</p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {!isLoading && !error && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Đánh giá tour</h2>
                  <p className="text-sm text-slate-500">
                    {user ? "Chia sẻ trải nghiệm của bạn" : "Đăng nhập để gửi đánh giá"}
                  </p>
                </div>

                <div className="mt-4 grid gap-4">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-slate-700">Điểm đánh giá</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setRatingScore(score)}
                          className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                            ratingScore === score
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {score} ★
                        </button>
                      ))}
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-slate-700">Nhận xét</span>
                    <textarea
                      value={ratingReview}
                      onChange={(event) => setRatingReview(event.target.value)}
                      placeholder="Bạn thích điều gì nhất trong tour này?"
                      className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </label>

                  {ratingError && <p className="text-sm text-red-600">{ratingError}</p>}
                  {ratingSuccess && <p className="text-sm text-emerald-700">{ratingSuccess}</p>}

                  <button
                    type="button"
                    disabled={ratingSubmitting || !user}
                    onClick={handleSubmitRating}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {ratingSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                  </button>
                </div>
              </section>
            )}


            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-slate-900">Chính sách tour</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>- Hủy trước 7 ngày: hoàn 100% giá trị đơn.</p>
                <p>- Hủy trước 3-6 ngày: hoàn 50% giá trị đơn.</p>
                <p>- Hủy trong 48h trước khởi hành: không hoàn phí.</p>
                <p>- Trẻ em dưới 5 tuổi: miễn phí (ngủ chung với bố mẹ).</p>
              </div>
            </section>

          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold text-slate-900">Đặt tour</h2>
            <p className="mt-1 text-sm text-slate-500">Xác nhận nhanh trong 30 phút</p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Ngày khởi hành</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Gói tour</span>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value as "standard" | "premium")}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="standard">Standard - lịch trình cơ bản</option>
                  <option value="premium">Premium - thêm bữa tối đặc sản + xe riêng</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Người lớn</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-900">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.min(10, prev + 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Trẻ em</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-900">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.min(6, prev + 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Yêu cầu thêm</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: ăn chay, ghế em bé, phòng riêng..."
                  className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>{adults} người lớn</span>
                <span>{price.adultPrice.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-slate-600">
                <span>{children} trẻ em</span>
                <span>{price.childPrice.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-slate-600">
                <span>Phí dịch vụ</span>
                <span>{price.serviceFee.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="my-3 border-t border-slate-200" />
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Tổng tạm tính</span>
                <span>{price.total.toLocaleString("vi-VN")} VND</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Đặt tour ngay
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">Không trừ tiền ngay. Bạn có thể hủy miễn phí theo chính sách.</p>
          </aside>
        </div>
      </div>

      <Footer props={dataFooter} />
    </main>
  );
}
