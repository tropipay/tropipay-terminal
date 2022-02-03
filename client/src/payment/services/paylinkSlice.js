import { createSlice } from "@reduxjs/toolkit";

// ... Create Slice
export const slice = createSlice({
    name: "paylink",
    initialState: {
        data: null,
        error: null,
        list: []
    },
    reducers: {
        paylinkError: (state, action) => {
            state.error = action.payload;
        },
        paylinkUpdate: (state, action) => {
            if (action.payload) {
                state.data = action.payload;
            }
        },
        paylinkUpdateList: (state, action) => {
            if (action.payload) {
                state.list = action.payload;
            }
        }
    }
});

// ... Reducer  
export default slice.reducer;

// ... Selectors  
export const selectPaylinkData = (state) => state.paylink.data;
export const selectPaylinkError = (state) => state.paylink.error;
export const selectPaylinkList = (state) => state.paylink.list;

// ... Actions  
export const {
    paylinkError,
    paylinkUpdate,
    paylinkUpdateList
} = slice.actions;

// ... Actions (async)  
export const createPaylink = (data) => (dispatch) => {
    try {
        const url = "/api/v1/payment";
        fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "access_token": data['access_token'],
                    "token_type": data['token_type']
                }
            })
            .then(response => response.json())
            .then(data => dispatch(paylinkUpdate(data)));
    } catch (e) {
        dispatch(paylinkError(e.message));
    }
};

export const listPaylink = (data) => (dispatch) => {
    try {
        const url = "/api/v1/payment";
        fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": data['access_token'],
                    "token_type": data['token_type']
                }
            })
            .then(response => response.json())
            .then(data => dispatch(paylinkUpdateList(data)));
    } catch (e) {
        dispatch(paylinkError(e.message));
    }
};