import { configureStore } from '@reduxjs/toolkit';

import Paylink from '../../payment/services/PaylinkSlice';
import Reason from '../../payment/services/ReasonSlice';
import Auth from '../../security/services/AuthSlice';
import Profile from '../../profile/services/ProfileSlice';
import MessageSlice from '../services/MessageSlice';
import Movement from '../../movement/services/MovementSlice';

export default configureStore({
  reducer: {
    [Auth.name]: Auth.reducer,
    [Profile.name]: Profile.reducer,
    [Paylink.name]: Paylink.reducer,
    [Reason.name]: Reason.reducer,
    [Movement.name]: Movement.reducer,
    [MessageSlice.name]: MessageSlice.reducer
  }
});
