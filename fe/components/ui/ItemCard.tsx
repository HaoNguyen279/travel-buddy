"use client";

import { label } from "framer-motion/m";
import Image from "next/image";
type ItemCardProps = {
    imgUrl: string;
    altText: string;
};

export function ItemCard({imgUrl, altText}: ItemCardProps) {
  return (
    <div className="w-full max-w-sm rounded-md bg-white shadow-md border border-gray-200">
        <div className="relative flex items-center justify-center w-full h-48">
            <Image
                src={imgUrl}
                alt={altText}
                className="w-full h-48 object-cover rounded-md mb-4"
                fill
            />
        </div>
        <div className="flex justify-start pt-2 pl-2"><span className="inline-flex items-start rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30">Badge</span></div>
      <h3 className="text-lg text-start font-semibold text-gray-900 p-2">Item Title</h3>
      <p className="text-start text-sm text-gray-700 p-2">This is a description of the item. It provides more details about what the item is and why it's useful.</p>

    </div>

  );
}