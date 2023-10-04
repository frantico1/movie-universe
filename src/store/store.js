import { configureStore } from "@reduxjs/toolkit";
import favoriesSlice from "../features/favories/favoriesSlice";
import moviesSlice from "../features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    favories: favoriesSlice,
    movies: moviesSlice,
  },
});
