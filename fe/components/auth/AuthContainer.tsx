"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Navbar } from "../nav/Navbar";

export type AuthTab = "login" | "register";


export function AuthContainer() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  return (

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex justify-center gap-4">
          <LoginForm/>
        </div>
      </div>

  );
}