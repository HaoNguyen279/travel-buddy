"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

const TravelSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Dữ liệu mẫu địa điểm hot
  const hotLocations = [
    { name: 'Tour du lịch Sapa', tours: 62, img: 'https://images.unsplash.com/photo-1509030464150-1b9a1e3b2b84?w=100&h=100&fit=crop' },
    { name: 'Tour Du Lịch Đà Lạt', tours: 56, img: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Singapore', tours: 37, img: 'https://images.unsplash.com/photo-1525625293386-3f8f903892dd?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Quảng Bình', tours: 22, img: 'https://images.unsplash.com/photo-1596390314281-7943f2187640?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Campuchia', tours: 24, img: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Miền Bắc', tours: 133, img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Hội An', tours: 55, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Miền Tây', tours: 73, img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Quy Nhơn', tours: 32, img: 'https://images.unsplash.com/photo-1621252179027-94459d278660?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Huế', tours: 49, img: 'https://images.unsplash.com/photo-1570160893078-43d943445851?w=100&h=100&fit=crop' },
    { name: 'Tour Du Lịch Thái Lan', tours: 46, img: 'https://images.unsplash.com/photo-1528181304800-2f1408198f29?w=100&h=100&fit=crop' },
    { name: 'Tour du lịch Phú Yên', tours: 26, img: 'https://images.unsplash.com/photo-1621252176915-08639209772c?w=100&h=100&fit=crop' },
  ];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event : any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-xl p-8 relative">
        
        {/* Tiêu đề */}
        <h2 className="text-[#002B93] text-2xl font-bold mb-2">
          Where you want to go?
        </h2>
        <p className="text-gray-800 font-semibold mb-4">
          Nhập địa điểm bạn muốn đến
        </p>

        {/* Input Container */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Quốc gia, thành phố, địa điểm du lịch"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-700 rounded-lg outline-none focus:border-blue-500 transition-colors"
                onFocus={() => setIsFocused(true)}
              />
            </div>
            
            <button className="bg-[#002B93] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors">
              Tìm kiếm
            </button>
          </div>

          {/* Dropdown Gợi ý */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-blue-500 justify-center font-bold text-sm">
                  <MapPin size={18} />
                  <span>ĐỊA ĐIỂM HOT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                {hotLocations.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all group"
                  >
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-xs text-gray-500 font-bold">
                        <span className="text-black">{item.tours}</span> tours
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelSearch;