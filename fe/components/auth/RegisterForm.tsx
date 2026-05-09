"use client";
import api from "@/services/api";
import { log } from "console";
import { useState } from "react"; 

 
export function RegisterForm() {
  const [fullnameValidationMessage, setFullnameValidationMessage] = useState("");
  const [usernameValidationMessage, setUsernameValidationMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [phoneValidationMessage, setPhoneValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(true);


  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = {
    fullname: formData.get("register-fullname") as string,
    username: formData.get("register-username") as string,
    email: formData.get("register-email") as string,
    phone: formData.get("register-phone") as string,
    password: formData.get("register-password") as string,
    confirmPassword: formData.get("register-confirm-password") as string,
  }
  console.log(data);
  let isValid = true;

  setFullnameValidationMessage("");
  setUsernameValidationMessage("");
  setEmailValidationMessage("");
  setPhoneValidationMessage("");
  setPasswordValidationMessage("");
  setConfirmPasswordStatus(true);

  if(data.fullname === ""){
    setFullnameValidationMessage("Họ và tên không được để trống.");
    isValid = false;
  }
  if(data.username === ""){
    setUsernameValidationMessage("Tên người dùng không được để trống.");
    isValid = false;
  }
  if(data.email === ""){
    setEmailValidationMessage("Email không được để trống.");
    isValid = false;
  }
  if(data.phone === ""){
    setPhoneValidationMessage("Số điện thoại không được để trống.");
    isValid = false;
  }
  if(data.password === ""){
    setPasswordValidationMessage("Mật khẩu không được để trống.");
    isValid = false;
  }
  if(data.password !== data.confirmPassword){
    setConfirmPasswordStatus(false);
    isValid = false;
  }
  if(data.fullname && !/^[a-zA-Z\s]+$/.test(data.fullname)){
    setFullnameValidationMessage("Họ và tên chỉ được chứa chữ cái và khoảng trắng.");
    isValid = false;
  }
  if(data.username && !/^[a-zA-Z0-9_]+$/.test(data.username)){
    setUsernameValidationMessage("Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới.");
    isValid = false;
  }
  if(data.phone && !/^\d{10}$/.test(data.phone)){
    setPhoneValidationMessage("Số điện thoại không hợp lệ. Vui lòng nhập từ 10 chữ số.");
    isValid = false;
  }

  if(data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)){
    setEmailValidationMessage("Địa chỉ email không hợp lệ.");
    isValid = false;
  }
  if(data.password && data.password.length < 6){
    setPasswordValidationMessage("Mật khẩu phải có ít nhất 6 ký tự.");
    isValid = false;
  }

  if(!isValid) return;

  try {    
    const response = await api.post("/auth/register", {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password
    });
    console.log("Registration successful:", response.data);
  } catch (error) {
    console.error("Registration failed:", error);
  }
} 
  return (
    <div className="block">
      <div className="my-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Đăng ký
        </h1>
      </div>

      <form className="space-y-4" onSubmit={e => handleSubmit(e)} >
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
            name="register-fullname"
            type="text"
            placeholder="Nguyễn Văn A"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        {(fullnameValidationMessage !== "") && (
          <p className="text-red-600 text-sm">
            {fullnameValidationMessage}
          </p>
        )}

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
            name="register-username"
            type="text"
            placeholder="your_username"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        {(usernameValidationMessage !== "") && (
          <p className="text-red-600 text-sm">
            {usernameValidationMessage}
          </p>
        )}

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
            name="register-email"
            type="email"
            placeholder="you@example.com"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        {(emailValidationMessage !== "") && (
          <p className="text-red-600 text-sm">
            {emailValidationMessage}
          </p>
        )}

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
            name="register-phone"
            type="tel"
            placeholder="0xxxxxxxxx"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        {(phoneValidationMessage !== "") && (
          <p className="text-red-600 text-sm">
            {phoneValidationMessage}
          </p>
        )}

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
            name="register-password"
          />
        </div>
        {(passwordValidationMessage !== "") && (
          <p className="text-red-600 text-sm">
            {passwordValidationMessage}
          </p>
        )}

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
            name="register-confirm-password"
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                       outline-none transition-all duration-200
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        {!confirmPasswordStatus && (
          <p className="text-red-600 text-sm">
            Mật khẩu xác nhận không khớp. Vui lòng thử lại.
          </p>
        )}

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