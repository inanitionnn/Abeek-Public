import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortedEnum, WatchedEnum } from "../../graphql/__generated__/graphql";
import { sizeType } from "../../constants";

interface collectionSliceState {
  sorted: SortedEnum;
  watched: WatchedEnum | null;
  size: sizeType;
  isLoadMore: boolean;
  isLoading: boolean;
}

const initialState: collectionSliceState = {
  sorted: SortedEnum.DateDesc,
  watched: null,
  size: "medium",
  isLoadMore: true,
  isLoading: false,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSortedState(state, action: PayloadAction<SortedEnum>) {
      state.sorted = action.payload;
    },
    setWatchedState(state, action: PayloadAction<WatchedEnum | null>) {
      state.watched = action.payload;
    },
    setSizeState(state, action: PayloadAction<sizeType>) {
      state.size = action.payload;
    },
    setIsLoadingState(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsLoadMoreState(state, action: PayloadAction<boolean>) {
      state.isLoadMore = action.payload;
    },
  },
});

export const {
  setIsLoadingState,
  setIsLoadMoreState,
  setSortedState,
  setWatchedState,
  setSizeState,
} = collectionSlice.actions;
export default collectionSlice.reducer;
