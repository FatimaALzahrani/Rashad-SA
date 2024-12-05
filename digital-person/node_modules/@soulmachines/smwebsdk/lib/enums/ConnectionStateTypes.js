"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionStateTypes = void 0;
/**
 * @public
 */
var ConnectionStateTypes;
(function (ConnectionStateTypes) {
    ConnectionStateTypes["Disconnected"] = "Disconnected";
    //websocket open - searching for an available DP scene, may require queuing
    ConnectionStateTypes["SearchingForDigitalPerson"] = "SearchingForDigitalPerson";
    //established - scene is available/found, downloading/preparing DP assets on the server
    ConnectionStateTypes["DownloadingAssets"] = "DownloadingAssets";
    //accepted - DP is starting / forming webrtc connection
    ConnectionStateTypes["ConnectingToDigitalPerson"] = "ConnectingToDigitalPerson";
    //connected - DP is started and ready the webrtc session has connected
    ConnectionStateTypes["Connected"] = "Connected";
})(ConnectionStateTypes = exports.ConnectionStateTypes || (exports.ConnectionStateTypes = {}));
//# sourceMappingURL=ConnectionStateTypes.js.map