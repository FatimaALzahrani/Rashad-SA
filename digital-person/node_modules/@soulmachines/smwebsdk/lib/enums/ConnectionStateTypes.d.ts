/**
 * @public
 */
export declare enum ConnectionStateTypes {
    Disconnected = "Disconnected",
    SearchingForDigitalPerson = "SearchingForDigitalPerson",
    DownloadingAssets = "DownloadingAssets",
    ConnectingToDigitalPerson = "ConnectingToDigitalPerson",
    Connected = "Connected"
}
/**
 * @public
 */
export interface ConnectionStateData {
    name: ConnectionStateTypes;
    currentStep: number;
    totalSteps: number;
    percentageLoaded: number;
}
//# sourceMappingURL=ConnectionStateTypes.d.ts.map