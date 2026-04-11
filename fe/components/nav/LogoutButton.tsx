"use client"
import { useRouter } from 'next/navigation'
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default function LogoutButton() {
    const handleClick = async () =>{
        await signOut(auth);
    }
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out" onClick={handleClick}>Logout</button>
  )
}
