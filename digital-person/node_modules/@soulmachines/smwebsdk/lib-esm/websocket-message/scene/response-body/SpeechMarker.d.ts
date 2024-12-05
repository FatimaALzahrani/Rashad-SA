import { PersonaId } from '../../../models/PersonaId';
export declare enum SpeechMarkerName {
    Showcards = "showcards",
    Hidecards = "hidecards",
    Feature = "feature",
    Marker = "marker"
}
export interface SpeechMarker {
    name: SpeechMarkerName.Showcards | SpeechMarkerName.Hidecards | SpeechMarkerName.Feature | SpeechMarkerName.Marker;
    arguments: string[];
    personaId?: string;
}
/**
 * @public
 */
export interface SpeechMarkerResponseBody {
    personaId: PersonaId;
    name: string;
    arguments: string[];
}
//# sourceMappingURL=SpeechMarker.d.ts.map