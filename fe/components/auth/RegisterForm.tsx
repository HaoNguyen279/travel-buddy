"use client";

export function RegisterForm() {
  return (
    <div className="block">
      <div className="my-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Đăng ký
        </h1>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Full name */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-fullname"
            className="text-sm font-medium text-slate-700"
          >
            Họ và tên
          </label>
          <input
            id="register-fullname"
            type="text"
            placeholder="Nguyễn Văn A"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-username"
            className="text-sm font-medium text-slate-700"
          >
            Tên người dùng
          </label>
          <input
            id="register-username"
            type="text"
            placeholder="your_username"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-email"
            className="text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-phone"
            className="text-sm font-medium text-slate-700"
          >
            Số điện thoại
          </label>
          <input
            id="register-phone"
            type="tel"
            placeholder="0xxxxxxxxx"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-password"
            className="text-sm font-medium text-slate-700"
          >
            Mật khẩu
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="Tạo mật khẩu mạnh"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-confirm-password"
            className="text-sm font-medium text-slate-700"
          >
            Xác nhận mật khẩu
          </label>
          <input
            id="register-confirm-password"
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>
            Tôi đồng ý với <a href="#" className="text-indigo-600 hover:underline">Điều khoản sử dụng</a> và{" "}
            <a href="#" className="text-indigo-600 hover:underline">Chính sách bảo mật</a>.
          </span>
        </label>

        {/* Register button */}
        <button
          type="submit"
          className="w-full h-11 rounded-xl bg-slate-900 text-white text-sm font-semibold
                     hover:bg-slate-800 active:scale-[0.99] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          Tạo tài khoản
        </button>
      </form>
    </div>
  );
}