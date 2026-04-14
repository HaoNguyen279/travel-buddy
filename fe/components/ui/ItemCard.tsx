"use client";

import Image from "next/image";

type ItemCardProps = {
  imgUrl: string;
  altText: string;
  badge?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
};

export function ItemCard({
  imgUrl,
  altText,
  badge = "Trải nghiệm",
  title = "Khám phá điểm đến mới",
  description = "Lưu lại những nơi bạn yêu thích, lên kế hoạch linh hoạt và chia sẻ hành trình với bạn bè.",
  actionLabel = "Xem chi tiết",
}: ItemCardProps) {
  return (
    <article className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
        <Image src={imgUrl} alt={altText} className="object-cover" fill />
      </div>

      <div className="space-y-3 p-5">
        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
          {badge}
        </span>

        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm leading-6 text-slate-600">{description}</p>

        <button
          type="button"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
        >
          {actionLabel}
        </button>
      </div>
    </article>
  );
}