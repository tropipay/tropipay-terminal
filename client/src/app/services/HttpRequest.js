import srvError from './ErrorSlice';
import session from "../../security/services/session";

function objToStr(data) {
    try {
        if (!data) return '';
        return typeof (data) !== 'string' ? JSON.stringify(data) : data;
    } catch (error) {
        return '';
    }
}

const httpRequest = (payload, dispatch = null) => {
    const ses = session.get() || {};
    payload = typeof (payload) === 'string' ? {
        url: payload
    } : payload;
    const method = (payload && payload.method ? payload.method : 'get').toLowerCase();
    const body = objToStr(payload && payload.data ? payload.data : null);
    const headers = Object.assign({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "access_token": ses['access_token'],
        "token_type": ses['token_type']
    }, payload.headers || {});
    const options = {
        method,
        headers
    };
    if (body && body !== '' && method !== 'get' && method !== 'head') {
        options['body'] = body;
    }
    const throwError = (error, dispatch) => {
        if (error && dispatch instanceof Function) {
            dispatch(srvError.action.update({
                message: error && error.message ? error.message : 'error',
                code: error && error.code ? error.code : 'ERR',
                type: 'request',
                path: payload.url
            }));
        }
    }
    return fetch(payload.url, options)
        .then(response => response.json())
        .then(data => {
            throwError(data.error, dispatch);
            return data;
        })
        .catch(error => {
            throwError(error, dispatch);
            throw error;
        });
}
export default httpRequest;