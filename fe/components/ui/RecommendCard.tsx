"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RecommendCardProps = {
  imgUrl: string;
  altText: string;
  topicTitle: string;
  subtitle?: string;
  priceTag?: string;
  destination?: string;
};

export function RecommendCard({
  imgUrl,
  altText,
  topicTitle,
  destination,
}: RecommendCardProps) {
  return (
    <Link href={`/place/${destination}`}>
      <article className="group relative h-72 w-full overflow-hidden rounded-2xl cursor-pointer">
        <Image
          src={imgUrl}
          alt={altText}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all group-hover:from-black/80" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="text-xl font-bold leading-tight mb-1">
            {topicTitle}
          </h3>
          <div className="flex items-center gap-1 text-sm text-white/70 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span>Khám phá</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </article>
    </Link>
  );
}