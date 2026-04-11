import { ItemCard } from "@/components/ui/ItemCard";
import { RecommendCard } from "@/components/ui/RecommendCard";
import { SectionHeading } from "@/components/section/SectionHeading";
import { Navbar } from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";




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
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    altText: "Đà Lạt rừng thông",
    topicTitle: "Đà Lạt",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    altText: "Hội An về đêm",
    topicTitle: "Hội An",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    altText: "Nha Trang biển xanh",
    topicTitle: "Nha Trang"
  },
];
const navProps = {
  webName : "TravellBuddy",
  subtitle : "alo",
  itemOnNav : [
    {
      itemName: "Register",
      linkTo : "/auth"
    },
    {
      itemName: "Place",
      linkTo : "/place"
    },
    {
      itemName: "Aniaga",
      linkTo : "/"
    },
  ]
}
const dataFooter = [
  {
    "footerTitle": "Support",
    "footerItems": [
      { "itemName": "Manage your trips", "linkTo": "#" },
      { "itemName": "Contact Customer Service", "linkTo": "#" },
      { "itemName": "Safety Resource Center", "linkTo": "#" }
    ]
  },
  {
    "footerTitle": "Discover",
    "footerItems": [
      { "itemName": "Genius loyalty program", "linkTo": "#" },
      { "itemName": "Seasonal and holiday deals", "linkTo": "#" },
      { "itemName": "Travel articles", "linkTo": "#" },
      { "itemName": "Booking.com for Business", "linkTo": "#" },
      { "itemName": "Traveller Review Awards", "linkTo": "#" },
      { "itemName": "Car rental", "linkTo": "#" },
      { "itemName": "Flight finder", "linkTo": "#" },
      { "itemName": "Restaurant reservations", "linkTo": "#" },
      { "itemName": "Booking.com for Travel Agents", "linkTo": "#" }
    ]
  },
  {
    "footerTitle": "Terms and settings",
    "footerItems": [
      { "itemName": "Privacy Notice", "linkTo": "#" },
      { "itemName": "Terms of Service", "linkTo": "#" },
      { "itemName": "Accessibility Statement", "linkTo": "#" },
      { "itemName": "Partner dispute", "linkTo": "#" },
      { "itemName": "Modern Slavery Statement", "linkTo": "#" },
      { "itemName": "Human Rights Statement", "linkTo": "#" }
    ]
  },
  {
    "footerTitle": "Partners",
    "footerItems": [
      { "itemName": "Extranet login", "linkTo": "#" },
      { "itemName": "Partner help", "linkTo": "#" },
      { "itemName": "List your property", "linkTo": "#" },
      { "itemName": "Become an affiliate", "linkTo": "#" }
    ]
  },
  {
    "footerTitle": "About",
    "footerItems": [
      { "itemName": "About Booking.com", "linkTo": "#" },
      { "itemName": "How We Work", "linkTo": "#" },
      { "itemName": "Sustainability", "linkTo": "#" },
      { "itemName": "Press center", "linkTo": "#" },
      { "itemName": "Careers", "linkTo": "#" },
      { "itemName": "Investor relations", "linkTo": "#" },
      { "itemName": "Corporate contact", "linkTo": "#" },
      { "itemName": "Content guidelines and reporting", "linkTo": "#" }
    ]
  }
]
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-amber-50">
      <Navbar webName={navProps.webName} subtitle={navProps.subtitle} itemOnNav={navProps.itemOnNav} />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">

        

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
              />
            ))}
          </div>
        </section>
      </div>
      <Footer props={dataFooter} />
    </main>
  );
}
