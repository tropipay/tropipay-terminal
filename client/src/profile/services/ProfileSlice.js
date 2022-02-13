import {
    createSlice
} from "@reduxjs/toolkit";
import session from "../../security/services/Session";
import httpReq from '../../app/services/HttpRequest';

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
            session.del()
        },
        onUpdate: (state, action) => {
            if (action.payload) {
                if (action.payload.error) {
                    state.error = action.payload.error;
                    session.del()
                } else {
                    state.data = action.payload;
                }
            }
        },
        onDelete: (state, action) => {
            state.data = null;
            state.error = null;
            session.del();
        }

    }
});

// ... Actions  
const {
    onError,
    onUpdate,
    onDelete
} = slice.actions;

// ... Load reasons from server
export const load = () => (dispatch) => {
    httpReq({
            url: "/api/v1/security/profile",
            method: "POST"
        }, dispatch)
        .then(data => dispatch(onUpdate(data)))
        .catch(error => {
            dispatch(onError(error.message))
        });
};

function getPageURL(user) {
    const urlBase = "https://tropipay.com/comercio/";
    return user && user.shortId ? urlBase + user.shortId : urlBase;
}

//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        update: onUpdate,
        delete: onDelete,
        load
    },
    selector: {
        data: (state) => state[name].data,
        url: (state) => {
            const {
                data
            } = state[name];
            return getPageURL(data);
        },
        error: (state) => state[name].error
    }
}
export default Service;