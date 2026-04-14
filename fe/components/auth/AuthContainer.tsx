"use client";


import React from "react";
import { LoginForm } from "./LoginForm";

export type AuthTab = "login" | "register";
export function AuthContainer({children} : {children : React.ReactNode}) {


  return (
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex justify-center gap-4">
          {children}
        </div>
      </div>
  );
}