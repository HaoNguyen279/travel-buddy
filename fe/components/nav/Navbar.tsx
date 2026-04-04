import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
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
  return (
    
    <div className="z-10 py-4 ">
              <Image
        src="/img/travelbuddy-logo.svg"
        alt={"Main-logo"}
        height={40}
        width={200}
        className="h-10 w-auto object-contain"
        />
      <nav className="relative z-10 flex items-center justify-between border border-teal-100 bg-black from-cyan-50 via-amber-50 to-emerald-100 p-1">
        <div className="space-y-1 flex items-center">
          {itemOnNav.map((item)=>{
              return(
                  <Link className="p-2 text-white-700" key={item.itemName} href={item.linkTo}>{item.itemName}</Link>
              )
          })}
        </div>
        </nav>
    </div>
  );
}
