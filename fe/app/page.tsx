import { ItemCard } from "@/components/ui/ItemCard";
import { RecommendCard } from "@/components/ui/RecommendCard";
import { HeroSection } from "@/components/section/HeroSection";
import { SectionHeading } from "@/components/section/SectionHeading";

const heroStats = [
  { label: "Điểm đến", value: "250+" },
  { label: "Lịch trình", value: "8.4K" },
  { label: "Người dùng", value: "42K" },
];

const experiences = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80",
    altText: "Đi bộ trên dãy núi",
    badge: "Outdoor",
    title: "Hiking Sapa 2 ngày",
    description:
      "Săn mây buổi sớm, trekking bản làng và thưởng thức ẩm thực địa phương trong hành trình ngắn ngày.",
    actionLabel: "Lưu lịch trình",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    altText: "Bãi biển xanh",
    badge: "Biển",
    title: "Resort biển Phú Quốc",
    description:
      "Kỳ nghỉ nhẹ nhàng với combo resort, lặn ngắm san hô và lịch trình tối ưu ngân sách cho nhóm bạn.",
    actionLabel: "Xem gói",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    altText: "Khu phố cổ về đêm",
    badge: "City",
    title: "City break Hà Nội",
    description:
      "Checklist quán ngon, điểm sống ảo và lộ trình di chuyển thông minh cho chuyến đi cuối tuần.",
    actionLabel: "Xem đề xuất",
  },
];

const destinations = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80",
    altText: "Đà Nẵng cầu Rồng",
    topicTitle: "Đà Nẵng",
    subtitle: "Vé máy bay khứ hồi từ 1.590.000đ",
    priceTag: "3N2Đ từ 2.9 triệu",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    altText: "Đà Lạt rừng thông",
    topicTitle: "Đà Lạt",
    subtitle: "Thời tiết 18°C, cực hợp du lịch cuối tuần",
    priceTag: "2N1Đ từ 1.8 triệu",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    altText: "Hội An về đêm",
    topicTitle: "Hội An",
    subtitle: "Phố cổ, cafe sân thượng và homestay sát sông",
    priceTag: "3N2Đ từ 2.5 triệu",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    altText: "Nha Trang biển xanh",
    topicTitle: "Nha Trang",
    subtitle: "Combo biển đảo và tour lặn ngắm san hô",
    priceTag: "3N2Đ từ 2.7 triệu",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-amber-50 py-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <HeroSection
          title="Lên kế hoạch chuyến đi nhanh hơn, đẹp hơn và vui hơn"
          subtitle="Travel Buddy giúp bạn tìm điểm đến phù hợp, gom lịch trình vào một nơi, và gợi ý các trải nghiệm thực sự đáng thử theo ngân sách của bạn."
          stats={heroStats}
        />

        <section className="space-y-5">
          <SectionHeading
            title="Trải nghiệm nổi bật"
            description="Các hành trình ngắn ngày được cộng đồng lưu nhiều nhất tuần này."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((item) => (
              <ItemCard
                key={item.title}
                imgUrl={item.imgUrl}
                altText={item.altText}
                badge={item.badge}
                title={item.title}
                description={item.description}
                actionLabel={item.actionLabel}
              />
            ))}
          </div>
        </section>

        <section className="space-y-5 pb-4">
          <SectionHeading
            title="Điểm đến bạn có thể thích"
            description="Gợi ý dựa trên xu hướng tìm kiếm mới nhất và điểm đánh giá từ cộng đồng Travel Buddy."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {destinations.map((item) => (
              <RecommendCard
                key={item.topicTitle}
                imgUrl={item.imgUrl}
                altText={item.altText}
                topicTitle={item.topicTitle}
                subtitle={item.subtitle}
                priceTag={item.priceTag}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
