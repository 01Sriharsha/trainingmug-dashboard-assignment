"use client";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoSave, IoSaveOutline } from "react-icons/io5";

import { Picture, Post } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { likePost, savePost } from "@/redux/features/post-slice";
import { likePicture, savePicture } from "@/redux/features/picture-slice";
import { usePathname } from "next/navigation";

type CardActionsProps = {
  post?: Post;
  picture?: Picture;
};

export default function CardActions({ post, picture }: CardActionsProps) {
  const { savedPosts } = useAppSelector((state) => state.posts);
  const { savedPictures } = useAppSelector((state) => state.pictures);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isSaved = post
    ? savedPosts.some((p) => p.id === post?.id)
    : savedPictures.some((p) => p.id === picture?.id);

  const isLiked = post ? post.liked : picture?.liked;
  const isSavedPage = pathname.includes("saved");

  const handleLike = () => {
    if (post) {
      dispatch(likePost({ id: post.id, isSavedPage }));
    }
    if (picture) {
      dispatch(likePicture({ id: picture.id, isSavedPage }));
    }
  };

  const handleSave = () => {
    if (post) {
      dispatch(savePost({ id: post.id, isSavedPage }));
    }
    if (picture) {
      dispatch(savePicture({ id: picture.id, isSavedPage }));
    }
  };

  return (
    <div className="w-full flex justify-between items-center mt-3">
      <button onClick={handleLike}>
        {isLiked ? (
          <IoIosHeart size={"1.3rem"} color="red" />
        ) : (
          <IoIosHeartEmpty size={"1.3rem"} />
        )}
      </button>
      <button onClick={handleSave}>
        {isSaved ? (
          <IoSave size={"1.3rem"} />
        ) : (
          <IoSaveOutline size={"1.3rem"} />
        )}
      </button>
    </div>
  );
}
