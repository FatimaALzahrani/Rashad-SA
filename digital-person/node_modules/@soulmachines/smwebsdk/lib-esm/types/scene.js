export * from '../websocket-message/scene';
export * from '../models/Conversation';
/**
 * Represents the different combinations of User Media that are supported
 * @public
 */
export var UserMedia;
(function (UserMedia) {
    UserMedia[UserMedia["None"] = 0] = "None";
    UserMedia[UserMedia["Microphone"] = 1] = "Microphone";
    UserMedia[UserMedia["MicrophoneAndCamera"] = 2] = "MicrophoneAndCamera";
    UserMedia[UserMedia["Camera"] = 3] = "Camera";
})(UserMedia || (UserMedia = {}));
/**
 * @public
 */
export var NLPIntent;
(function (NLPIntent) {
    NLPIntent["PAGE_METADATA"] = "PAGE_METADATA";
})(NLPIntent || (NLPIntent = {}));
//# sourceMappingURL=scene.js.map