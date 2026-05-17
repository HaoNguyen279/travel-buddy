import Image from "next/image";
import { MapPin, Calendar, Users, Search } from "lucide-react";

type HeroSectionProps = {
  title: string;
  subtitle: string;
};

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gray-900">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80"
          alt="Travel destination"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40" />
      </div>

      {/* Content */}
      <div className="relative px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 border border-white/20">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-white/90 tracking-wide">
              Khám phá Việt Nam
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100 active:scale-[0.98] shadow-lg"
            >
              Khám phá ngay
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              Tạo lịch trình
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
          {/* {stats.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-medium text-white/60 uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
}
