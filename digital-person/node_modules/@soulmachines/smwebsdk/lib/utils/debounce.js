"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debouncedFunction = void 0;
var debouncedFunction = function (fn, debounceTimeMs) {
    if (debounceTimeMs === void 0) { debounceTimeMs = 500; }
    var debounceTimerId = -1;
    return function () {
        if (debounceTimerId) {
            clearTimeout(debounceTimerId);
        }
        debounceTimerId = setTimeout(function () { return fn(); }, debounceTimeMs);
    };
};
exports.debouncedFunction = debouncedFunction;
//# sourceMappingURL=debounce.js.map