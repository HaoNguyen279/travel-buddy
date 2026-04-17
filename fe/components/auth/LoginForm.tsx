"use client";

import Image from "next/image";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) router.replace("/");
      console.log(result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="block">
      <div className="my-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Đăng nhập
          </h1>
          {/* <p className="mt-2 text-sm text-slate-500">
            Chào mừng bạn quay trở lại 👋
          </p> */}
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                         outline-none transition-all duration-200
                         focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-slate-700"
            >
              Mật khẩu
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                         outline-none transition-all duration-200
                         focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Main Sign-in button */}
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-slate-900 text-white text-sm font-semibold
                       hover:bg-slate-800 active:scale-[0.99] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-slate-300"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 tracking-wide">
                Hoặc
              </span>
            </div>
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full h-11 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold
                       hover:bg-slate-50 hover:border-slate-400 active:scale-[0.99] transition-all duration-200
                       shadow-sm flex items-center justify-center gap-2
                       focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Đăng nhập với Google
            <Image
              src="/img/google.png"
              alt="Google Icon"
              width={18}
              height={18}
            />
          </button>
        </form>
    </div>

  );
}