/**
 * @description Remove https:// or http:// from url
 * @param {STRING} url
 * @returns {STRING}
 */
export const nakedUrl = url => {
    if (!url) return '';
    if (url.split('https://').length > 1)
        return url.split('https://')[1];
    else if (url.split('http://').length > 1)
        return url.split('http://')[1];
    else return url;
};

/**
 * @description check http/https protocol
 * @param {STRING} str 
 * @returns {BOOLEAN}
 */
export function hasHTTP(str) {
    const tmp = (str || "").match(/https{0,1}:\/\/.*/gm);
    return tmp ? true : false;
};

/**
 * @description execute action with params
 * @param {FUNCTION} action
 * @param {ARRAY} action
 * @returns {*}
 */
export function exec(action, params = []) {
    if (action instanceof Function) {
        return action(...params);
    }
    return false;
}
