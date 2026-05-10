"use client"
import { button } from 'framer-motion/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function LoginButton() {
    const router = useRouter();
    const handleClick = () =>{
        router.push('/login');
    }
  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2
                text-sm font-medium text-slate-700 shadow-sm
                hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900
                active:scale-[0.98] transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1"
    >
      Login
    </Link>
  )
}
