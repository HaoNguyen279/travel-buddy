import { AuthContainer } from "@/components/auth/AuthContainer";
import { Navbar } from "@/components/nav/Navbar";
import { LoginForm } from "@/components/auth/LoginForm";


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

  <div className="flex-1 flex items-center justify-center">
    <AuthContainer children={<LoginForm/>}/>
  </div>
</main>
  );
}