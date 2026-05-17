"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gray-900 px-6 py-14 sm:px-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left max-w-md">
          <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Nhận ưu đãi độc quyền
          </h2>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Đăng ký nhận bản tin để không bỏ lỡ các deal du lịch hấp dẫn và cập
            nhật mới nhất từ TravelBuddy.
          </p>
        </div>

        <div className="flex w-full max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email của bạn"
            className="flex-1 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shrink-0">
            <Send size={16} />
            <span className="hidden sm:inline">Đăng ký</span>
          </button>
        </div>
      </div>
    </section>
  );
}
