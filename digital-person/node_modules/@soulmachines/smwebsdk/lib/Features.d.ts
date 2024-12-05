/**
 * @module smwebsdk
 */
/**
 * Features class
 *
 * An instance of this class can also be created by the convenience API function DetectCapabilities()
 *
 * ```ts
 * var features  = window.smwebsdk.DetectCapabilities();
 * ```
 *
 * which also calls the detectWebRTCFeatures() method.
 */
export declare class Features {
    private _hasMicrophone;
    private _hasCamera;
    private _isAndroid;
    private _isBrowserSupported;
    private _isEdge;
    private _isIos;
    constructor();
    private detectEdge;
    private detectAndroid;
    private detectIos;
    private userAgentMatches;
    detectWebRTCFeatures(): Promise<Features>;
    get hasMicrophone(): boolean;
    get hasCamera(): boolean;
    get isAndroid(): boolean;
    get isBrowserSupported(): boolean;
    get isEdge(): boolean;
    get isIos(): boolean;
}
//# sourceMappingURL=Features.d.ts.map