import srvError from './ErrorSlice';
import session from "../../security/services/session";

function objToStr(data) {
    try {
        if(!data) return '';
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
    return fetch(payload.url, options)
        .then(response => response.json())
        .then(data => {
            if (data.error && dispatch instanceof Function) {
                dispatch(srvError.action.update({
                    message: data.error.message ? data.error.message : 'error',
                    code: data.error.code ? data.error.code : 'ERR',
                    type: 'request',
                    path: payload.url
                }));
            }
            return data;
        })
        .catch(function (error) {
            if (dispatch instanceof Function) {
                dispatch(srvError.action.update({
                    message: error && error.message ? error.message : 'error',
                    code: error && error.code ? error.code : 'ERR',
                    type: 'request',
                    path: payload.url
                }));
            }
            throw error;
        });
}
export default httpRequest;