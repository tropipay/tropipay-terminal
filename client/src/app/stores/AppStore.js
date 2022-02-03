import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../security/services/AuthSlice';
import paylinkReducer from '../../payment/services/PaylinkSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    paylink: paylinkReducer
  },
});
