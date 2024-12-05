"use strict";
/**
 * smwebsdk.js creates the global namespace variable _smwebsdk_ to access the API from.
 *
 * ```ts
 * window.smwebsdk
 * ```
 * @module smwebsdk
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogging = exports.DetectCapabilities = exports.smwebsdk = exports.SmWebSdk = exports.userMedia = void 0;
/**
 * Copyright 2017-2020 Soul Machines Ltd. All Rights Reserved.
 */
var Features_1 = require("./Features");
var Persona_1 = require("./Persona");
var Scene_1 = require("./Scene");
var scene_1 = require("./types/scene");
var userMedia;
(function (userMedia) {
    userMedia[userMedia["none"] = 0] = "none";
    userMedia[userMedia["microphone"] = 1] = "microphone";
    userMedia[userMedia["microphoneAndCamera"] = 2] = "microphoneAndCamera";
    userMedia[userMedia["camera"] = 3] = "camera";
})(userMedia = exports.userMedia || (exports.userMedia = {}));
/**
 * SmWebSdk class for legacy compatibility
 * @deprecated - please use the other top level classes such as {@link Scene} or {@link Persona} instead
 */
var SmWebSdk = /** @class */ (function () {
    function SmWebSdk() {
        this.Scene = Scene_1.Scene;
        this.Persona = Persona_1.Persona;
        this.userMedia = {
            none: scene_1.UserMedia.None,
            microphone: scene_1.UserMedia.Microphone,
            microphoneAndCamera: scene_1.UserMedia.MicrophoneAndCamera,
            camera: scene_1.UserMedia.Camera,
        };
        this.DetectCapabilities = function () {
            return new Features_1.Features().detectWebRTCFeatures();
        };
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.setLogging = function (value) { };
    }
    return SmWebSdk;
}());
exports.SmWebSdk = SmWebSdk;
/**
 * @deprecated - please use the other top level classes such as {@link Scene} or {@link Persona} instead
 * @public
 */
exports.smwebsdk = new SmWebSdk();
// This is here purely to coerce the documentation
/**
 * Detect the browser capabilities
 */
function DetectCapabilities() {
    return new Features_1.Features().detectWebRTCFeatures();
}
exports.DetectCapabilities = DetectCapabilities;
// This is here purely to coerce the documentation
/**
 * Set logging for smbwebsdk to enabled or disabled, defaults to enabled
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
function setLogging(value) { }
exports.setLogging = setLogging;
//# sourceMappingURL=SmWebSdk.js.map