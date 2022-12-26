import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { snackBarAlertSlice } from "./ui/snackBarAlertSlice";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    uiStore: uiSlice.reducer,
    authStore: authSlice.reducer,
    snackBarAlertStore: snackBarAlertSlice.reducer
  },
});