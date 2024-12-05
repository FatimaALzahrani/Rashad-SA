import { __extends } from "tslib";
/**
 * @public
 */
var SceneResponseError = /** @class */ (function (_super) {
    __extends(SceneResponseError, _super);
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
export { SceneResponseError };
//# sourceMappingURL=SceneResponseError.js.map