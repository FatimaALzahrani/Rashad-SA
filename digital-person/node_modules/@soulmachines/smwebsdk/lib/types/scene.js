"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NLPIntent = exports.UserMedia = void 0;
var tslib_1 = require("tslib");
tslib_1.__exportStar(require("../websocket-message/scene"), exports);
tslib_1.__exportStar(require("../models/Conversation"), exports);
/**
 * Represents the different combinations of User Media that are supported
 * @public
 */
var UserMedia;
(function (UserMedia) {
    UserMedia[UserMedia["None"] = 0] = "None";
    UserMedia[UserMedia["Microphone"] = 1] = "Microphone";
    UserMedia[UserMedia["MicrophoneAndCamera"] = 2] = "MicrophoneAndCamera";
    UserMedia[UserMedia["Camera"] = 3] = "Camera";
})(UserMedia = exports.UserMedia || (exports.UserMedia = {}));
/**
 * @public
 */
var NLPIntent;
(function (NLPIntent) {
    NLPIntent["PAGE_METADATA"] = "PAGE_METADATA";
})(NLPIntent = exports.NLPIntent || (exports.NLPIntent = {}));
//# sourceMappingURL=scene.js.map