import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, accessToken } = action.payload;
      state.isAuth = true;
      state.accessToken = accessToken;
      state.user = user;
    },
    logout(state) {
      state.isAuth = false;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
