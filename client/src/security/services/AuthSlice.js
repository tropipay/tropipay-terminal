import { createSlice } from "@reduxjs/toolkit";
import session from "./session";
const URL_TERMINAL = 'http://localhost:3005';

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
        session.set(action.payload); 
        state.session = action.payload;
      } else {
        state.session = session.get(); 
      }
    },
    updateProfile: (state, action) => {
      if (action.payload) {
        session.set(action.payload, "profile"); 
        state.profile = action.payload;
      } else {
        state.profile = session.get("profile"); 
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
  try {
    const data = session.get(); 
    const url = "/api/v1/security/profile";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => dispatch(updateProfile(data)));
  } catch (e) {
    dispatch(updateError(e.message));
    return console.error(e.message);
  }
};
