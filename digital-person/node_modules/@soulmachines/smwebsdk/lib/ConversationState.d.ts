/**
 * @module smwebsdk
 */
import { ConversationStateTypes } from './enums/ConversationStateTypes';
import { SmEvent } from './SmEvent';
import { RecognizeResultsResponseBody } from './websocket-message/scene';
import { StateResponseBody } from './websocket-message/scene/response-body/StateResponseBody';
import { Logger } from './utils/Logger';
/**
 * Determines and stores Conversation State.
 *
 * @public
 */
export declare class ConversationState {
    private logger;
    private _conversationState;
    private _userActive;
    private _onConversationStateUpdated;
    constructor(logger?: Logger);
    processStateMessage(responseBody: StateResponseBody): void;
    processRecognizeResultsMessage(responseBody: RecognizeResultsResponseBody): void;
    private setSpeechState;
    getSpeechState(): ConversationStateTypes;
    get onConversationStateUpdated(): SmEvent;
    reset(): void;
}
//# sourceMappingURL=ConversationState.d.ts.map