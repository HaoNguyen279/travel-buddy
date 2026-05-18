import Link from "next/link";
import type { Post } from "@/services/postService";

type PostCardProps = { post: Post };

export function PostCard({ post }: PostCardProps) {
  const shortUserId = post.user_id.slice(0, 8).toUpperCase();
  const displayName =
    post.author?.full_name ?? post.author?.username ?? `user · ${shortUserId}`;
  const avatarUrl = post.author?.avatar_url;
  const postDate = post.createdAt ?? post.created_at;
  const parsedDate = postDate ? new Date(postDate) : null;
  const formattedDate =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleString("vi-VN")
      : "Vừa xong";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Link
          href={`/user/${post.user_id}`}
          aria-label={`Xem trang cá nhân của ${displayName}`}
          className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium overflow-hidden"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            displayName.slice(0, 1).toUpperCase()
          )}
        </Link>
        <div>
          <p className="text-sm font-medium text-gray-800">{displayName}</p>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-base text-gray-800 mb-3 leading-relaxed">
        {post.content}
      </p>

      {/* Image */}
      {post.image_url ? (
        <img
          src={post.image_url}
          alt="post"
          className="w-full rounded-xl object-cover max-h-64 mb-3"
        />
      ) : (
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <rect
              x="1"
              y="3"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M1 11l4-4 3 3 2-2 4 3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          Không có ảnh
        </div>
      )}

    </div>
  );
}
