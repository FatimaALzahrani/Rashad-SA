"use strict";
/**
 * @module smwebsdk
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmEvent = void 0;
/*
 * Copyright 2017-2020 Soul Machines Ltd. All Rights Reserved.
 */
/**
 * An event which can have a set of listeners registered against it using addListener().
 * @public
 */
var SmEvent = /** @class */ (function () {
    function SmEvent() {
        // eslint-disable-next-line @typescript-eslint/ban-types
        this._callbacks = [];
    }
    /**
     * Register a new listener for this event.
     * @param callback - Function called each time the event is triggered.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    SmEvent.prototype.addListener = function (callback) {
        this._callbacks.push(callback);
    };
    /**
     * Deregister a existing listener for this event.
     * @param callback - Previously registered function to be removed. It is a safe no-op to pass
     * a callback which was never registered against this event.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    SmEvent.prototype.removeListener = function (callback) {
        var callbackIndex = this._callbacks.indexOf(callback);
        if (callbackIndex > -1) {
            this._callbacks.splice(callbackIndex, 1);
        }
    };
    /**
     * Trigger the event, calling each registered listener, and passing on any parameters.
     */
    SmEvent.prototype.call = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._callbacks.forEach(function (callback) {
            callback.apply(callback, args);
        }, this);
    };
    return SmEvent;
}());
exports.SmEvent = SmEvent;
//# sourceMappingURL=SmEvent.js.map