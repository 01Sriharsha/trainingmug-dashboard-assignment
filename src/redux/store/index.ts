import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import postReducer from "@/redux/features/post-slice";
import pictureReducer from "@/redux/features/picture-slice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    pictures: pictureReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
