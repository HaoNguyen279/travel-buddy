"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TabButton } from "./TabButton";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export type AuthTab = "login" | "register";

export function AuthContainer() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  return (
    <motion.section
      layout
      transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
      className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border border-white/60 p-5 sm:p-6"
    >
      {/* Tabs */}
      <div className="relative grid grid-cols-2 rounded-xl bg-gray-100 p-1 mb-6">
        <TabButton
          isActive={activeTab === "login"}
          onClick={() => setActiveTab("login")}
          tabKey="login"
          label="Login"
        />
        <TabButton
          isActive={activeTab === "register"}
          onClick={() => setActiveTab("register")}
          tabKey="register"
          label="Register"
        />
      </div>

      {/* Form content */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "login" ? (
            <motion.div
              key="login-form"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <LoginForm />
            </motion.div>
          ) : (
            <motion.div
              key="register-form"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <RegisterForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}