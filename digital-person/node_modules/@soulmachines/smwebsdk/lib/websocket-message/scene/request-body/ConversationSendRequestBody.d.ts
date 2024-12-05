import { PersonaRequestBody } from './PersonaRequestBody';
import { VariablesModel } from '../../../models/VariablesModel';
/**
 * @public
 */
export interface ConversationSendRequestBody extends PersonaRequestBody {
    text: string;
    variables?: VariablesModel;
    optionalArgs?: Record<string, unknown>;
}
//# sourceMappingURL=ConversationSendRequestBody.d.ts.map