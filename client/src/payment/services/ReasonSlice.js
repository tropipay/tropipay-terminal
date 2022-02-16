import { createSlice } from "@reduxjs/toolkit";
//import session from "../../security/services/session";
import httpReq from '../../app/services/HttpRequest';

//... Define namespace
const name = "reason";
// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        data: [],
        error: null
    },
    reducers: {
        onError: (state, action) => {
            state.error = action.payload;
        },
        onUpdate: (state, action) => {
            state.data = action.payload;
        }
    }
});

// ... Actions  
const { onError, onUpdate } = slice.actions;

// ... Load reasons from server
const onLoad = () => (dispatch) => {
    httpReq("/api/v1/payment/reasons", dispatch).then(data => dispatch(onUpdate(data)));
};
//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        onError,
        onUpdate,
        onLoad
    },
    selector: {
        data: (state) => state[name].data,
        error: (state) => state[name].error
    }
}
export default Service;