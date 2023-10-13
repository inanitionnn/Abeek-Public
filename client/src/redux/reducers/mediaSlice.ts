import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GetMediaQuery,
  SearchMediaQuery,
  WikiMediaParseQuery,
} from "../../graphql/__generated__/graphql";

interface mediaSliceState {
  parseMedia: WikiMediaParseQuery["wikiMediaParse"]["media"];
  searchMedia: SearchMediaQuery["searchMedia"];
  getMedia: GetMediaQuery["getMedia"];
}

const initialState: mediaSliceState = {
  parseMedia: {},
  searchMedia: [],
  getMedia: {},
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setSearchMediaState(
      state,
      action: PayloadAction<SearchMediaQuery["searchMedia"]>
    ) {
      state.searchMedia = action.payload;
    },
    setParseMediaState(
      state,
      action: PayloadAction<WikiMediaParseQuery["wikiMediaParse"]["media"]>
    ) {
      state.parseMedia = action.payload;
    },
    setGetMediaState(state, action: PayloadAction<GetMediaQuery["getMedia"]>) {
      state.getMedia = action.payload;
    },
  },
});

export const { setSearchMediaState, setParseMediaState, setGetMediaState } =
  mediaSlice.actions;
export default mediaSlice.reducer;
