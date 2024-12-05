/**
 * smwebsdk.js creates the global namespace variable _smwebsdk_ to access the API from.
 *
 * ```ts
 * window.smwebsdk
 * ```
 * @module smwebsdk
 * @preferred
 */
/**
 * Copyright 2017-2020 Soul Machines Ltd. All Rights Reserved.
 */
import { Features } from './Features';
import { Persona } from './Persona';
import { Scene } from './Scene';
import { UserMedia as SessionUserMedia } from './types/scene';
export var userMedia;
(function (userMedia) {
    userMedia[userMedia["none"] = 0] = "none";
    userMedia[userMedia["microphone"] = 1] = "microphone";
    userMedia[userMedia["microphoneAndCamera"] = 2] = "microphoneAndCamera";
    userMedia[userMedia["camera"] = 3] = "camera";
})(userMedia || (userMedia = {}));
/**
 * SmWebSdk class for legacy compatibility
 * @deprecated - please use the other top level classes such as {@link Scene} or {@link Persona} instead
 */
var SmWebSdk = /** @class */ (function () {
    function SmWebSdk() {
        this.Scene = Scene;
        this.Persona = Persona;
        this.userMedia = {
            none: SessionUserMedia.None,
            microphone: SessionUserMedia.Microphone,
            microphoneAndCamera: SessionUserMedia.MicrophoneAndCamera,
            camera: SessionUserMedia.Camera,
        };
        this.DetectCapabilities = function () {
            return new Features().detectWebRTCFeatures();
        };
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.setLogging = function (value) { };
    }
    return SmWebSdk;
}());
export { SmWebSdk };
/**
 * @deprecated - please use the other top level classes such as {@link Scene} or {@link Persona} instead
 * @public
 */
export var smwebsdk = new SmWebSdk();
// This is here purely to coerce the documentation
/**
 * Detect the browser capabilities
 */
export function DetectCapabilities() {
    return new Features().detectWebRTCFeatures();
}
// This is here purely to coerce the documentation
/**
 * Set logging for smbwebsdk to enabled or disabled, defaults to enabled
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function setLogging(value) { }
//# sourceMappingURL=SmWebSdk.js.map