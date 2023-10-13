import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StageType } from "../../constants";

interface addPageState {
  stage: StageType;
  keys: string[];
  selectedImage: string;
  addInput: string;
  imagesLoading: boolean;
  gptLoading: boolean;
  searchLoading: boolean;
}

const initialState: addPageState = {
  stage: "start",
  keys: [],
  selectedImage: "",
  addInput: "",
  imagesLoading: false,
  gptLoading: false,
  searchLoading: false,
};

const addPageSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    setStageState(state, action: PayloadAction<StageType>) {
      state.stage = action.payload;
    },
    setKeysState(state, action: PayloadAction<string[]>) {
      state.keys = action.payload;
    },
    setSelectedImageState(state, action: PayloadAction<string>) {
      state.selectedImage = action.payload;
    },
    setAddInputState(state, action: PayloadAction<string>) {
      state.addInput = action.payload;
    },
    setSearchLoadingState(state, action: PayloadAction<boolean>) {
      state.searchLoading = action.payload;
    },
    setImagesLoadingState(state, action: PayloadAction<boolean>) {
      state.imagesLoading = action.payload;
    },
    setGptLoadingState(state, action: PayloadAction<boolean>) {
      state.gptLoading = action.payload;
    },
  },
});

export const {
  setGptLoadingState,
  setImagesLoadingState,
  setKeysState,
  setAddInputState,
  setSearchLoadingState,
  setSelectedImageState,
  setStageState,
} = addPageSlice.actions;
export default addPageSlice.reducer;
