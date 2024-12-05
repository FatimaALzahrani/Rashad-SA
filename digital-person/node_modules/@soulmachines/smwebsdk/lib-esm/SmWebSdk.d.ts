/**
 * smwebsdk.js creates the global namespace variable _smwebsdk_ to access the API from.
 *
 * ```ts
 * window.smwebsdk
 * ```
 * @module smwebsdk
 * @preferred
 */
/**
 * Copyright 2017-2020 Soul Machines Ltd. All Rights Reserved.
 */
import { Features } from './Features';
import { Persona } from './Persona';
import { Scene } from './Scene';
import { UserMedia as SessionUserMedia } from './types/scene';
export declare enum userMedia {
    none = 0,
    microphone = 1,
    microphoneAndCamera = 2,
    camera = 3
}
/**
 * SmWebSdk class for legacy compatibility
 * @deprecated - please use the other top level classes such as {@link Scene} or {@link Persona} instead
 */
export declare class SmWebSdk {
    Scene: typeof Scene;
    Persona: typeof Persona;
    DetectCapabilities: Function;
    userMedia: {
        none: SessionUserMedia;
        microphone: SessionUserMedia;
        microphoneAndCamera: SessionUserMedia;
        camera: SessionUserMedia;
    };
    setLogging: Function;
    constructor();
}
/**
 * @deprecated - please use the other top level classes such as {@link Scene} or {@link Persona} instead
 * @public
 */
export declare const smwebsdk: SmWebSdk;
/**
 * Detect the browser capabilities
 */
export declare function DetectCapabilities(): Promise<Features>;
/**
 * Set logging for smbwebsdk to enabled or disabled, defaults to enabled
 */
export declare function setLogging(value: boolean): void;
//# sourceMappingURL=SmWebSdk.d.ts.map