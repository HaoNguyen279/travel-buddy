import Link from "next/link";
import Image from "next/image";

type FooterItems = {
  itemName: string;
  linkTo: string;
};
type FooterProps = {
  footerTitle: string;
  footerItems: FooterItems[];
};

export default function Footer({ props }: { props: FooterProps[] }) {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {props.map((item) => (
            <div key={item.footerTitle}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {item.footerTitle}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {item.footerItems.map((footItem) => (
                  <li key={footItem.itemName}>
                    <a
                      href={footItem.linkTo}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {footItem.itemName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/img/travelbuddy-logo.svg"
              alt="TravelBuddy"
              width={120}
              height={24}
              className="h-6 w-auto opacity-60"
            />
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} TravelBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
