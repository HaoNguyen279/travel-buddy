"use client";
import React from "react";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2
                text-sm font-medium text-gray-700
                hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900
                active:scale-[0.98] transition-all duration-200"
    >
      Đăng nhập
    </Link>
  );
}
