import { AuthContainer } from "@/components/auth/AuthContainer";
import { Navbar } from "@/components/nav/Navbar";
import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { RegisterForm } from "@/components/auth/RegisterForm";

const navProps = {
  webName : "TravellBuddy",
  subtitle : "alo",
  itemOnNav : [
    {
      itemName: "Register",
      linkTo : "/register"
    },
    {
      itemName: "Place",
      linkTo : "/place"
    },
    {
      itemName: "Aniaga",
      linkTo : "/"
    },
  ]
}

export default function AuthPage() {

  return (
    
<main
  style={{
     backgroundImage: `url('/img/travel-background-613yzbmemikozd15.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 flex flex-col"
>
  <Navbar
    webName={navProps.webName}
    subtitle={navProps.subtitle}
    itemOnNav={navProps.itemOnNav}
  />

  <div className="flex-1 flex items-center justify-center">
    <AuthContainer children={<RegisterForm/>} />
  </div>
</main>
  );
}