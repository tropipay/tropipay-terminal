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
            rate: 1.1, //0.8738967054094205,
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
        share: null
    },
    reducers: {
        onResume: (state, action) => {
            state.resume = calculator.getResume({
                amount: state.data.amount,
                currency: state.data.currency,
                ...state.fee
            });
            console.log('------------------------');
            console.log('onFee.resume', state.resume);
            console.log('onFee.fee', state.fee);
            console.log('onFee.data', state.data);
            console.log('------------------------');
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

                console.log('------------------------');
                console.log('onFee.resume', state.resume);
                console.log('onFee.fee', state.fee);
                console.log('onFee.data', state.data);
                console.log('------------------------');
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
                if(action.payload.rate){
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
                console.log('------------------------');
                console.log('onFee.resume', state.resume);
                console.log('onFee.fee', state.fee);
                console.log('onFee.data', state.data);
                console.log('------------------------');
                state.error = '';
            }
        },
        onShare: (state, action) => {
            state.share = action.payload;
        }
    }
});

//... Actions  
export const {
    onError,
    onUpdate,
    onList,
    onFee,
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
    }, dispatch);//.then(data => dispatch(onUpdate(data)));
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
//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        loadfee: onLoadFee,
        update: onUpdate,
        load: onLoad,
        create: onCreate,
        share: onShare
    },
    selector: {
        data: (state) => state[name].data,
        error: (state) => state[name].error,
        fee: (state) => state[name].fee,
        list: (state) => state[name].list,
        resume: (state) => state[name].resume
    }
}
export default Service;