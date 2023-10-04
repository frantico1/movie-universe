import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies, getMovieInfo } from "../../lib/data";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ search = "", page = "1", type = "movie" }, thunkAPI) => {
    // You should send parameters this example for search => '&s=search'
    // For page => '&p=1', '&p=2' ...
    // For type => '&type=movie' , '&type = series', '&type = episode'
    // For one movie info => '&i=imbdID'

    // const s = `&s=${search}`,
    //   p = `&p=${page}`,
    //   t = `&type=${type}`;

    const s = `&s=${encodeURIComponent(search)}`,
      p = `&p=${page}`,
      t = `&t=${type}`;

    return await getMovies({ s, p, t });
  }
);

export const fetchMovieInfo = createAsyncThunk(
  "movie/fetchMovieInfo",
  async ({ id = "" }, thunkAPI) => {
    // In this example, you should include the 'id' parameter in the search query.
    // For instance, if you're searching for the movie with the IMDb ID 'tt1285016',
    // you should append '&i=tt1285016' to the search query.

    const i = `&i=${id}`;

    console.log("Work!!");

    return await getMovieInfo({ i });
  }
);

const initialState = {
  movieList: [],
  loading: false,
  loadingInfo: false,
  error: false,
  searchText: "",
  movieInfo: {},
};

export const moviesSlice = createSlice({
  name: "getData",
  initialState,
  reducers: {
    setTextSearch: (state, action) => {
      const { payload } = action;
      state.searchText = payload;
    },
    getSearchText: (state) => {
      return state.searchText;
    },
    setMovieInfo: (state, action) => {
      const { payload } = action;
      state.movieInfo = payload;
    },
  },
  extraReducers: (builder) => {
    //rejected
    //fullFilled
    //pending

    //For Fetch Movies
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { payload } = action;

      state.movieList = payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    //For Fetch Movies with ID
    builder.addCase(fetchMovieInfo.pending, (state, action) => {
      state.loadingInfo = true;
    });

    builder.addCase(fetchMovieInfo.fulfilled, (state, action) => {
      const { payload } = action;

      state.movieInfo = payload;
      state.loadingInfo = false;
    });

    builder.addCase(fetchMovieInfo.rejected, (state, action) => {
      state.loadingInfo = false;
    });
  },
});

export const { extraReducers, setTextSearch, getSearchText, setMovieInfo } =
  moviesSlice.actions;

export default moviesSlice.reducer;
