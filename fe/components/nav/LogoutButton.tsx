"use client"
import { getAuth, signOut } from "firebase/auth";
import { setUserPresenceState } from '@/features/chat/hooks/usePresence';

const auth = getAuth();

export default function LogoutButton() {
    const handleClick = async () =>{
        const authUser = auth.currentUser;
        if (authUser) {
          await setUserPresenceState(
            {
              uid: authUser.uid,
              displayName: authUser.displayName,
              email: authUser.email,
              photoURL: authUser.photoURL,
            },
            "offline",
          );
        }
        await signOut(auth);
    }
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out" onClick={handleClick}>Logout</button>
  )
}
