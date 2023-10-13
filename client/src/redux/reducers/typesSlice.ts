import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  MediaEnum,
  FilmEnum,
  SeriesEnum,
  ComicsEnum,
  BookEnum,
} from "../../graphql/__generated__/graphql";

interface mediaSliceState {
  mediaType: MediaEnum;
  filmType: FilmEnum | null;
  seriesType: SeriesEnum | null;
  comicsType: ComicsEnum | null;
  bookType: BookEnum | null;
}

const initialState: mediaSliceState = {
  mediaType: MediaEnum.Film,
  filmType: null,
  seriesType: null,
  comicsType: null,
  bookType: null,
};

const typesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    setMediaTypeState(state, action: PayloadAction<MediaEnum>) {
      state.mediaType = action.payload;
    },
    setFilmTypeState(state, action: PayloadAction<FilmEnum | null>) {
      state.filmType = action.payload;
    },
    setSeriesTypeState(state, action: PayloadAction<SeriesEnum | null>) {
      state.seriesType = action.payload;
    },
    setComicsTypeState(state, action: PayloadAction<ComicsEnum | null>) {
      state.comicsType = action.payload;
    },
    setBookTypeState(state, action: PayloadAction<BookEnum | null>) {
      state.bookType = action.payload;
    },
  },
});

export const {
  setMediaTypeState,
  setFilmTypeState,
  setSeriesTypeState,
  setComicsTypeState,
  setBookTypeState,
} = typesSlice.actions;
export default typesSlice.reducer;
