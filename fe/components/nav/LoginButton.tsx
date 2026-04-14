"use client"
import { button } from 'framer-motion/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function LoginButton() {
    const router = useRouter();
    const handleClick = () =>{
        router.push('/register');
    }
  return (
    <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out" href={"/login"}>Login</Link>
  )
}
