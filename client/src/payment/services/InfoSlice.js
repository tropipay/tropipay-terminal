import { createSlice } from "@reduxjs/toolkit";
import calculator from './Calculator';

// ... Create Slice
export const slice = createSlice({
    name: "info",
    initialState: {
        reason: [],
        fee: null,
        error: null,
        data: {
            delivery: {
                'amount': 0,
                'currency': 'EUR'
            },
            original: {
                'amount': 0,
                'currency': 'EUR'
            },
            rate: 0
        }
    },
    reducers: {
        infoError: (state, action) => {
            state.error = action.payload;
        },
        infoFee: (state, action) => {
            if (action.payload) {
                state.fee = action.payload;
            }
        },
        infoReason: (state, action) => {
            if (action.payload) {
                state.reason = action.payload;
            }
        },
        infoUpdate: (state, action) => {
            if (action.payload) {
                const values = calculator.getInfo(action.payload);
                state.data = values;
            }
        }
    }
});

// ... Reducer  
export default slice.reducer;

// ... Selectors  
export const selectInfoError = (state) => state.info.error;
export const selectInfoFee = (state) => state.info.fee;
export const selectInfoReason = (state) => state.info.fee;

// ... Actions  
export const {
    infoError,
    infoFee,
    infoReason,
    infoUpdate
} = slice.actions;

// ... Actions (async)  
export const loadReason = (data) => (dispatch) => {
    try {
        const url = "/api/v1/payment/reasons";
        fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": data['access_token'],
                    "token_type": data['token_type']
                }
            })
            .then(response => response.json())
            .then(data => dispatch(infoReason(data)));
    } catch (e) {
        dispatch(infoError(e.message));
    }
};

export const loadFee = (data) => (dispatch) => {
    try {
        const url = "/api/v1/payment/fee";
        fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": data['access_token'],
                    "token_type": data['token_type']
                }
            })
            .then(response => response.json())
            .then(data => dispatch(infoFee(data)));
    } catch (e) {
        dispatch(infoError(e.message));
    }
};