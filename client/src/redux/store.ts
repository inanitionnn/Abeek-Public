import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import addPageSlice from "./reducers/addPageSlice";
import collectionSlice from "./reducers/collectionSlice";
import typesSlice from "./reducers/typesSlice";
import mediaSlice from "./reducers/mediaSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  blacklist: ["add", "media", "collection", "types"],
};
const rootReducer = combineReducers({
  user: userSlice,
  add: addPageSlice,
  media: mediaSlice,
  collection: collectionSlice,
  types: typesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
