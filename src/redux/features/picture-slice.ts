import { Picture } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getItemsFromLocalStorage } from "@/util/localstorage";

type InitialState = {
  pictures: Picture[];
  savedPictures: Picture[];
  searchPictures: Picture[];
};

const initialState: InitialState = {
  pictures: [],
  savedPictures: getItemsFromLocalStorage("savedPictures") as Picture[],
  searchPictures: [],
};

const pictureSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {
    addPictures: (state, action: PayloadAction<Picture[]>) => {
      state.pictures.push(...action.payload);
    },
    likePicture: (
      state,
      action: PayloadAction<{ id: number; isSavedPage: boolean }>
    ) => {
      let picture: Picture | undefined;
      if (action.payload.isSavedPage) {
        picture = state.savedPictures.find(
          (picture) => picture.id === action.payload.id
        );
      } else {
        picture = state.pictures.find(
          (picture) => picture.id === action.payload.id
        );
      }
      if (!picture) return;
      picture.liked = !picture?.liked;
    },
    savePicture: (
      state,
      action: PayloadAction<{ id: number; isSavedPage: boolean }>
    ) => {
      let picture: Picture | undefined;
      if (action.payload.isSavedPage) {
        picture = state.savedPictures.find(
          (picture) => picture.id === action.payload.id
        );
      } else {
        picture = state.pictures.find(
          (picture) => picture.id === action.payload.id
        );
      }
      if (!picture) return;
      if (state.savedPictures.some((p) => p.id === picture?.id)) {
        const index = state.savedPictures.findIndex(
          (post) => post.id === action.payload.id
        );
        state.savedPictures.splice(index, 1);
      } else {
        state.savedPictures.push(picture);
      }
      localStorage.setItem(
        "savedPictures",
        JSON.stringify(state.savedPictures)
      );
    },
    searchPicture: (
      state,
      action: PayloadAction<{ keyword: string; isSavedPage: boolean }>
    ) => {
      const { keyword, isSavedPage } = action.payload;
      if (isSavedPage) {
        state.searchPictures = state.savedPictures.filter((picture) =>
          picture.title.toLowerCase().includes(keyword)
        );
      } else {
        state.searchPictures = state.pictures.filter((picture) =>
          picture.title.toLowerCase().includes(keyword)
        );
      }
    },
    clearSearchPicture: (state) => {
      state.searchPictures = [];
    },
  },
});

export const {
  addPictures,
  likePicture,
  savePicture,
  searchPicture,
  clearSearchPicture,
} = pictureSlice.actions;

export default pictureSlice.reducer;
