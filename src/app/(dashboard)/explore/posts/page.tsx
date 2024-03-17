"use client";

import { useEffect, useTransition } from "react";

import axios from "@/axios";
import { Post } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addPosts } from "@/redux/features/post-slice";
import usePagination from "@/hooks/usePagination";
import PostCard, { PostCardSkeleton } from "@/components/post-card";

export default function DashboardPage() {
  const { posts, searchPosts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const { renderList, renderButtons } = usePagination({
    data: searchPosts.length ? searchPosts : posts,
    pageSize: 20,
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await axios.get("/posts");
        dispatch(addPosts(response.data));
      } catch (error) {
        console.log(error);
      }
    });
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
        {isPending &&
          Array.from({ length: 10 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        {renderList().length > 0 ? (
          renderList().map((post, i) => (
            <PostCard key={i} post={post as Post} />
          ))
        ) : (
          <div>No Posts!</div>
        )}
      </div>
      <div className="flex items-center gap-1 md:gap-2 justify-center mt-4">
        {renderButtons()}
      </div>
    </div>
  );
}
