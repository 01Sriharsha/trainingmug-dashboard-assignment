"use client";

import { Post } from "@/types";
import { useAppSelector } from "@/redux/store";
import usePagination from "@/hooks/usePagination";
import PostCard from "@/components/post-card";

export default function SavedPostPage() {
  const { savedPosts, searchPosts } = useAppSelector((state) => state.posts);

  const { renderList, renderButtons } = usePagination({
    data: searchPosts.length ? searchPosts : savedPosts,
    pageSize: 20,
  });

  return (
    <div className="p-4">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
        {renderList().length > 0 ? (
          renderList().map((post, i) => (
            <PostCard key={i} post={post as Post} />
          ))
        ) : (
          <div className="text-gray-500 text-xl font-bold mt-8 w-full col-span-12">
            <p className="text-center">No Posts Saved 😢</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 md:gap-2 justify-center mt-4">
        {renderButtons()}
      </div>
    </div>
  );
}
