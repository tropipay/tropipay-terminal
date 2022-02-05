import {
  createSlice
} from "@reduxjs/toolkit";
import session from "./session";

//... Define namespace
const name = "auth";
// ... Create Slice
export const slice = createSlice({
  name,
  initialState: {
    data: {},
    error: null
  },
  reducers: {
    onError: (state, action) => {
      state.error = action.payload;
      state.data = {};
      session.del();
    },
    onUpdate: (state, action) => {
      if (action.payload) {
        session.set(action.payload);
        state.data = action.payload;
      } else {
        state.data = session.get();
      }
    }
  },
});

// ... Actions  
const {
  onUpdate,
  onError
} = slice.actions;

//... Export the slice as a service
const Service = {
  name,
  reducer: slice.reducer,
  action: {
      error: onError,
      update: onUpdate
  },
  selector: {
    data: (state) => state[name].daya,
    token: (state) => state[name].data.token,
    error: (state) => state[name].error
  }
}
export default Service;