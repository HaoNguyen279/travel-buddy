"use client";

import Image from "next/image";
import { Heart, Star, ThumbsUp, MapPin } from "lucide-react";

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
  title = "SAIGON HOMEY - SOHO RESIDENCE - Official Comfort i...",
  type = "Guesthouse",
  location = "Ho Chi Minh City, Vietnam",
  rating = 9.5,
  reviewsCount = 214,
  ratingText = "Exceptional",
  distance = "1 km from center",
  originalPrice = "19",
  discountPrice = "12",
  currency = "OMR",
  isGenius = true,
}: Partial<AccommodationCardProps>) {
  return (
    <article className="group w-full max-w-[320px] overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md rounded-xl">
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imgUrl}
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
        />
        <button 
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header: Type & Stars */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
          <span>{type}</span>
          <div className="flex text-amber-400 ml-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <div className="ml-1 flex h-4 w-4 items-center justify-center rounded-sm bg-amber-500 text-[10px] text-white">
            <ThumbsUp size={10} strokeWidth={3} />
          </div>
          {isGenius && (
            <div className="ml-2 flex items-center rounded-sm bg-[#003580] px-1.5 py-0.5 text-[11px] font-bold text-white">
              Genius
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-base font-bold leading-tight text-gray-900 mb-2 h-10">
          {title}
        </h3>

        {/* Location & Distance */}
        <div className="flex flex-col gap-1 text-sm text-gray-600 mb-3">
          <p className="hover:text-blue-600 cursor-pointer transition-colors leading-tight">
            {location}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} />
            <span>{distance}</span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#003580] font-bold text-white text-sm">
            {rating}
          </div>
          <div className="flex flex-col text-xs leading-tight">
            <span className="font-bold text-gray-900">{ratingText}</span>
            <span className="text-gray-500">{reviewsCount} reviews</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col items-end border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">Starting from</p>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-red-600 line-through decoration-red-600/50">
              {currency} {originalPrice}
            </span>
            <span className="text-xl font-bold text-gray-900">
              {currency} {discountPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}