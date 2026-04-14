import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

type HeroSectionProps = {
  title: string;
  subtitle: string;
  stats: Array<{ label: string; value: string }>;
};

export function HeroSection({ title, subtitle, stats }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-cyan-50 via-amber-50 to-emerald-100 p-8 md:p-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div className="space-y-5">
          <p className="inline-flex rounded-full border border-cyan-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Travel Buddy
          </p>
          <h1 className={`${playfair.className} text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl`}>
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Khám phá ngay
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Tạo lịch trình
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/70 bg-white/70 p-4 text-center shadow-sm backdrop-blur"
            >
              <p className="text-xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
