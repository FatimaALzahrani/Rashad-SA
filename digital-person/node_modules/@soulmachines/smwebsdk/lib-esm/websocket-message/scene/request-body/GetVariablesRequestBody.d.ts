import { PersonaRequestBody } from './PersonaRequestBody';
/**
 * @public
 */ export interface GetVariablesRequestBody extends PersonaRequestBody {
    names: string[];
    errorTolerant: boolean;
    format?: string;
}
//# sourceMappingURL=GetVariablesRequestBody.d.ts.map