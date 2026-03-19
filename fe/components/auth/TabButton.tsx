"use client";

import { motion } from "framer-motion";
import { AuthTab } from "./AuthContainer";

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  label: string;
  tabKey: AuthTab;
};

export function TabButton({ isActive, onClick, label, tabKey }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative z-10 h-10 rounded-lg text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 transition-colors"
      type="button"
    >
      {isActive && (
        <motion.span
          layoutId="auth-tab-pill"
          className="absolute inset-0 rounded-lg bg-white shadow-sm"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span
        className={`relative transition-colors duration-300 ${
          isActive ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </button>
  );
}