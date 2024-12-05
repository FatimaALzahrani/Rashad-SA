/**
 * @public
 */
export interface RecognizeResultsResponseBody {
    status: number;
    errorMessage: string;
    results: {
        final: boolean;
        alternatives: {
            confidence: number;
            transcript: string;
        }[];
    }[];
}
//# sourceMappingURL=RecognizeResultsResponseBody.d.ts.map