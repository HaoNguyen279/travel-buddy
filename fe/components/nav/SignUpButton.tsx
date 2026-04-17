"use client"
import { button } from 'framer-motion/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
export default function SignUpButton() {
    const router = useRouter();
    const handleClick = () =>{
        router.push('/register');
    }
  return (
    <Link
      href="/register"
      className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2
                text-sm font-semibold text-white shadow-sm
                hover:bg-slate-800 active:scale-[0.98]
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
    >
      Sign Up
  </Link>
  )
}
