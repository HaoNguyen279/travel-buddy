"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/services/postService";
import { PostCard } from "@/components/ui/Post/PostCard";

export default function PostPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPosts();
      setPosts(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Header */}
      <header className="py-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-sky-700">
            Social<span className="text-violet-600">Feed</span>
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <i className="fas fa-bell" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6 py-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-4 sticky top-6">
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-sky-50 text-sky-700 font-medium">
                <i className="fas fa-home" />
                <span>Home</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                <i className="fas fa-compass" />
                <span>Explore</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                <i className="fas fa-bookmark" />
                <span>Bookmarks</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                <i className="fas fa-users" />
                <span>Communities</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                <i className="fas fa-cog" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Create Post */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex items-start space-x-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  rows={2}
                  placeholder="What's on your mind?"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-3">
                    <button className="p-2 text-gray-500 hover:text-sky-600 rounded-full hover:bg-sky-50">
                      <i className="fas fa-image" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-sky-600 rounded-full hover:bg-sky-50">
                      <i className="fas fa-video" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-sky-600 rounded-full hover:bg-sky-50">
                      <i className="fas fa-link" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-medium">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed: nếu có data API thì render từ posts, không thì fallback demo */}
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((item) => <PostCard key={item.post_id} post={item} />)
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No posts yet.
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 hidden lg:block">
          <div className="space-y-6 sticky top-6">
            {/* Stories */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-lg mb-3 text-gray-800">
                Stories
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-r from-yellow-400 to-pink-500">
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                        alt="User"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Your Story</h3>
                    <p className="text-xs text-gray-500">Add to your story</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested People */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg text-gray-800">
                  Suggested People
                </h2>
                <button className="text-sm text-sky-600 hover:text-sky-800">
                  See All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-sm">David Miller</h3>
                      <p className="text-xs text-gray-500">Photographer</p>
                    </div>
                  </div>
                  <button className="text-xs px-3 py-1 bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-lg mb-3 text-gray-800">
                Trending Topics
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-3 h-3 rounded-full bg-sky-500" />
                  <div>
                    <h3 className="font-medium text-sm">#WebDevelopment</h3>
                    <p className="text-xs text-gray-500">12.5K posts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-3 h-3 rounded-full bg-violet-500" />
                  <div>
                    <h3 className="font-medium text-sm">#DigitalArt</h3>
                    <p className="text-xs text-gray-500">8.2K posts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-3 h-3 rounded-full bg-yellow-500" />
                  <div>
                    <h3 className="font-medium text-sm">#RemoteWork</h3>
                    <p className="text-xs text-gray-500">5.7K posts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
