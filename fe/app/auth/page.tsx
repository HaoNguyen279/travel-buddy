import { AuthContainer } from "@/components/auth/AuthContainer";
import imgUrl from "../../public/img/travel-background-613yzbmemikozd15.jpg";
export default function AuthPage() {
  return (
    <main
      style={{
        backgroundImage: `url(${imgUrl.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200 flex items-center justify-center p-4"
    >
      <AuthContainer />
    </main>
  );
}
