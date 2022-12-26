import { createSlice } from "@reduxjs/toolkit";

export const snackBarAlertSlice = createSlice({
  name: "snackBarAlert",
  initialState: {
    isSnackBarOpen: false,
    snackBarAlert: {
      type: null,
      content: {
        title: null,
        subTitle: null,
        message: null
      },
      anchorOrigin: {
        vertical: "bottom", 
        horizontal: "right"
      }
    }
  },
  reducers: {
    setSnackBarAlert(state, action) {
      const  {
        type = "success",
        content = { title: null, ubTitle: null, message: null },
        anchorOrigin = { vertical: "bottom", horizontal: "right" }
      } = action.payload.snackBarAlert;

      state.snackBarAlert = {
        type,
        content: {
          ...state.snackBarAlert.content,
          ...content
        },
        anchorOrigin: {
          ...state.snackBarAlert.anchorOrigin,
          ...anchorOrigin
        }
      };
      state.isSnackBarOpen = true;
    },
    closeSnackBarAlert(state, action) {
      state.isSnackBarOpen = false;
    }
  },
});

export const snackBarAlertActions = snackBarAlertSlice.actions;
