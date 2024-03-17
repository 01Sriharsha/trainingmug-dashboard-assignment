import { Picture, Post } from "@/types";
import React, { useEffect, useState } from "react";

type PaginationProps = {
  data: Post[] | Picture[];
  pageSize: number;
  maxButtons?: number;
};

export default function usePagination({
  data,
  pageSize,
  maxButtons,
}: PaginationProps) {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(1);
  const totalPage = data.length / pageSize;

  const max = maxButtons || Math.min(5, Math.ceil(data.length / pageSize));

  const handleSelectPage = (selectedPage: number) => {
    if (selectedPage < 1 || selectedPage > totalPage || selectedPage === page) {
      return;
    }
    setPage(selectedPage);
  };

  useEffect(() => {
    if (page > max * start && page < totalPage) {
      setStart((prev) => prev + 1);
    } else if (page <= max * start - max && page > 1) {
      setStart((prev) => prev - 1);
    }
  }, [page, start, max, totalPage]);

  const renderButtons = () => {
    const buttons = [];
    for (let i = start * max - max; i < start * max; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn btn-xs md:btn-md ${page === i + 1 && "btn-active"}`}
          onClick={() => handleSelectPage(i + 1)}
        >
          {i + 1}
        </button>
      );
    }
    return (
      <>
        <button
          disabled={page === 1}
          className={`btn btn-xs md:btn-md ${page === 1 && "btn-disabled"}`}
          onClick={() => handleSelectPage(page - 1)}
        >
          ◀️
        </button>
        <>{buttons}</>
        <button
          disabled={page === totalPage}
          className={`btn btn-xs md:btn-md ${page === totalPage && "btn-disabled"}`}
          onClick={() => handleSelectPage(page + 1)}
        >
          ▶️
        </button>
      </>
    );
  };

  const renderList = () =>
    data.slice(page * pageSize - pageSize, page * pageSize);

  return {
    page,
    start,
    handleSelectPage,
    renderButtons,
    renderList,
  };
}
