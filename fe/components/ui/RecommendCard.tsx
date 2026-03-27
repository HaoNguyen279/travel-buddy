"use client";

import Image from "next/image";

type RecommendCardProps = {
  imgUrl: string;
  altText: string;
  topicTitle: string;
  subtitle?: string;
  priceTag?: string;
};

export function RecommendCard({
  imgUrl,
  altText,
  topicTitle,
  subtitle = "Điểm đến được yêu thích tuần này",
  priceTag,
}: RecommendCardProps) {
  return (
    <article className="group relative h-64 w-full overflow-hidden rounded-2xl">
      <Image
        src={imgUrl}
        alt={altText}
        className="object-cover transition duration-500 group-hover:scale-105"
        fill
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 text-white">
        <h3 className="text-2xl font-semibold leading-tight">{topicTitle}</h3>
        <p className="text-sm text-slate-100/90">{subtitle}</p>
        {priceTag ? (
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm">
            {priceTag}
          </span>
        ) : null}
      </div>
    </article>
  );
}