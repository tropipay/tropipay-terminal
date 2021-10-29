import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../demo/DemoSlice';
import authReducer from '../../security/services/AuthSlice';

export default configureStore({
  reducer: {
    counter: loginReducer,
    auth: authReducer
  },
});
