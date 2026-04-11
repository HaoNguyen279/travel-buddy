"use client"
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuth } from "../../app/context/AuthContext";
import { useEffect } from "react";
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Dropdown from "./Dropdown";
// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["600", "700", "800"],
// });

type NavbarProps = {
  webName: string;
  subtitle: string;
  itemOnNav: Array<{ itemName: string; linkTo: string }>;
};

export function Navbar({webName, subtitle, itemOnNav} : NavbarProps) {
    const {user, loading} = useAuth();
    useEffect(()=>{
      console.log(user);
    },[user]);

  return (
    
    <div className="z-10 py-4 flex bg-white ">
      <Link href="/" className="flex items-center gap-2">
          <Image
          src="/img/travelbuddy-logo.svg"
          alt={"Main-logo"}
          height={30}
          width={150}
          className="h-10 w-auto object-contain m-2 px-5"
          />
      </Link>
        
      <nav className="relative z-10 flex items-center justify-between w-full p-1">
        <div className="flex items-center">
          {itemOnNav.map((item)=>{
              return(
                  <Link className="p-2 text-gray-900 hover:text-blue-700 trasition-colors duration-300 ease-in-out" key={item.itemName} href={item.linkTo}>{item.itemName}</Link>
              )
          })}
        </div>
        {user ? <><Dropdown/></> : <><div>
          <SignUpButton/>
          <LoginButton/>
          <Dropdown/>
        </div></>}
        </nav>
    </div>
  );
}
