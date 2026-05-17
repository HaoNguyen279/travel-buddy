"use client";

import Image from "next/image";
import { Heart, Star, MapPin } from "lucide-react";

type AccommodationCardProps = {
  imgUrl: string;
  title: string;
  type: string;
  location: string;
  rating: number;
  reviewsCount: number;
  ratingText: string;
  distance: string;
  originalPrice: string;
  discountPrice: string;
  currency: string;
  isGenius?: boolean;
};

export function ItemCard({
  imgUrl = "https://images.unsplash.com/photo-1555854817-5b2260d15d4d?q=80&w=500",
  title = "SAIGON HOMEY - SOHO RESIDENCE",
  type = "Guesthouse",
  location = "Ho Chi Minh City, Vietnam",
  rating = 9.5,
  reviewsCount = 214,
  ratingText = "Exceptional",
  distance = "1 km from center",
  originalPrice = "19",
  discountPrice = "12",
  currency = "VND",
  isGenius = true,
}: Partial<AccommodationCardProps>) {
  return (
    <article className="group w-full overflow-hidden bg-white border border-gray-200/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-gray-300/80 hover:-translate-y-0.5">
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imgUrl}
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
        />
        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500 hover:scale-110 shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart size={16} />
        </button>
        {isGenius && (
          <div className="absolute left-3 top-3 flex items-center rounded-md bg-blue-600 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            Genius
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Type & Stars */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
          <span className="font-medium">{type}</span>
          <div className="flex text-amber-400">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 mb-2 min-h-[2.5rem]">
          {title}
        </h3>

        {/* Location & Distance */}
        <div className="flex flex-col gap-1 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-gray-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <span className="text-gray-400 pl-4">{distance}</span>
        </div>

        {/* Rating Section */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
            {rating}
          </div>
          <div className="flex flex-col text-xs leading-tight">
            <span className="font-semibold text-gray-800">{ratingText}</span>
            <span className="text-gray-400">{reviewsCount} đánh giá</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-400">Giá/đêm</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-gray-400 line-through">
              {originalPrice} {currency}
            </span>
            <span className="text-lg font-bold text-gray-900">
              {discountPrice}
            </span>
            <span className="text-xs text-gray-500">{currency}</span>
          </div>
        </div>
      </div>
    </article>
  );
}