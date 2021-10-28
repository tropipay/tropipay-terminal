import { createSlice } from "@reduxjs/toolkit";
import db from "./localdb";

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
        db.set("session", JSON.stringify(action.payload));
        state.session = action.payload;
      } else {
        const sessionData = db.get("session");
        try {
          state.session = JSON.parse(sessionData);
        } catch (error) {}
      }
    },
    updateProfile: (state, action) => {
      if (action.payload) {
        db.set("profile", JSON.stringify(action.payload));
        state.session = action.payload;
      } else {
        const profileData = db.get("profile");
        try {
          state.profile = JSON.parse(profileData);
        } catch (error) {}
      }
    },
  },
});

export const { updateSession, updateProfile } = slice.actions;

export const selectProfile = (state) => state.auth.profile;
export const selectSession = (state) => state.auth.session;
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.session.token;

export default slice.reducer;


export const loadProfile = () => async (dispatch) => {
  try {
    const data = {};
    const url = "/api/v1/security/profile";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
      }
    })
    dispatch(updateProfile(res.data));
    return res.data;
  } catch (e) {
    dispatch(updateError(e.message));
    return console.error(e.message);
  }
};
