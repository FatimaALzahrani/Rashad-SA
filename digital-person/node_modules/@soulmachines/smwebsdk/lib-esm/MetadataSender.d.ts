import { Scene } from './Scene';
export declare class MetadataSender {
    private scene;
    private _previousUrl;
    private _observer;
    constructor(scene: Scene);
    observeUrlChanges(): void;
    disconnect(): void;
    send(): void;
    private observeDocumentChanges;
}
//# sourceMappingURL=MetadataSender.d.ts.map