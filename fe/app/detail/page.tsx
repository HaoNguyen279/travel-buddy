import { ItemCard } from "@/components/ui/ItemCard";
import { RecommendCard } from "@/components/ui/RecommendCard";
import { HeroSection } from "@/components/section/HeroSection";
import { SectionHeading } from "@/components/section/SectionHeading";
import { useParams } from "next/navigation";


export default function Place() {
  const searchText = useParams();
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-amber-50 py-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">

        <section className="space-y-5">
          <SectionHeading
            title="Trải nghiệm nổi bật"
            description="Các hành trình ngắn ngày được cộng đồng lưu nhiều nhất tuần này."
          />
        </section>

        <section className="space-y-5 pb-4">
          <SectionHeading
            title="Điểm đến bạn có thể thích"
            description="Gợi ý dựa trên xu hướng tìm kiếm mới nhất và điểm đánh giá từ cộng đồng Travel Buddy."
          />
        </section>
      </div>
    </main>
  );
}
