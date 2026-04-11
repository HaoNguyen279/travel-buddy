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
    <Link className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 ease-in-out" href={"/register"}>Sign up </Link>
  )
}
