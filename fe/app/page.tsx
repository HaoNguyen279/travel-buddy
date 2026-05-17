"use client";

import { useEffect, useState } from "react";
import { ItemCard } from "@/components/ui/ItemCard";
import { RecommendCard } from "@/components/ui/RecommendCard";
import { SectionHeading } from "@/components/section/SectionHeading";
import { CategoryGrid } from "@/components/section/CategoryGrid";
import { Navbar } from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import TravelSearch from "@/components/ui/TravelSearch";
import { getTours } from "@/services/tourService";


type Tour = {
  tour_id: string;
  name: string;
  base_price: number;
  days: number;
  nights: number;
  booking_count: number;
  image_url?: string | null;
  average_rating: number;
  ratings?: Array<unknown>;
  place?: {
    name?: string | null;
  } | null;
  category?: {
    name?: string | null;
  } | null;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

const getRatingText = (rating: number) => {
  if (rating >= 9.5) return "Xuất sắc";
  if (rating >= 9) return "Tuyệt hảo";
  if (rating >= 8) return "Rất tốt";
  if (rating >= 7) return "Tốt";
  return "Ổn";
};

const destinations = [
  {
    imgUrl: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80",
    altText: "Đà Nẵng cầu Rồng",
    topicTitle: "Đà Nẵng",
    destination: "da-nang",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    altText: "Đà Lạt rừng thông",
    topicTitle: "Đà Lạt",
    destination: "da-lat",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    altText: "Hội An về đêm",
    topicTitle: "Hội An",
    destination: "hoi-an",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    altText: "Nha Trang biển xanh",
    topicTitle: "Nha Trang",
    destination: "nha-trang",
  },
];

const navProps = {
  webName: "TravelBuddy",
  subtitle: "",
  itemOnNav: [
    { itemName: "Bài viết", linkTo: "/post" },
    { itemName: "Địa điểm", linkTo: "/place/da-nang" },
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


export default function Home() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let isMounted = true;

    const fetchTours = async () => {
      try {
        const data = await getTours();
        if (isMounted) {
          setTours(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Không tải được danh sách tour. Vui lòng thử lại sau.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setVisibleCount(6);
        }
      }
    };

    fetchTours();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar
        webName={navProps.webName}
        subtitle={navProps.subtitle}
        itemOnNav={navProps.itemOnNav}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8 py-6">
        {/* <HeroSection
          title="Khám phá Việt Nam cùng Travel Buddy"
          subtitle="Lên kế hoạch, đặt phòng và chia sẻ hành trình du lịch của bạn với cộng đồng hơn 42,000 người dùng."
        /> */}

        {/* Search */}
        <section className="relative space-y-4">
          <SectionHeading
            title="Bạn muốn đi đâu?"
            description="Tìm kiếm điểm đến, tour du lịch hoặc chỗ nghỉ phù hợp."
          />
          <TravelSearch />
        </section>

        {/* Categories */}
        <CategoryGrid />

        {/* Featured Experiences */}
        <section className="space-y-6">
          <SectionHeading
            title="Trải nghiệm nổi bật"
            description="Các hành trình ngắn ngày được cộng đồng yêu thích nhất tuần này."
          />
          {isLoading && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
              Đang tải dữ liệu tour...
            </div>
          )}
          {!isLoading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
              {error}
            </div>
          )}
          {!isLoading && !error && tours.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
              Chưa có tour nào để hiển thị.
            </div>
          )}
          {!isLoading && !error && tours.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.slice(0, visibleCount).map((tour) => {
                const reviewsCount =
                  tour.ratings?.length ?? tour.booking_count ?? 0;

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
                    location={tour.place?.name ?? ""}
                    rating={tour.average_rating ?? 0}
                    reviewsCount={reviewsCount}
                    ratingText={getRatingText(tour.average_rating ?? 0)}
                    distance={`${tour.days} ngày ${tour.nights} đêm`}
                    originalPrice={formatCurrency(tour.base_price)}
                    discountPrice={formatCurrency(tour.base_price)}
                    currency="VND"
                  />
                );
              })}
            </div>
          )}
          {!isLoading && !error && tours.length > visibleCount && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Xem thêm
              </button>
            </div>
          )}
        </section>

        {/* Recommended Destinations */}
        <section className="space-y-6">
          <SectionHeading
            title="Điểm đến bạn có thể thích"
            description="Gợi ý dựa trên xu hướng tìm kiếm và đánh giá từ cộng đồng."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {destinations.map((item) => (
              <RecommendCard
                key={item.topicTitle}
                imgUrl={item.imgUrl}
                altText={item.altText}
                topicTitle={item.topicTitle}
                destination={item.destination}
              />
            ))}
          </div>
        </section>


        {/* <WhyChooseUs />


        <Newsletter /> */}
      </div>

      <Footer props={dataFooter} />
    </main>
  );
}
