export function makeError(message, reason) {
    var error = new Error(message);
    error.name = reason;
    return error;
}
//# sourceMappingURL=make-error.js.map