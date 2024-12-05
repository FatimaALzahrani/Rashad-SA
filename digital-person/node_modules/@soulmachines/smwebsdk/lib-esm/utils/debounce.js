export var debouncedFunction = function (fn, debounceTimeMs) {
    if (debounceTimeMs === void 0) { debounceTimeMs = 500; }
    var debounceTimerId = -1;
    return function () {
        if (debounceTimerId) {
            clearTimeout(debounceTimerId);
        }
        debounceTimerId = setTimeout(function () { return fn(); }, debounceTimeMs);
    };
};
//# sourceMappingURL=debounce.js.map