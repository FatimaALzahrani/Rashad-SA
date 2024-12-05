"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
var tslib_1 = require("tslib");
var SmEvent_1 = require("./SmEvent");
var Logger_1 = require("./utils/Logger");
var SpeechMarker_1 = require("./websocket-message/scene/response-body/SpeechMarker");
var ConversationState_1 = require("./ConversationState");
var ContentCardFormatter_1 = require("./ContentCardFormatter");
/**
 * Stores content cards and conversation state
 *
 * @public
 */
var Conversation = /** @class */ (function () {
    function Conversation(logger, conversationState, contentCardFormatter) {
        if (logger === void 0) { logger = new Logger_1.Logger(); }
        if (conversationState === void 0) { conversationState = new ConversationState_1.ConversationState(); }
        if (contentCardFormatter === void 0) { contentCardFormatter = new ContentCardFormatter_1.ContentCardFormatter(); }
        this.logger = logger;
        this.conversationState = conversationState;
        this.contentCardFormatter = contentCardFormatter;
        this._onCardChanged = new SmEvent_1.SmEvent();
        this._autoClearCards = false;
        this.cardData = new Map();
        this.activeCardIds = new Set();
    }
    Conversation.prototype.processStateMessage = function (message) {
        this.conversationState.processStateMessage(message);
    };
    Conversation.prototype.processRecognizeResultsMessage = function (message) {
        this.conversationState.processRecognizeResultsMessage(message);
    };
    Object.defineProperty(Conversation.prototype, "onConversationStateUpdated", {
        /**
         * A callback function which fires when conversation state changes
         */
        get: function () {
            return this.conversationState.onConversationStateUpdated;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conversation.prototype, "autoClearCards", {
        /**
         * Automatically clear active content cards each conversation turn
         */
        set: function (enabled) {
            this._autoClearCards = enabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conversation.prototype, "onCardChanged", {
        /**
         * A callback function which fires when active cards are changed
         */
        get: function () {
            return this._onCardChanged;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conversation.prototype, "activeCards", {
        get: function () {
            var _this = this;
            var activeCardInfo = [];
            this.activeCardIds.forEach(function (id) {
                var data = _this.cardData.get(id);
                if (data) {
                    activeCardInfo.push(data);
                }
                else {
                    _this.logger.log('error', "card data for ".concat(id, " does not exist"));
                }
            });
            return activeCardInfo;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Handles speech marker messages and updates the active card state
     */
    Conversation.prototype.onSpeechMarker = function (messageBody) {
        var cardIds = messageBody.arguments;
        if (messageBody.name === SpeechMarker_1.SpeechMarkerName.Showcards) {
            this.addActiveCardIds(cardIds);
        }
        else if (messageBody.name === SpeechMarker_1.SpeechMarkerName.Hidecards) {
            this.removeActiveCards(cardIds);
        }
        if (
        // Hide all cards when arg list is empty and hidecards message is received
        cardIds.length === 0 &&
            messageBody.name === SpeechMarker_1.SpeechMarkerName.Hidecards) {
            this.clearActiveCards();
        }
    };
    /**
     * Stores content card data contained in conversation result messages
     */
    Conversation.prototype.onConversationResult = function (messageBody) {
        var _this = this;
        var cards = this.contentCardFormatter.format(messageBody);
        if (this._autoClearCards) {
            this.clearActiveCards();
        }
        cards.map(function (_a) {
            var id = _a.id, data = _a.data;
            _this.cardData.set(id, data);
        });
    };
    /**
     * Clears active card ids and data. Emits a card changed event
     */
    Conversation.prototype.reset = function () {
        this.clearActiveCards();
        this.cardData.clear();
        this.conversationState.reset();
    };
    /**
     * Clears active card ids. Emits a card changed event
     */
    Conversation.prototype.clearActiveCards = function () {
        this.activeCardIds.clear();
        this.onCardChanged.call(this.activeCards);
    };
    Conversation.prototype.addActiveCardIds = function (cardIds) {
        this.activeCardIds = new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(this.activeCardIds), false), tslib_1.__read(cardIds), false));
        this.onCardChanged.call(this.activeCards);
    };
    Conversation.prototype.removeActiveCards = function (cardIds) {
        var _this = this;
        cardIds.forEach(function (cardId) { return _this.activeCardIds.delete(cardId); });
        this.onCardChanged.call(this.activeCards);
    };
    return Conversation;
}());
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map