"use client";
import React from "react";
import Link from "next/link";

export default function SignUpButton() {
  return (
    <Link
      href="/register"
      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2
                text-sm font-semibold text-white
                hover:bg-blue-700 active:scale-[0.98]
                transition-all duration-200 shadow-sm"
    >
      Đăng ký
    </Link>
  );
}
