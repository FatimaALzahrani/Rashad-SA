import { PersonaRequestBody } from './PersonaRequestBody';
/**
 * @public
 */
export interface AnimateToNamedCameraRequestBody extends PersonaRequestBody {
    cameraName: string;
    time: number;
    orbitDegX: number;
    orbitDegY: number;
    panDeg: number;
    tiltDeg: number;
}
//# sourceMappingURL=AnimateToNamedCameraRequestBody.d.ts.map