import {
    createSlice
} from "@reduxjs/toolkit";
//import session from "../../security/services/session";
import httpReq from '../../app/services/HttpRequest';

//... Define namespace
const name = "movement";
// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        list: [],
        loading: false,
        data: null,
        error: null,
        query: ""
    },
    reducers: {
        onError: (state, action) => {
            state.error = action.payload;
        },
        onUpdate: (state, action) => {
            state.query = action.payload.query;
            state.data = action.payload;
            state.loading = false;
            state.list = state.list.concat(state.data.rows);
        },
        onLoading: (state, action) => {
            state.loading = action.payload;
        },
        onList: (state, action) => {
            state.list = action.payload;
        }
    }
});

// ... Actions  
const {
    onList,
    onError,
    onUpdate,
    onLoading
} = slice.actions;

// ... Load movements from server
const onLoad = (offset = 0, limit = 10, query = "") => (dispatch) => {
    dispatch(onLoading(true));
    httpReq(`/api/v1/movement?offset=${offset}&limit=${limit}&criteria=${query}`, dispatch)
        .then(data => dispatch(onUpdate({...data, query})));
};

const onSearch = (offset = 0, limit = 10, criteria = "") => (dispatch) => {
    dispatch(onList([]));
    dispatch(onLoad(offset, limit, criteria));
}
//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    action: {
        error: onError,
        update: onUpdate,
        load: onLoad,
        search: onSearch
    },
    selector: {
        list: (state) => state[name].list,
        data: (state) => state[name].data,
        error: (state) => state[name].error,
        limit: (state) => state[name].data ? state[name].data.limit : 0,
        offset: (state) => state[name].data ? state[name].data.offset : 0,
        isLoading: (state) => state[name].loading,
        query: (state) => state[name].query,
        isEmpty: (state) => {
            const model = state[name];
            if (!model.data) return false;
            return model.data.rows && model.data.rows.length < 1;
        },
        completed: (state) => {
            const model = state[name];
            if (!model.data) return false;
            const limit = parseInt(model.data.limit);
            const offset = parseInt(model.data.offset);
            const count = parseInt(model.data.count);
            return (limit + offset) >= count;
        }
    },
    default: {
        offset: 0,
        limit: 10
    }
}
export default Service;