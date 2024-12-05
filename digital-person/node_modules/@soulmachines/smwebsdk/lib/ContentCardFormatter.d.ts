import { ContentCardFormattedData } from './models/Conversation';
import { ConversationResultResponseBody } from './websocket-message/scene';
/**
 * Formats content card data in a consistent structure
 *
 * @public
 */
export declare class ContentCardFormatter {
    /**
     * Format different NLP content cards into a consistent structure
     */
    format(body: ConversationResultResponseBody): ContentCardFormattedData[];
    private formatLegacyDialogflow;
    private formatContextData;
    private allowedIds;
    private formatCardData;
}
//# sourceMappingURL=ContentCardFormatter.d.ts.map