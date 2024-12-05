/**
 * @module smwebsdk
 */
import { ConnectionStateTypes, } from './enums/ConnectionStateTypes';
import { SmEvent } from './SmEvent';
var TOTAL_CONNECTION_STEPS = Object.keys(ConnectionStateTypes).length;
/**
 * Determines and stores Connection State.
 *
 * @public
 */
var ConnectionState = /** @class */ (function () {
    function ConnectionState() {
        this._connectionState = {
            name: ConnectionStateTypes.Disconnected,
            totalSteps: TOTAL_CONNECTION_STEPS,
            currentStep: 0,
            percentageLoaded: 0,
        };
        this._onConnectionStateUpdated = new SmEvent();
    }
    ConnectionState.prototype.setConnectionState = function (connectionStateType) {
        // Return if state has not changed
        if (this._connectionState.name === connectionStateType) {
            return;
        }
        var currentStep = Object.keys(ConnectionStateTypes).indexOf(connectionStateType);
        var data = {
            name: connectionStateType,
            currentStep: currentStep,
            totalSteps: TOTAL_CONNECTION_STEPS,
            percentageLoaded: (100 / (TOTAL_CONNECTION_STEPS - 1)) * currentStep,
        };
        this._connectionState = data;
        this._onConnectionStateUpdated.call(data);
    };
    ConnectionState.prototype.getConnectionState = function () {
        return this._connectionState;
    };
    Object.defineProperty(ConnectionState.prototype, "onConnectionStateUpdated", {
        get: function () {
            return this._onConnectionStateUpdated;
        },
        enumerable: false,
        configurable: true
    });
    ConnectionState.prototype.reset = function () {
        this.setConnectionState(ConnectionStateTypes.Disconnected);
    };
    return ConnectionState;
}());
export { ConnectionState };
//# sourceMappingURL=ConnectionState.js.map