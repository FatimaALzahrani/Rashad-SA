import { UserMedia } from '../types/scene';
var convertToUserMedia = function (options, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = UserMedia.None; }
    if (!options) {
        return fallbackValue;
    }
    if (options.camera && options.microphone) {
        return UserMedia.MicrophoneAndCamera;
    }
    else if (options.camera) {
        return UserMedia.Camera;
    }
    else if (options.microphone) {
        return UserMedia.Microphone;
    }
    else {
        return UserMedia.None;
    }
};
export default convertToUserMedia;
//# sourceMappingURL=convertToUserMedia.js.map