import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'stepper',
  initialState: {
    index: 0,
  },
  reducers: {
    next: state => {
      state.index += 1;
    },
    back: state => {
      state.index -= 1;
    },
    go: (state, action) => {
      state.index = action.payload;
    }
  },
});

export const { next, back, go } = slice.actions;

export const selectIndex = (state) => state.stepper.index;

export default slice.reducer;