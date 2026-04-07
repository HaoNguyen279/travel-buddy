"use client";

import Image from "next/image";
export function LoginForm() {
  return (
    <div>
      <h1 className="text-center text-gray-900 text-2xl font-bold py-4">SIGN IN</h1>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <label htmlFor="login-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          className="w-full h-11 rounded-xl border border-gray-300 px-3.5 text-sm outline-none transition-all
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-gray-900"
        />
        
      </div>

      <div className="space-y-1.5">
        <label htmlFor="login-password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="••••••••"
          className="w-full h-11 rounded-xl border border-gray-300 px-3.5 text-sm outline-none transition-all
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-gray-900"
        />
      </div>
      <button
        type="submit"
        className="w-full h-11 rounded-xl bg-gray-100 text-gray-900 text-sm font-semibold
                   hover:bg-gray-200 active:scale-[0.99] transition shadow-md flex items-center justify-center"
      >
        Or sign in with Google
        <Image
          src="/img/google.png"
          alt="Google Icon"
          width={20}
          height={20}
          className="ml-2"
        />
      </button>
      <button
        type="submit"
        className="w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold
                   hover:bg-gray-800 active:scale-[0.99] transition"
      >
        Sign in
      </button>
    </form>
    </div>
  );
}