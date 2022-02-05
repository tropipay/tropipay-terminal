import {
    createSlice
} from "@reduxjs/toolkit";
import session from "./session";

//... Define namespace
const name = "profile";
// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        data: null,
        error: null
    },
    reducers: {
        onError: (state, action) => {
            state.error = action.payload;
        },
        onUpdate: (state, action) => {
            if (action.payload) {
                state.data = action.payload;
            }
        }
    }
});

// ... Actions  
const {
    onError,
    onUpdate
} = slice.actions;

// ... Load reasons from server
export const load = () => (dispatch) => {
    const data = session.get();
    fetch("/api/v1/security/profile", {
            method: "POST",
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
        });
};
//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        update: onUpdate,
        load
    },
    selector: {
        data: (state) => state[name].data,
        error: (state) => state[name].error
    }
}
export default Service;