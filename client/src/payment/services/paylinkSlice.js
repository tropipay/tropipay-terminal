import {
    createSlice
} from "@reduxjs/toolkit";
import calculator from './Calculator';
import session from "../../security/services/session";

//... Define namespace
const name = "paylink";
//... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        data: {
            advanced: false,
            description: "",
            amount: 0,
            currency: '2',
            concept: "",
            lang: "es",
            reason: "",
            reference: "",

            error: null,
            list: []
        },
        fee: {
            rate: -1,
            service: {
                'tp_fee_fixed': 0,
                'tp_fee_percent': 0,
                'service_fee_fixed': 0,
                'service_fee_percent': 0
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
                state.data = action.payload;
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
        onList: (state, action) => {
            if (action.payload) {
                state.list = action.payload;
                state.error = '';
            }
        },
        onFee: (state, action) => {
            if (action.payload) {
                state.fee.rate = action.payload.rate;
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
        }
    }
});

//... Actions  
export const {
    onError,
    onUpdate,
    onList,
    onFee
} = slice.actions;

//... create a pyment links from server
const onCreate = (data) => (dispatch) => {
    fetch("/api/v1/payment", {
            method: "POST",
            body: JSON.stringify(data),
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
//... load the list of PymentLinks from server
const onLoad = () => (dispatch) => {
    const data = session.get();
    fetch("/api/v1/payment", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access_token": data['access_token'],
                "token_type": data['token_type']
            }
        })
        .then(response => response.json())
        .then(response => dispatch(onList(response)))
        .catch(function (error) {
            dispatch(onError(error.message));
        });
};
//... load fee from server
export const onLoadFee = () => (dispatch) => {
    const data = session.get();
    fetch("/api/v1/payment/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access_token": data['access_token'],
                "token_type": data['token_type']
            }
        })
        .then(response => response.json())
        .then(data => dispatch(onFee(data)))
        .catch(function (error) {
            dispatch(onError(error.message));
        });
};
//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        loadfee: onLoadFee,
        update: onUpdate,
        load: onLoad,
        create: onCreate
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