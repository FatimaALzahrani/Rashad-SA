import { PersonaId } from '../../../models/PersonaId';
/**
 * @public
 */
export interface ConversationResultResponseBody {
    status: number;
    errorMessage?: string;
    personaId: PersonaId;
    input: {
        text: string;
        context?: any;
    };
    output: {
        text: string;
        context: Record<string, string | unknown>;
        provider?: {
            kind: 'watson' | 'dialogflow';
            meta: any;
        };
    };
    provider: {
        kind: string;
        meta: {
            conversation_id?: string;
            dialogflow?: {
                responseId: string;
                queryResult: {
                    allRequiredParamsPresent: boolean;
                    fulfillmentMessages: any[];
                    fulfillmentText: string;
                    intent: {
                        displayName: string;
                        name: string;
                    };
                    intentDetectionConfidence: number;
                    languageCode: string;
                    outputContexts: {
                        lifespanCount: number;
                        name: string;
                        parameters: Record<string, string | unknown>;
                    }[];
                };
            };
        };
    };
}
//# sourceMappingURL=ConversationResultResponseBody.d.ts.map