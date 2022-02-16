import {
    createSlice
} from "@reduxjs/toolkit";
import calculator from './Calculator';
//import session from "../../security/services/session";
import httpReq from '../../app/services/HttpRequest';

//... Define namespace
const name = "paylink";
//... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        data: {
            advanced: false,
            description: "",
            amount: "0.0",
            currency: '2',
            concept: "",
            lang: "es",
            reason: "",
            reference: "",

            error: null,
            list: []
        },
        fee: {
            loaded: false,
            rate: 1.1,
            service: {
                'tp_fee_fixed': 50,
                'tp_fee_percent': 300,
                'service_fee_fixed': 0,
                'service_fee_percent': 45
            }
        },
        resume: {
            delivery: {
                'amount': 0,
                'currency': 'EUR'
            },
            original: {
                'amount': 0,
                'currency': 'EUR'
            },
            cost: {
                'amount': 0,
                'currency': 'EUR'
            },
            current: {
                'amount': 0,
                'currency': 'EUR'
            },
            rate: 0
        },
        share: null,
        country: null,
        amountmin: 16
    },
    reducers: {
        onResume: (state, action) => {
            state.resume = calculator.getResume({
                amount: state.data.amount,
                currency: state.data.currency,
                ...state.fee
            });
        },
        onError: (state, action) => {
            state.error = action.payload;
        },
        onUpdate: (state, action) => {
            if (action.payload) {
                if (action.payload.error) {

                } else {
                    state.data = action.payload;
                    state.resume = calculator.getResume({
                        amount: state.data.amount,
                        currency: state.data.currency,
                        ...state.fee
                    });
                }
                state.error = '';
            }
        },
        onList: (state, action) => {
            if (action.payload) {
                state.list = action.payload;
                state.error = '';
            }
        },
        onFee: (state, action) => {
            if (action.payload) {
                if (action.payload.rate) {
                    state.fee.rate = action.payload.rate;
                    state.fee.loaded = true;
                }
                if (action.payload.service) {
                    state.fee.service = action.payload.service;
                }
                state.resume = calculator.getResume({
                    amount: state.data.amount,
                    currency: state.data.currency,
                    ...state.fee
                });
                state.error = '';
            }
        },
        onShare: (state, action) => {
            state.share = action.payload;
        },
        onCountry(state, action) {
            state.country = action.payload.data;
        },
        onAmountMin(state, action) {
            state.amountmin = action.payload.data.amountmin;
        }
    }
});

//... Actions  
export const {
    onError,
    onUpdate,
    onList,
    onFee,
    onCountry,
    onAmountMin
} = slice.actions;

//... create a pyment links from server
const onCreate = (payload) => (dispatch) => {
    httpReq({
        url: "/api/v1/payment",
        method: "POST",
        data: payload
    }, dispatch).then(data => dispatch(onUpdate(data)));
};
//... create a pyment links from server
const onShare = (payload) => (dispatch) => {
    httpReq({
        url: "/api/v1/payment/share",
        method: "POST",
        data: payload
    }, dispatch); //.then(data => dispatch(onUpdate(data)));
};
//... load the list of PymentLinks from server
const onLoad = () => (dispatch) => {
    httpReq("/api/v1/payment", dispatch).then(data => dispatch(onList(data)));
};
//... load fee from server
export const onLoadFee = () => (dispatch) => {
    httpReq({
        url: "/api/v1/payment/info",
        method: "POST"
    }, dispatch).then(data => dispatch(onFee(data)));
};
//... load country conde list 
export const onCountryConde = () => (dispatch) => {
    httpReq({
        url: "/api/v1/payment/countrycode",
        method: "GET"
    }, dispatch).then(data => dispatch(onCountry(data)));
};
//... load service amountmin 
export const onLoadAmountMin = () => (dispatch) => {
    httpReq({
        url: "/api/v1/payment/amountmin",
        method: "GET"
    }, dispatch).then(data => dispatch(onAmountMin(data)));
};
//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        loadfee: onLoadFee,
        update: onUpdate,
        load: onLoad,
        loadAmountMin: onLoadAmountMin,
        create: onCreate,
        share: onShare,
        loadCountryConde: onCountryConde
    },
    selector: {
        data: (state) => state[name].data,
        error: (state) => state[name].error,
        fee: (state) => state[name].fee,
        list: (state) => state[name].list,
        resume: (state) => state[name].resume,
        amountmin: (state) => state[name].amountmin,
        country: (state) => {
            const country = state[name].country;
            return country && country.rows ? country.rows : [];
        }
    }
}
export default Service;