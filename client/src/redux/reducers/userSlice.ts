import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { IJwt } from "../../constants";
export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface IUserPartial extends Partial<IUser> {}

export interface ITokenResponse {
  user: IUser;
  token: string;
}
interface ITokensState {
  mediaTokens: number | undefined | null;
  additionalMediaTokens: number | undefined | null;
}

interface IRefreshState {
  role: string;
  token: string;
  mediaTokens: number;
  additionalMediaTokens: number;
  notificationCount: number;
}

interface UserState {
  user: IUser;
  isLoggedIn: boolean;
  role: string;
  token: string;
  mediaTokens: number;
  additionalMediaTokens: number;
  notificationCount: number;
  uniqueId: string;
}

const initialState: UserState = {
  user: { id: "", name: "", email: "", picture: "" },
  token: "",
  role: "u",
  notificationCount: 0,
  mediaTokens: 0,
  additionalMediaTokens: 0,
  uniqueId: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginState(state, action: PayloadAction<ITokenResponse>) {
      const decoded: IJwt = jwt_decode(action.payload.token);
      state.role = decoded.role;
      state.additionalMediaTokens = decoded.additionalMediaTokens;
      state.mediaTokens = decoded.mediaTokens;
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.token !== "";
      state.token = action.payload.token;
      state.notificationCount = decoded.notificationCount;
    },
    setRefreshState(state, action: PayloadAction<IRefreshState>) {
      state.mediaTokens = action.payload.mediaTokens;
      state.additionalMediaTokens = action.payload.additionalMediaTokens;
      state.token = action.payload.token;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.notificationCount = action.payload.notificationCount;
    },
    setlogOutState(state) {
      state.user = { id: "", name: "", email: "", picture: "" };
      state.isLoggedIn = false;
      state.token = "";
      state.role = "";
      state.uniqueId = "";
      state.mediaTokens = 0;
      state.additionalMediaTokens = 0;
      state.notificationCount = 0;
    },
    setNotificationCountState(state, action: PayloadAction<number>) {
      state.notificationCount = action.payload;
    },
    setUserState(state, action: PayloadAction<IUserPartial>) {
      state.user.name = action.payload.name ?? state.user.name;
      state.user.picture = action.payload.picture ?? state.user.picture;
    },
    setUnicId(state, action: PayloadAction<string>) {
      state.uniqueId = action.payload;
    },
    setTokensState(state, action: PayloadAction<ITokensState>) {
      state.mediaTokens = action.payload.mediaTokens || state.mediaTokens;
      state.additionalMediaTokens =
        action.payload.additionalMediaTokens || state.additionalMediaTokens;
    },
  },
});

export const {
  setUnicId,
  setUserState,
  setRefreshState,
  setNotificationCountState,
  setLoginState,
  setlogOutState,
  setTokensState,
} = userSlice.actions;
export default userSlice.reducer;
