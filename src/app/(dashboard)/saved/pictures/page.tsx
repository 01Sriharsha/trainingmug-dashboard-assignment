"use client";

import { Picture } from "@/types";
import { useAppSelector } from "@/redux/store";
import usePagination from "@/hooks/usePagination";
import PictureCard from "@/components/picture-card";
import { useEffect } from "react";

export default function SavedPicturePage() {
  const { savedPictures, searchPictures } = useAppSelector(
    (state) => state.pictures
  );

  const { renderList, renderButtons } = usePagination({
    data: searchPictures.length > 0 ? searchPictures : savedPictures,
    pageSize: 20,
  });

  return (
    <>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center p-4">
        {renderList().length > 0 ? (
          renderList().map((picture, i) => (
            <PictureCard key={i} picture={picture as Picture} />
          ))
        ) : (
          <div className="text-gray-500 text-xl font-bold mt-8 w-full col-span-12">
            <p className="text-center">No Pictures Saved 😢</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 w-full justify-center mt-4">
        {savedPictures.length > 0 && renderButtons()}
      </div>
    </>
  );
}
