import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: { id: null, email: null, token: null } };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: () => {
      localStorage.removeItem("token");
      return initialState;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
  },
});

export const userSelector = {
  getUser: (state) => state.user,
};

export const { setUser, removeUser } = authSlice.actions;

export default authSlice;
