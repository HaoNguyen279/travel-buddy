"use client";


import Image from "next/image";
type RecommendCardProps = {
    imgUrl: string;
    altText: string;
    topicTitle: string;
};

export function RecommendCard({imgUrl, altText, topicTitle}: RecommendCardProps) {
  return (
    <div className="relative flex w-full items-center justify-center h-48 transition duration-300 ease-in-out hover:brightness-125">
        <Image
        src={imgUrl}
        alt={altText}
        className="w-full h-48 object-cover rounded-md"
        fill
    />
    <h2 className="absolute w-full text-start bottom-0 right-0 text-3xl font-semibold text-white-900 p-4">{topicTitle}</h2>
    </div>
  );
}