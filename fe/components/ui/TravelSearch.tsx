"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin } from "lucide-react";

const TravelSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const hotLocations = [
    { name: "Tour du lịch Sapa", tours: 62, img: "https://images.unsplash.com/photo-1509030464150-1b9a1e3b2b84?w=100&h=100&fit=crop" },
    { name: "Tour Du Lịch Đà Lạt", tours: 56, img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=100&h=100&fit=crop" },
    { name: "Tour du lịch Singapore", tours: 37, img: "https://images.unsplash.com/photo-1525625293386-3f8f903892dd?w=100&h=100&fit=crop" },
    { name: "Tour du lịch Quảng Bình", tours: 22, img: "https://images.unsplash.com/photo-1596390314281-7943f2187640?w=100&h=100&fit=crop" },
    { name: "Tour du lịch Campuchia", tours: 24, img: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=100&h=100&fit=crop" },
    { name: "Tour du lịch Miền Bắc", tours: 133, img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=100&h=100&fit=crop" },
    { name: "Tour du lịch Hội An", tours: 55, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop" },
    { name: "Tour du lịch Miền Tây", tours: 73, img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=100&h=100&fit=crop" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
          Tìm kiếm
        </button>
      </div>

      {/* Dropdown */}
      {isFocused && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in mx-4 sm:mx-6 lg:mx-8">
          <div className="px-5 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
              <MapPin size={14} />
              <span>Địa điểm phổ biến</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-3 gap-1">
            {hotLocations.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2.5 rounded-lg transition-colors"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.tours} tours
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelSearch;