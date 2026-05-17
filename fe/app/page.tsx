import { ItemCard } from "@/components/ui/ItemCard";
import { RecommendCard } from "@/components/ui/RecommendCard";
import { SectionHeading } from "@/components/section/SectionHeading";
import { HeroSection } from "@/components/section/HeroSection";
import { WhyChooseUs } from "@/components/section/WhyChooseUs";
import { Newsletter } from "@/components/section/Newsletter";
import { CategoryGrid } from "@/components/section/CategoryGrid";
import { Navbar } from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import TravelSearch from "@/components/ui/TravelSearch";


const experiences = [
  {
    tour_id : "bfbb3ce9-847a-4dc8-ac38-f18362396f9d",
    imgUrl: "https://oldquartertravel.com/wp-content/uploads/2018/08/sapa-trekking-3d2n.jpg",
    title: "Sapa Trekking Homestay - View thung lũng Mường Hoa",
    type: "Homestay",
    location: "Sa Pa, Lào Cai, Việt Nam",
    rating: 9.2,
    reviewsCount: 156,
    ratingText: "Tuyệt vời",
    distance: "2.5 km từ trung tâm",
    originalPrice: "850.000",
    discountPrice: "520.000",
    currency: "VND",
    isGenius: true,
  },
  {
    tour_id : "bfbb3ce9-847a-4dc8-ac38-f18362396f9d",
    imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
    title: "Phu Quoc Luxury Emerald Bay Resort & Spa",
    type: "Resort",
    location: "An Thới, Phú Quốc, Việt Nam",
    rating: 9.8,
    reviewsCount: 420,
    ratingText: "Ngoại hạng",
    distance: "giáp biển",
    originalPrice: "4.200.000",
    discountPrice: "2.850.000",
    currency: "VND",
    isGenius: true,
  },
  {
    tour_id : "bfbb3ce9-847a-4dc8-ac38-f18362396f9d",
    imgUrl: "https://cdn.justfly.vn/1500x1000/media/73/11/f365-0a52-4b0a-b249-fb2cd8a1dc62.jpg",
    title: "Hanoi Old Quarter Boutique Hotel - Gần Hồ Gươm",
    type: "Khách sạn",
    location: "Hoàn Kiếm, Hà Nội, Việt Nam",
    rating: 8.9,
    reviewsCount: 89,
    ratingText: "Rất tốt",
    distance: "0.2 km từ trung tâm",
    originalPrice: "1.500.000",
    discountPrice: "950.000",
    currency: "VND",
    isGenius: false,
  },
  {
    tour_id : "bfbb3ce9-847a-4dc8-ac38-f18362396f9d",
    imgUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800",
    title: "Dalat Pine Villa - Biệt thự gỗ giữa rừng thông",
    type: "Villa",
    location: "Phường 10, Đà Lạt, Việt Nam",
    rating: 9.4,
    reviewsCount: 215,
    ratingText: "Tuyệt hảo",
    distance: "3.2 km từ trung tâm",
    originalPrice: "2.100.000",
    discountPrice: "1.450.000",
    currency: "VND",
    isGenius: true,
  },
  {
    tour_id : "bfbb3ce9-847a-4dc8-ac38-f18362396f9d",
    imgUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800",
    title: "Hoi An Riverside Heritage - Phố cổ lung linh",
    type: "Boutique Hotel",
    location: "Minh An, Hội An, Việt Nam",
    rating: 9.6,
    reviewsCount: 310,
    ratingText: "Xuất sắc",
    distance: "0.5 km từ trung tâm",
    originalPrice: "1.800.000",
    discountPrice: "1.200.000",
    currency: "VND",
    isGenius: true,
  },
  {
    tour_id : "bfbb3ce9-847a-4dc8-ac38-f18362396f9d",
    imgUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
    title: "Vung Tau Sea View Apartment - Căn hộ hướng biển",
    type: "Căn hộ",
    location: "Bãi Sau, Vũng Tàu, Việt Nam",
    rating: 8.5,
    reviewsCount: 67,
    ratingText: "Tốt",
    distance: "0.1 km từ bãi biển",
    originalPrice: "1.250.000",
    discountPrice: "890.000",
    currency: "VND",
    isGenius: false,
  },
];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((item, index) => (
              <ItemCard key={index} {...item} />
            ))}
          </div>
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
