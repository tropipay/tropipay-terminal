import { createSlice } from '@reduxjs/toolkit';
import db from './localdb';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    session: null
  },
  reducers: {
    updateSession: (state, action) => {
        if(action.payload) {
            db.set('session', JSON.stringify(action.payload));
            state.session = action.payload;
        }
        else {
            const sessionData = db.get('session');
            try {
              state.session = JSON.parse(sessionData);
            }
            catch(error){
            }
        }
    }
  }
});

export const { updateSession } = slice.actions;

export const selectUser = state => state.auth.user;
export const selectSession = state => state.auth.session;
export const selectToken = state => state.auth.session.token;

export default slice.reducer;