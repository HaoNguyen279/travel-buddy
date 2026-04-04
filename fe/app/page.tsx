import Image from "next/image";
import { ItemCard } from "@/components/ui/ItemCard";
import { RecommendCard } from "@/components/ui/RecommendCard";
export default function Home() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Travel Buddy!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your ultimate travel companion for planning and sharing your adventures.
          </p>
          <ItemCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/2a/99/13/aerial-view.jpg?w=1800&h=1000&s=1" altText="maldives"/>

          <div className="mt-8">
            <h2 className="text-2xl text-black font-semibold mb-4">Recommended Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RecommendCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/2a/99/13/aerial-view.jpg?w=1800&h=1000&s=1" altText="maldives" topicTitle="Maldives"/>
              <RecommendCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/2a/99/13/aerial-view.jpg?w=1800&h=1000&s=1" altText="maldives" topicTitle="Maldives"/>
              <RecommendCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/2a/99/13/aerial-view.jpg?w=1800&h=1000&s=1" altText="maldives" topicTitle="Maldives"/>
              <RecommendCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/2a/99/13/aerial-view.jpg?w=1800&h=1000&s=1" altText="maldives" topicTitle="Maldives"/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
