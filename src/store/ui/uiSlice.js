import { createSlice } from "@reduxjs/toolkit";
import LOCALSTORAGE_ITEMS from "constants/localStorageItems";
import { UI_VARIABLES } from "constants/ui";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mode: UI_VARIABLES.UI_MODE_LIGHT,
    navbarMobileOpen: false
  },
  reducers: {
    setMode(state, action) {
      state.mode = action.payload.mode;
    },
    toggleNavbarMobileOpen(state, action) {
      state.navbarMobileOpen = !state.navbarMobileOpen;
    },
    changeModeUi(state, action) {
      const mode = state.mode === UI_VARIABLES.UI_MODE_DARK ? UI_VARIABLES.UI_MODE_LIGHT : UI_VARIABLES.UI_MODE_DARK;
      const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS.USER_DATA));

      state.mode = mode;

      localStorage.setItem(
        LOCALSTORAGE_ITEMS.USER_DATA,
        JSON.stringify({
          ...storedData,
          mode: mode
        })
      );
    },
  },
});

export const uisActions = uiSlice.actions;
