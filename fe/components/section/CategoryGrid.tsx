import Link from "next/link";
import { Building2, TreePalm, Mountain, Waves, Landmark, Tent } from "lucide-react";

const categories = [
  { icon: Building2, label: "Khách sạn", href: "/tour?type=hotel", count: "1,200+" },
  { icon: TreePalm, label: "Resort", href: "/tour?type=resort", count: "340+" },
  { icon: Mountain, label: "Homestay", href: "/tour?type=homestay", count: "890+" },
  { icon: Waves, label: "Biển đảo", href: "/tour?type=beach", count: "156+" },
  { icon: Landmark, label: "Di tích", href: "/tour?type=heritage", count: "210+" },
  { icon: Tent, label: "Cắm trại", href: "/tour?type=camping", count: "95+" },
];

export function CategoryGrid() {
  return (
    <section className="py-2">
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
          Duyệt theo danh mục
        </h2>
        <p className="text-sm text-gray-500 sm:text-base max-w-2xl">
          Tìm kiếm theo loại hình lưu trú và trải nghiệm yêu thích.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <cat.icon
                size={22}
                className="text-gray-500 group-hover:text-blue-600 transition-colors"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {cat.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{cat.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
