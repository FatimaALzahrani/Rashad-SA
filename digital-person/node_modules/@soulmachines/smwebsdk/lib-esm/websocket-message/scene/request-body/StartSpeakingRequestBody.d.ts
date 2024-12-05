import { PersonaRequestBody } from './PersonaRequestBody';
/**
 * @public
 */
export interface StartSpeakingOptionalArgs {
    /**
     * If not present or null then is assumed true, set to false to prevent this
     * startSpeaking request from being cancelled by a subsequent startSpeaking request.
     */
    canBeInterrupted?: boolean | null;
    filterCommands?: boolean;
}
/**
 * @public
 */
export interface StartSpeakingRequestBody extends PersonaRequestBody {
    text: string;
    context?: string;
    optionalArgs?: StartSpeakingOptionalArgs | null;
}
//# sourceMappingURL=StartSpeakingRequestBody.d.ts.map