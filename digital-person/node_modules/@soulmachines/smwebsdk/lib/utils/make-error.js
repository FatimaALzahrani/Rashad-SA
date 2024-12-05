"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeError = void 0;
function makeError(message, reason) {
    var error = new Error(message);
    error.name = reason;
    return error;
}
exports.makeError = makeError;
//# sourceMappingURL=make-error.js.map