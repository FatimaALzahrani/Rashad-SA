"use strict";
/**
 * @module smwebsdk
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
/*
 * Copyright 2017-2020 Soul Machines Ltd. All Rights Reserved.
 */
/**
 * Deferred class
 * @preferred
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.state = 'pending';
        this.fate = 'unresolved';
        this.promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this.promise.then(function () { return (_this.state = 'fulfilled'); }, function () { return (_this.state = 'rejected'); });
    }
    Deferred.prototype.resolve = function (value) {
        if (this.fate === 'resolved') {
            console.error('Deferred cannot be resolved twice');
            return;
        }
        this.fate = 'resolved';
        this._resolve(value);
    };
    Deferred.prototype.reject = function (reason) {
        if (this.fate === 'resolved') {
            console.error('Deferred cannot be resolved twice');
            return;
        }
        this.fate = 'resolved';
        this._reject(reason);
    };
    Deferred.prototype.isResolved = function () {
        return this.fate === 'resolved';
    };
    Deferred.prototype.isPending = function () {
        return this.state === 'pending';
    };
    Deferred.prototype.isFulfilled = function () {
        return this.state === 'fulfilled';
    };
    Deferred.prototype.isRejected = function () {
        return this.state === 'rejected';
    };
    return Deferred;
}());
exports.Deferred = Deferred;
//# sourceMappingURL=Deferred.js.map