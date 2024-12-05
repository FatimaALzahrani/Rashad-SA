/**
 * @module smwebsdk
 */
import { ConversationStateTypes } from './enums/ConversationStateTypes';
import { SmEvent } from './SmEvent';
import { SpeechState } from './websocket-message/enums/SpeechState';
import { Logger } from './utils/Logger';
/**
 * Determines and stores Conversation State.
 *
 * @public
 */
var ConversationState = /** @class */ (function () {
    function ConversationState(logger) {
        if (logger === void 0) { logger = new Logger(); }
        this.logger = logger;
        this._conversationState = ConversationStateTypes.idle;
        this._userActive = false;
        this._onConversationStateUpdated = new SmEvent();
    }
    ConversationState.prototype.processStateMessage = function (responseBody) {
        if (responseBody &&
            responseBody.persona &&
            Object.keys(responseBody.persona).length > 0) {
            var dpId = Object.keys(responseBody.persona)[0];
            if (!this._userActive && responseBody.persona[dpId].speechState) {
                var messageSpeechState = responseBody.persona[dpId]
                    .speechState;
                if (messageSpeechState === SpeechState.Idle) {
                    this.setSpeechState(ConversationStateTypes.idle);
                }
                else if (messageSpeechState === SpeechState.Speaking) {
                    this.setSpeechState(ConversationStateTypes.dpSpeaking);
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
            this.setSpeechState(ConversationStateTypes.dpProcessing);
        }
        else {
            this.setSpeechState(ConversationStateTypes.userSpeaking);
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
        this._conversationState = ConversationStateTypes.idle;
        this._onConversationStateUpdated.call(this._conversationState);
    };
    return ConversationState;
}());
export { ConversationState };
//# sourceMappingURL=ConversationState.js.map