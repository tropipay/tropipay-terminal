import {
  createSlice
} from "@reduxjs/toolkit";
import session from "./session";

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
export const {
  updateSession,
  updateProfile,
  updateError
} = slice.actions;

// ... Actions (async)  
export const loadProfile = () => (dispatch) => {

  const data = session.get();
  const url = "/api/v1/security/profile";
  fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "access_token": data['access_token'],
        "token_type": data['token_type']
      }
    })
    .then(response => response.json())
    .then(data => dispatch(updateProfile(data)))
    .catch(function (error) {
      dispatch(updateProfile({}));
      dispatch(updateError(error.message));
    });
};