import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";
import userApi from "../services/user.api";

interface InitialState {
  user: User | null;
  token?: string;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      console.log("logout")
      localStorage.removeItem("token");
      return initialState;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
      })
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.token = action.payload.access_token;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(userApi.endpoints.me.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, resetUser } = slice.actions;
export const selectUser = (state: { user: InitialState }) => state.user;
export const selectIsAuthenticated = (state: { user: InitialState }) =>
  state.user.isAuthenticated;
export default slice.reducer;
