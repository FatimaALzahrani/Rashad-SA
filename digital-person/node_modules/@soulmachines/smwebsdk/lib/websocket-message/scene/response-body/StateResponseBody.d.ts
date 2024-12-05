import { ConfigurationModel } from '../../../models/index';
import { SpeechState } from '../../enums/SpeechState';
export declare enum FeatureFlag {
    UI_CONTENT_AWARENESS = "UI_CONTENT_AWARENESS",
    UI_SDK_CAMERA_CONTROL = "UI_SDK_CAMERA_CONTROL"
}
/**
 * @public
 */
export interface StateResponseBody {
    scene?: {
        featureFlags?: FeatureFlag[];
        runtime?: string;
        runtimeBuild?: string;
        sceneId?: string;
        sdkVersion?: string;
        [key: string]: unknown;
    };
    configuration?: ConfigurationModel;
    persona?: {
        [index: string]: {
            conversationProvider?: string;
            lastPreset?: string;
            users?: Record<string, unknown>[];
            speechState?: SpeechState;
            currentSpeech?: string;
            currentSpeechEML?: string;
            currentSpeechContext?: string;
            [index: string]: any;
        };
    };
    recognizing?: boolean;
    session?: {
        sessionId: string;
        state: string;
        userInfo?: string;
    };
}
//# sourceMappingURL=StateResponseBody.d.ts.map