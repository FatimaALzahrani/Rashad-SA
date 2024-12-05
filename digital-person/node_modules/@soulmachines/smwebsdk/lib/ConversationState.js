"use strict";
/**
 * @module smwebsdk
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationState = void 0;
var ConversationStateTypes_1 = require("./enums/ConversationStateTypes");
var SmEvent_1 = require("./SmEvent");
var SpeechState_1 = require("./websocket-message/enums/SpeechState");
var Logger_1 = require("./utils/Logger");
/**
 * Determines and stores Conversation State.
 *
 * @public
 */
var ConversationState = /** @class */ (function () {
    function ConversationState(logger) {
        if (logger === void 0) { logger = new Logger_1.Logger(); }
        this.logger = logger;
        this._conversationState = ConversationStateTypes_1.ConversationStateTypes.idle;
        this._userActive = false;
        this._onConversationStateUpdated = new SmEvent_1.SmEvent();
    }
    ConversationState.prototype.processStateMessage = function (responseBody) {
        if (responseBody &&
            responseBody.persona &&
            Object.keys(responseBody.persona).length > 0) {
            var dpId = Object.keys(responseBody.persona)[0];
            if (!this._userActive && responseBody.persona[dpId].speechState) {
                var messageSpeechState = responseBody.persona[dpId]
                    .speechState;
                if (messageSpeechState === SpeechState_1.SpeechState.Idle) {
                    this.setSpeechState(ConversationStateTypes_1.ConversationStateTypes.idle);
                }
                else if (messageSpeechState === SpeechState_1.SpeechState.Speaking) {
                    this.setSpeechState(ConversationStateTypes_1.ConversationStateTypes.dpSpeaking);
                }
            }
        }
    };
    ConversationState.prototype.processRecognizeResultsMessage = function (responseBody) {
        this._userActive = true;
        var isErrorMessage = responseBody.status !== 0;
        var isFinal = responseBody.results &&
            responseBody.results.some(function (result) { return result.final; });
        if (isErrorMessage) {
            var errorMessage = typeof responseBody.errorMessage !== 'undefined'
                ? responseBody.errorMessage
                : 'recognizeResults sent back a message with non-zero status but no error message.';
            this.logger.log('error', errorMessage);
        }
        else if (isFinal) {
            this.setSpeechState(ConversationStateTypes_1.ConversationStateTypes.dpProcessing);
        }
        else {
            this.setSpeechState(ConversationStateTypes_1.ConversationStateTypes.userSpeaking);
        }
        this._userActive = false;
    };
    ConversationState.prototype.setSpeechState = function (speechState) {
        if (this._conversationState !== speechState) {
            this._conversationState = speechState;
            this._onConversationStateUpdated.call(this._conversationState);
        }
    };
    ConversationState.prototype.getSpeechState = function () {
        return this._conversationState;
    };
    Object.defineProperty(ConversationState.prototype, "onConversationStateUpdated", {
        get: function () {
            return this._onConversationStateUpdated;
        },
        enumerable: false,
        configurable: true
    });
    ConversationState.prototype.reset = function () {
        this._userActive = false;
        this._conversationState = ConversationStateTypes_1.ConversationStateTypes.idle;
        this._onConversationStateUpdated.call(this._conversationState);
    };
    return ConversationState;
}());
exports.ConversationState = ConversationState;
//# sourceMappingURL=ConversationState.js.map