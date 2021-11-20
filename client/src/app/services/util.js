/**
 * Remove https:// or http:// from url
 * @param url
 * @returns {*}
 */
export const nakedUrl = url => {
    if (url.split('https://').length > 1)
        return url.split('https://')[1];
    else if (url.split('http://').length > 1)
        return url.split('http://')[1];
    else return url;
};