import { __read, __spreadArray } from "tslib";
import { SmEvent } from './SmEvent';
import { Logger } from './utils/Logger';
import { SpeechMarkerName } from './websocket-message/scene/response-body/SpeechMarker';
import { ConversationState } from './ConversationState';
import { ContentCardFormatter } from './ContentCardFormatter';
/**
 * Stores content cards and conversation state
 *
 * @public
 */
var Conversation = /** @class */ (function () {
    function Conversation(logger, conversationState, contentCardFormatter) {
        if (logger === void 0) { logger = new Logger(); }
        if (conversationState === void 0) { conversationState = new ConversationState(); }
        if (contentCardFormatter === void 0) { contentCardFormatter = new ContentCardFormatter(); }
        this.logger = logger;
        this.conversationState = conversationState;
        this.contentCardFormatter = contentCardFormatter;
        this._onCardChanged = new SmEvent();
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
        if (messageBody.name === SpeechMarkerName.Showcards) {
            this.addActiveCardIds(cardIds);
        }
        else if (messageBody.name === SpeechMarkerName.Hidecards) {
            this.removeActiveCards(cardIds);
        }
        if (
        // Hide all cards when arg list is empty and hidecards message is received
        cardIds.length === 0 &&
            messageBody.name === SpeechMarkerName.Hidecards) {
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
        this.activeCardIds = new Set(__spreadArray(__spreadArray([], __read(this.activeCardIds), false), __read(cardIds), false));
        this.onCardChanged.call(this.activeCards);
    };
    Conversation.prototype.removeActiveCards = function (cardIds) {
        var _this = this;
        cardIds.forEach(function (cardId) { return _this.activeCardIds.delete(cardId); });
        this.onCardChanged.call(this.activeCards);
    };
    return Conversation;
}());
export { Conversation };
//# sourceMappingURL=Conversation.js.map