// app/(auth)/layout.tsx

import { Navbar } from "@/components/nav/Navbar";
const navProps = {
  webName : "TravelBuddy",
  subtitle : "Đặt chỗ, khám phá và lên kế hoạch cho chuyến đi của bạn",
  itemOnNav : [
    {
      itemName: "Post",
      linkTo : "/post"
    },
    {
      itemName: "Place",
      linkTo : "/place/da-nang"
    },
    {
      itemName: "Chat",
      linkTo : "/chat"
    },
  ]
}
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar webName={navProps.webName} subtitle={navProps.subtitle} itemOnNav={navProps.itemOnNav} />
      <section
        className="auth-container relative flex-1 overflow-hidden"
        style={{
          backgroundImage: `url('/img/travel-background-613yzbmemikozd15.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="relative flex min-h-full items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </section>
    </div>

  );
}