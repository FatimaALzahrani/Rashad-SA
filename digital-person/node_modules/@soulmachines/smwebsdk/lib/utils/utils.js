"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlHost = exports.convertWssToHttps = void 0;
/**
 * Replace "wss://" at the front of the URL with "https://".
 * @param uri the uri to convert
 * @returns the converted uri
 */
function convertWssToHttps(uri) {
    return uri.replace(/^wss:\/\//, 'https://');
}
exports.convertWssToHttps = convertWssToHttps;
/**
 * Removes the path and search parameters from the url.
 * @param url - The url to be sanitized.
 * @returns The sanitized url.
 */
function getUrlHost(url) {
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
exports.getUrlHost = getUrlHost;
//# sourceMappingURL=utils.js.map