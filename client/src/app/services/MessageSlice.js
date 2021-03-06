import {
    createSlice
} from "@reduxjs/toolkit";

//... Define namespace
const name = "message";

// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        message: null,
        code: null,
        type: null,
        path: null,
        group: null,
    },
    reducers: {
        update: (state, action) => {
            if (typeof (action.payload) === 'object') {
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.type = action.payload.type;
                state.path = action.payload.path;
                state.group = action.payload.group;
            } else {
                state.message = action.payload;
            }
        },
        clean: (state, action) => {
            state.message = null;
            state.code = null;
            state.type = null;
            state.path = null;
            state.group = null;
        }
    }
});

// ... Actions  
const {
    update,
    clean
} = slice.actions;

//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        update,
        clean
    },
    selector: {
        error: (state) => state[name].message,
        code: (state) => state[name].code,
        type: (state) => state[name].type,
        path: (state) => state[name].path,
        group: (state) => state[name].group
    }
}
export default Service;