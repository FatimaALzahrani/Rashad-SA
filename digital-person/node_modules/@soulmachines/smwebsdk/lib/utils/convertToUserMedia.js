"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scene_1 = require("../types/scene");
var convertToUserMedia = function (options, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = scene_1.UserMedia.None; }
    if (!options) {
        return fallbackValue;
    }
    if (options.camera && options.microphone) {
        return scene_1.UserMedia.MicrophoneAndCamera;
    }
    else if (options.camera) {
        return scene_1.UserMedia.Camera;
    }
    else if (options.microphone) {
        return scene_1.UserMedia.Microphone;
    }
    else {
        return scene_1.UserMedia.None;
    }
};
exports.default = convertToUserMedia;
//# sourceMappingURL=convertToUserMedia.js.map