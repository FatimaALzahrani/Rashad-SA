"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneResponseError = void 0;
var tslib_1 = require("tslib");
/**
 * @public
 */
var SceneResponseError = /** @class */ (function (_super) {
    tslib_1.__extends(SceneResponseError, _super);
    function SceneResponseError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.requestName = '';
        _this.status = 0;
        return _this;
    }
    Object.defineProperty(SceneResponseError.prototype, "message", {
        get: function () {
            return "Scene response failed, status: ".concat(this.status);
        },
        enumerable: false,
        configurable: true
    });
    return SceneResponseError;
}(Error));
exports.SceneResponseError = SceneResponseError;
//# sourceMappingURL=SceneResponseError.js.map