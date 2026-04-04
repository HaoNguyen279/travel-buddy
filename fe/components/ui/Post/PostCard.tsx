export function PostCard({ post }) {
  const shortUserId = post.user_id.slice(0, 8).toUpperCase();
  const formattedDate = new Date(post.createdAt).toLocaleString("vi-VN");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium">
          {shortUserId.slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            user · {shortUserId}
          </p>
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
          no image
        </div>
      )}

      {/* Footer badges */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md">
          place #{post.place_id}
        </span>
        <span className="text-xs bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1 rounded-md">
          {post.post_id.slice(0, 8)}
        </span>
      </div>
    </div>
  );
}
