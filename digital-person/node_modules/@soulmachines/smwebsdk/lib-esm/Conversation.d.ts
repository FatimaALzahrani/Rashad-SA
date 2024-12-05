import { ContentCardRawData } from './models/Conversation';
import { SmEvent } from './SmEvent';
import { Logger } from './utils/Logger';
import { ConversationResultResponseBody, RecognizeResultsResponseBody, SpeechMarkerResponseBody, StateResponseBody } from './websocket-message/scene';
import { ConversationState } from './ConversationState';
import { ContentCardFormatter } from './ContentCardFormatter';
/**
 * Stores content cards and conversation state
 *
 * @public
 */
export declare class Conversation {
    private logger;
    private conversationState;
    private contentCardFormatter;
    cardData: Map<string, ContentCardRawData>;
    activeCardIds: Set<string>;
    private _onCardChanged;
    private _autoClearCards;
    constructor(logger?: Logger, conversationState?: ConversationState, contentCardFormatter?: ContentCardFormatter);
    processStateMessage(message: StateResponseBody): void;
    processRecognizeResultsMessage(message: RecognizeResultsResponseBody): void;
    /**
     * A callback function which fires when conversation state changes
     */
    get onConversationStateUpdated(): SmEvent;
    /**
     * Automatically clear active content cards each conversation turn
     */
    set autoClearCards(enabled: boolean);
    /**
     * A callback function which fires when active cards are changed
     */
    get onCardChanged(): SmEvent;
    get activeCards(): ContentCardRawData[];
    /**
     * Handles speech marker messages and updates the active card state
     */
    onSpeechMarker(messageBody: SpeechMarkerResponseBody): void;
    /**
     * Stores content card data contained in conversation result messages
     */
    onConversationResult(messageBody: ConversationResultResponseBody): void;
    /**
     * Clears active card ids and data. Emits a card changed event
     */
    reset(): void;
    /**
     * Clears active card ids. Emits a card changed event
     */
    clearActiveCards(): void;
    private addActiveCardIds;
    private removeActiveCards;
}
//# sourceMappingURL=Conversation.d.ts.map