import { configureStore } from "@reduxjs/toolkit";

import { authApiSlice } from "./apiSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    user: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApiSlice.middleware]),
});
