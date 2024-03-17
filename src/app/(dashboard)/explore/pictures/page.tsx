"use client";

import { useEffect, useTransition } from "react";

import axios from "@/axios";
import { Picture } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addPictures } from "@/redux/features/picture-slice";
import usePagination from "@/hooks/usePagination";
import PictureCard, { PictureCardSkeleton } from "@/components/picture-card";

export default function PicturePage() {
  const { pictures, searchPictures } = useAppSelector(
    (state) => state.pictures
  );
  const dispatch = useAppDispatch();

  const { renderList, renderButtons } = usePagination({
    data: searchPictures.length > 0 ? searchPictures : pictures,
    pageSize: 20,
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await axios.get("/photos");
        dispatch(addPictures(response.data));
      } catch (error) {
        console.log(error);
      }
    });
  }, [dispatch]);

  return (
    <>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center p-4">
        {isPending &&
          Array.from({ length: 10 }).map((_, i) => (
            <PictureCardSkeleton key={i} />
          ))}
        {renderList().length > 0 ? (
          renderList().map((picture, i) => (
            <PictureCard key={i} picture={picture as Picture} />
          ))
        ) : (
          <div>No Pictures!</div>
        )}
      </div>
      <div className="flex items-center gap-2 w-full justify-center mt-4">
        {renderButtons()}
      </div>
    </>
  );
}
