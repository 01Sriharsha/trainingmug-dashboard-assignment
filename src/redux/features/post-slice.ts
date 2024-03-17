import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Post } from "@/types";
import { getItemsFromLocalStorage } from "@/util/localstorage";

type InitialState = {
  posts: Post[];
  savedPosts: Post[];
  searchPosts: Post[];
};

const initialState: InitialState = {
  posts: [],
  savedPosts: getItemsFromLocalStorage("savedPosts") as Post[],
  searchPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts.push(...action.payload);
    },
    likePost: (
      state,
      action: PayloadAction<{ id: number; isSavedPage: boolean }>
    ) => {
      let post: Post | undefined;
      if (action.payload.isSavedPage) {
        post = state.savedPosts.find((post) => post.id === action.payload.id);
      } else {
        post = state.posts.find((post) => post.id === action.payload.id);
      }
      if (!post) return;
      post.liked = !post.liked;
    },
    savePost: (
      state,
      action: PayloadAction<{ id: number; isSavedPage: boolean }>
    ) => {
      let post: Post | undefined;
      if (action.payload.isSavedPage) {
        post = state.savedPosts.find((post) => post.id === action.payload.id);
      } else {
        post = state.posts.find((post) => post.id === action.payload.id);
      }
      if (!post) return;
      if (state.savedPosts.some((p) => p.id === post?.id)) {
        const index = state.savedPosts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.savedPosts.splice(index, 1);
      } else {
        state.savedPosts.push(post);
      }
      localStorage.setItem("savedPosts", JSON.stringify(state.savedPosts));
    },
    searchPost: (
      state,
      action: PayloadAction<{ keyword: string; isSavedPage: boolean }>
    ) => {
      const { keyword, isSavedPage } = action.payload;
      if (keyword === "") return;
      if (isSavedPage) {
        state.searchPosts = state.savedPosts.filter((post) =>
          post.title.toLowerCase().includes(keyword)
        );
      } else {
        state.searchPosts = state.posts.filter((post) =>
          post.title.toLowerCase().includes(keyword)
        );
      }
    },
    clearSearchPost: (state) => {
      state.searchPosts = [];
    },
  },
});

export const { addPosts, likePost, savePost, searchPost, clearSearchPost } =
  postSlice.actions;

export default postSlice.reducer;
