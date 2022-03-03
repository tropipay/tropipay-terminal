import { createSlice } from "@reduxjs/toolkit";
import httpReq from '../../app/services/HttpRequest';

//... Define namespace
const name = "reason";

//... Define Dependencies Scope
const dependencies = {};

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

//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    setDependency: (dispatch, useSelector) => {
        dependencies.dispatch = dispatch instanceof Function ? dispatch() : dispatch;
        dependencies.useSelector = useSelector;
    },
    action: {
        update: (data) => dependencies.dispatch(onUpdate(data)),
        load: () => dependencies.dispatch((dispatch) => {
            // ... Load reasons from server
            httpReq("/api/v1/payment/reasons", dispatch).then(data => dispatch(onUpdate(data)));
        })
    },
    selector: {
        data:  () => dependencies.useSelector((state) => state[name].data),
        error: () => dependencies.useSelector((state) => state[name].error)
    }
}
export default Service;