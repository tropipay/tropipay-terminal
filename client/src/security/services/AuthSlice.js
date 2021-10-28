import { createSlice } from "@reduxjs/toolkit";
import db from "./localdb";

// ... Create Slice
export const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null,
    session: null,
    error: null
  },
  reducers: {
    updateError: (state, action) => {
      state.error = action.payload;
    },
    updateSession: (state, action) => {
      if (action.payload) {
        db.set(action.payload, "session");
        state.session = action.payload;
      } else {
        state.session = db.get("session");
      }
    },
    updateProfile: (state, action) => {
      console.log('updateProfile >>>>', action.payload);
      if (action.payload) {
        db.set(action.payload, "profile");
        state.profile = action.payload;
      } else {
        state.profile = db.get("profile");
      }
    },
  },
});

// ... Reducer  
export default slice.reducer;

// ... Selectors  
export const selectProfile = (state) => state.auth.profile;
export const selectSession = (state) => state.auth.session;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.session.token;

// ... Actions  
export const { updateSession, updateProfile, updateError } = slice.actions;

// ... Actions (async)  
export const loadProfile = () => (dispatch) => {
  console.log("AuthSlice", "loadProfile");
  try {
    const data = {};
    const url = "http://localhost:3005/api/v1/security/profile";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => dispatch(updateProfile(data)));

  } catch (e) {
    dispatch(updateError(e.message));
    return console.error(e.message);
  }
};
