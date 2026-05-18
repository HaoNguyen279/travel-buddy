"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchAll, SearchItem } from "@/services/searchService";
import { getToursLimit } from "@/services/tourService";

type TourSearchItem = Extract<SearchItem, { type: "tour" }>;

const TravelSearch = () => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [suggestedTours, setSuggestedTours] = useState<TourSearchItem[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestError, setSuggestError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const hotLocations: Array<{
    name: string;
    tours: number;
    img: string;
  }> = [];

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isActive = true;
    const handler = setTimeout(async () => {
      if (!normalizedQuery) {
        setResults([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await searchAll(normalizedQuery, 6);
        if (isActive) {
          setResults(Array.isArray(data.items) ? data.items : []);
        }
      } catch (err) {
        if (isActive) {
          setError("Không thể tìm kiếm lúc này.");
          setResults([]);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }, 350);

    return () => {
      isActive = false;
      clearTimeout(handler);
    };
  }, [normalizedQuery]);

  useEffect(() => {
    let isActive = true;

    const fetchSuggestions = async () => {
      if (!isFocused || normalizedQuery) return;

      setSuggestLoading(true);
      setSuggestError(null);

      try {
        const data = await getToursLimit(8);
        const items: TourSearchItem[] = Array.isArray(data)
          ? data.map((tour): TourSearchItem => ({
              type: "tour",
              tour_id: tour.tour_id,
              name: tour.name,
              image_url: tour.image_url,
              average_rating: tour.average_rating,
              base_price: tour.base_price,
              days: tour.days,
              nights: tour.nights,
              booking_count: tour.booking_count,
              ratings_count: tour.ratings?.length ?? tour.booking_count ?? 0,
              place: tour.place,
              category: tour.category,
            }))
          : [];

        if (isActive) {
          setSuggestedTours(items);
        }
      } catch (err) {
        if (isActive) {
          setSuggestError("Không thể tải gợi ý tour.");
          setSuggestedTours([]);
        }
      } finally {
        if (isActive) {
          setSuggestLoading(false);
        }
      }
    };

    fetchSuggestions();

    return () => {
      isActive = false;
    };
  }, [isFocused, normalizedQuery]);

  const handleSearchClick = () => {
    if (!normalizedQuery) {
      setIsFocused(true);
      return;
    }
    setIsFocused(true);
  };

  const handleResultClick = (item: SearchItem) => {
    if (item.type === "tour") {
      router.push(`/tour/${item.tour_id}`);
      return;
    }

    if (item.slug) {
      router.push(`/place/${item.slug}`);
      return;
    }

    if (item.place_id) {
      router.push(`/place/${item.place_id}`);
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {/* Search bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm điểm đến, tour du lịch..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
            onFocus={() => setIsFocused(true)}
          />
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Dropdown */}
      {isFocused && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in mx-4 sm:mx-6 lg:mx-8">
          {normalizedQuery ? (
            <div>
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                  <span className="font-semibold text-blue-600">Kết quả tìm kiếm</span>
                  <span className="text-gray-400">{normalizedQuery}</span>
                </div>
              </div>

              <div className="p-3 space-y-2">
                {isLoading && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500">
                    Đang tìm kiếm...
                  </div>
                )}
                {!isLoading && error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                    {error}
                  </div>
                )}
                {!isLoading && !error && results.length === 0 && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500">
                    Không tìm thấy kết quả phù hợp.
                  </div>
                )}

                {!isLoading && !error && results.length > 0 && (
                  <div className="grid grid-cols-1 gap-2">
                    {results.map((item) => (
                      <button
                        key={
                          item.type === "tour" ? item.tour_id : `place-${item.place_id}`
                        }
                        type="button"
                        onClick={() => handleResultClick(item)}
                        className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2 text-left transition hover:border-gray-200 hover:bg-gray-50"
                      >
                        <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                              TB
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-800 truncate">
                              {item.name}
                            </span>
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                              {item.type === "tour" ? "Tour" : "Place"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {item.type === "tour"
                              ? `${item.place?.name ?? ""} · ${item.category?.name ?? "Tour"}`
                              : "Xem các tour tại điểm đến"}
                          </div>
                        </div>
                        {item.type === "tour" ? (
                          <div className="text-right text-xs text-gray-500">
                            <div className="font-semibold text-gray-700">★ {item.average_rating ?? 0}</div>
                            <div>{item.ratings_count ?? 0} đánh giá</div>
                          </div>
                        ) : (
                          <div className="text-right text-xs text-gray-500">
                            <div className="font-semibold text-gray-700">★ {item.average_rating ?? 0}</div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
                  <MapPin size={14} />
                  <span>Tour gợi ý</span>
                </div>
              </div>

              <div className="p-3 space-y-2">
                {suggestLoading && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500">
                    Đang tải gợi ý tour...
                  </div>
                )}
                {!suggestLoading && suggestError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                    {suggestError}
                  </div>
                )}
                {!suggestLoading && !suggestError && suggestedTours.length === 0 && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500">
                    Chưa có gợi ý tour để hiển thị.
                  </div>
                )}
                {!suggestLoading && !suggestError && suggestedTours.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {suggestedTours.map((item) => (
                      <button
                        key={`tour-${item.tour_id}`}
                        type="button"
                        onClick={() => handleResultClick(item)}
                        className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2 text-left transition hover:border-gray-200 hover:bg-gray-50"
                      >
                        <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                              TB
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-800 truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {item.place?.name ?? "Tour"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelSearch;