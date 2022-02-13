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
    /*
    const data = session.get();
    fetch("/api/v1/payment/reasons", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access_token": data['access_token'],
                "token_type": data['token_type']
            }
        })
        .then(response => response.json())
        .then(data => dispatch(onUpdate(data)))
        .catch(function (error) {
            dispatch(onError(error.message));
        });*/
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