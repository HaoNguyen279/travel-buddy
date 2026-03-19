"use client";

export function RegisterForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <label htmlFor="register-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          placeholder="you@example.com"
          className="w-full h-11 rounded-xl border border-gray-300 px-3.5 text-sm outline-none transition-all
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="register-password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          placeholder="Create a strong password"
          className="w-full h-11 rounded-xl border border-gray-300 px-3.5 text-sm outline-none transition-all
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <button
        type="submit"
        className="w-full h-11 rounded-xl bg-indigo-600 text-white text-sm font-semibold
                   hover:bg-indigo-500 active:scale-[0.99] transition"
      >
        Create account
      </button>
    </form>
  );
}