import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriMovieList: [],
};

export const favoriesSlice = createSlice({
  name: "favories",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  favoriesSlice.actions;

export default favoriesSlice.reducer;
