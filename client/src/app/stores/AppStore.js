import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../demo/DemoSlice';

export default configureStore({
  reducer: {
    counter: loginReducer,
  },
});
