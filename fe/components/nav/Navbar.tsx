"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import { useAuth } from "../../app/context/AuthContext";
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";
import Dropdown from "./Dropdown";

type NavbarProps = {
  webName: string;
  subtitle: string;
  itemOnNav: Array<{ itemName: string; linkTo: string }>;
};

export function Navbar({ webName, subtitle, itemOnNav }: NavbarProps) {
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/img/travelbuddy-logo.svg"
            alt="TravelBuddy"
            height={30}
            width={140}
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {itemOnNav.map((item) => (
            <Link
              key={item.itemName}
              href={item.linkTo}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              {item.itemName}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Dropdown />
          ) : (
            <>
              <LoginButton />
              <SignUpButton />
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-1 pt-2">
            {itemOnNav.map((item) => (
              <Link
                key={item.itemName}
                href={item.linkTo}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setMobileOpen(false)}
              >
                {item.itemName}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 pt-3 border-t border-gray-100 mt-2">
            {user ? (
              <Dropdown />
            ) : (
              <>
                <LoginButton />
                <SignUpButton />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
