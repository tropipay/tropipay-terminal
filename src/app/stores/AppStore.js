import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../login/LoginSlice';

export default configureStore({
  reducer: {
    counter: loginReducer,
  },
});
