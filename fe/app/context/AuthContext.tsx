"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {auth} from "@/lib/firebase"

type AuthContextType = {
    user : User | null,
    loading: boolean
}
const AuthContext = createContext<AuthContextType | null>(null);


// cai deo j vay dm typescript
export default function AuthProvider({children} : {children : React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading,setLoading]= useState(true);
    
    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, (user) =>{
            setUser(user);
            setLoading(false);
        })
        return () => unsubcribe();
    }, []);
  return (
    <AuthContext.Provider value={{user, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used inside AuthProvider")
    return context
}