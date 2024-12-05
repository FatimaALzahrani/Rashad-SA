"use strict";
/**
 * @module smwebsdk
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionState = void 0;
var ConnectionStateTypes_1 = require("./enums/ConnectionStateTypes");
var SmEvent_1 = require("./SmEvent");
var TOTAL_CONNECTION_STEPS = Object.keys(ConnectionStateTypes_1.ConnectionStateTypes).length;
/**
 * Determines and stores Connection State.
 *
 * @public
 */
var ConnectionState = /** @class */ (function () {
    function ConnectionState() {
        this._connectionState = {
            name: ConnectionStateTypes_1.ConnectionStateTypes.Disconnected,
            totalSteps: TOTAL_CONNECTION_STEPS,
            currentStep: 0,
            percentageLoaded: 0,
        };
        this._onConnectionStateUpdated = new SmEvent_1.SmEvent();
    }
    ConnectionState.prototype.setConnectionState = function (connectionStateType) {
        // Return if state has not changed
        if (this._connectionState.name === connectionStateType) {
            return;
        }
        var currentStep = Object.keys(ConnectionStateTypes_1.ConnectionStateTypes).indexOf(connectionStateType);
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
        this.setConnectionState(ConnectionStateTypes_1.ConnectionStateTypes.Disconnected);
    };
    return ConnectionState;
}());
exports.ConnectionState = ConnectionState;
//# sourceMappingURL=ConnectionState.js.map