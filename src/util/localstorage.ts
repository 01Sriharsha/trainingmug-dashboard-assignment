import { Picture, Post } from "@/types";

export const getItemsFromLocalStorage = (keyword: string) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(keyword);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log(parsed);
      
      return parsed as Picture[] | Post[];
    }
  }
  return [];
};
