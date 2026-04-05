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
}: RecommendCardProps) {
  return (
    <article className="group relative h-64 w-full overflow-hidden rounded-2xl cursor-pointer">
      <Image
        src={imgUrl}
        alt={altText}
        className="object-cover transition duration-500 group-hover:scale-105 cursor-pointer"
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 text-white">
        <h3 className="text-2xl font-semibold leading-tight">{topicTitle}</h3>
      </div>
    </article>
  );
}