/**
 * Replace "wss://" at the front of the URL with "https://".
 * @param uri the uri to convert
 * @returns the converted uri
 */
export declare function convertWssToHttps(uri: string): string;
/**
 * Removes the path and search parameters from the url.
 * @param url - The url to be sanitized.
 * @returns The sanitized url.
 */
export declare function getUrlHost(url: string): string | undefined;
//# sourceMappingURL=utils.d.ts.map