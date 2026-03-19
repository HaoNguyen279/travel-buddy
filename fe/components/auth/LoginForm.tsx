"use client";

export function LoginForm() {
  return (
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
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <button
        type="submit"
        className="w-full h-11 rounded-xl bg-gray-900 text-white text-sm font-semibold
                   hover:bg-gray-800 active:scale-[0.99] transition"
      >
        Sign in
      </button>
    </form>
  );
}