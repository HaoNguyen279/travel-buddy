import { Compass, Shield, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Hành trình đa dạng",
    description: "Hơn 250+ điểm đến trong nước và quốc tế, phù hợp mọi phong cách du lịch.",
  },
  {
    icon: Shield,
    title: "Đặt phòng an toàn",
    description: "Thanh toán bảo mật, cam kết hoàn tiền nếu có sự cố không mong muốn.",
  },
  {
    icon: Clock,
    title: "Lên lịch linh hoạt",
    description: "Tự do lên kế hoạch và thay đổi lịch trình bất cứ lúc nào bạn muốn.",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-2">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
          Tại sao chọn TravelBuddy?
        </h2>
        <p className="mt-2 text-sm text-gray-500 sm:text-base max-w-xl mx-auto">
          Chúng tôi mang đến trải nghiệm du lịch trọn vẹn và đáng nhớ nhất cho bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group text-center p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300"
          >
            <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <feature.icon size={22} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
