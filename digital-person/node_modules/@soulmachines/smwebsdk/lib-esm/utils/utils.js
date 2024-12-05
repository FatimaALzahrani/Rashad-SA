/**
 * Replace "wss://" at the front of the URL with "https://".
 * @param uri the uri to convert
 * @returns the converted uri
 */
export function convertWssToHttps(uri) {
    return uri.replace(/^wss:\/\//, 'https://');
}
/**
 * Removes the path and search parameters from the url.
 * @param url - The url to be sanitized.
 * @returns The sanitized url.
 */
export function getUrlHost(url) {
    try {
        if (!url) {
            return undefined;
        }
        var outUrl = new URL(url);
        // remove path and query params
        outUrl.pathname = '';
        outUrl.search = '';
        return outUrl.toString();
    }
    catch (e) {
        return undefined;
    }
}
//# sourceMappingURL=utils.js.map