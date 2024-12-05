import { __read, __spreadArray } from "tslib";
var logLevels = ['debug', 'log', 'warn', 'error'];
var Logger = /** @class */ (function () {
    function Logger(minLogLevel, isEnabled) {
        if (minLogLevel === void 0) { minLogLevel = 'log'; }
        if (isEnabled === void 0) { isEnabled = true; }
        this.isEnabled = isEnabled;
        this.availableLogLevels = [];
        this._minLogLevel = 'log';
        this.setMinLogLevel(minLogLevel);
    }
    Logger.prototype.log = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isEnabled && this.availableLogLevels.includes(type)) {
            console[type].apply(console, __spreadArray([], __read(args), false));
        }
    };
    Logger.prototype.enableLogging = function (enable) {
        this.isEnabled = enable;
    };
    Logger.prototype.getMinLogLevel = function () {
        return this._minLogLevel;
    };
    Logger.prototype.setMinLogLevel = function (level) {
        var index = logLevels.indexOf(level);
        this._minLogLevel = level;
        this.availableLogLevels = logLevels.slice(index);
    };
    return Logger;
}());
export { Logger };
//# sourceMappingURL=Logger.js.map