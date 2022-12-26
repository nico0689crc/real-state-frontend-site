import { createSlice } from "@reduxjs/toolkit";
import { AuthRoles } from 'constants/authConstanst';
import LOCALSTORAGE_ITEMS from "constants/localStorageItems";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      user_role: AuthRoles.any
    },
    accessToken: null,
    uid: null,
    client: null,
    isLoading: true,
    isAuthenticated: false,
    ui: {
      authModalActive: false,
    }
  },
  reducers: {
    toggleAuthModalStatus(state, action) {
      if(action.payload) {
        state.ui.authModalActive = action.payload.authModalActive
      } else {
        state.ui.authModalActive = !state.ui.authModalActive;
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    login(state, action) {
      const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));

      state.accessToken = action.payload.auth.accessToken;
      state.uid = action.payload.auth.uid;
      state.client = action.payload.auth.client;
      state.user = action.payload.auth.user;
      state.tokenExpirationDate = action.payload.auth.tokenExpirationDate;
      state.isAuthenticated = true;

      localStorage.setItem(
        LOCALSTORAGE_ITEMS.USER_DATA,
        JSON.stringify({
          ...storedData,
          accessToken: state.accessToken,
          uid: state.uid,
          client: state.client,
          user: state.user,
          tokenExpirationDate: action.payload.auth.tokenExpirationDate
        })
      );
    },
    logout(state, action) {
      const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));

      state.accessToken = null;
      state.uid = null;
      state.client = null;
      state.user = { user_role: AuthRoles.any };
      state.tokenExpirationDate = null;
      state.isAuthenticated = false;

      localStorage.removeItem(LOCALSTORAGE_ITEMS.USER_DATA);
      localStorage.setItem(
        LOCALSTORAGE_ITEMS.USER_DATA,
        JSON.stringify({
          ...storedData,
          accessToken: null,
          uid: null,
          client: null,
          user: null,
          tokenExpirationDate: null
        })
      );
    },
  }
});

export const authActions = authSlice.actions;