"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearSearchPost, searchPost } from "@/redux/features/post-slice";
import {
  clearSearchPicture,
  searchPicture,
} from "@/redux/features/picture-slice";

export default function Search() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { searchPosts } = useAppSelector((state) => state.posts);
  const { searchPictures } = useAppSelector((state) => state.pictures);

  const [value, setValue] = useState("");

  const isSavedPage = pathname.includes("saved");

  useMemo(() => {
    if (pathname.includes("pictures")) {
      dispatch(searchPicture({ keyword: value, isSavedPage }));
    }
    if (pathname.includes("posts")) {
      dispatch(searchPost({ keyword: value, isSavedPage }));
    }
  }, [value, isSavedPage]);

  useEffect(() => {
    setValue("");
    dispatch(clearSearchPost());
    dispatch(clearSearchPicture());
  }, [pathname]);

  return (
    <>
      <div className="form-control">
        <label className="input input-bordered w-full flex items-center gap-2 px-3">
          <input
            type="text"
            className="grow text-sm"
            placeholder={`Search ${
              isSavedPage ? "Saved Content" : "All Content"
            }`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <p className="text-sm text-red-500 p-1 mt-1">
        {value &&
          searchPosts.length === 0 &&
          searchPictures.length === 0 &&
          "No results found"}
      </p>
    </>
  );
}
