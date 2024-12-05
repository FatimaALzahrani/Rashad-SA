"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentCardFormatter = void 0;
var tslib_1 = require("tslib");
/**
 * Formats content card data in a consistent structure
 *
 * @public
 */
var ContentCardFormatter = /** @class */ (function () {
    function ContentCardFormatter() {
    }
    /**
     * Format different NLP content cards into a consistent structure
     */
    ContentCardFormatter.prototype.format = function (body) {
        var _a;
        var fullfillments = (_a = body.provider.meta.dialogflow) === null || _a === void 0 ? void 0 : _a.queryResult.fulfillmentMessages;
        var data = fullfillments === null || fullfillments === void 0 ? void 0 : fullfillments.find(function (fullfillment) {
            return Boolean(fullfillment === null || fullfillment === void 0 ? void 0 : fullfillment.payload);
        });
        if (data) {
            return this.formatLegacyDialogflow(data);
        }
        return this.formatContextData(body.output.context);
    };
    ContentCardFormatter.prototype.formatLegacyDialogflow = function (data) {
        var _this = this;
        var payload = data.payload.soulmachines;
        return Object.keys(payload).map(function (id) {
            return {
                id: id,
                data: tslib_1.__assign({ id: id }, _this.formatCardData(payload[id])),
            };
        });
    };
    ContentCardFormatter.prototype.formatContextData = function (data) {
        var _this = this;
        return this.allowedIds(data).map(function (id) {
            var cardId = id.replace('public-', '');
            return {
                id: cardId,
                data: tslib_1.__assign({ id: cardId }, _this.formatCardData(data[id])),
            };
        });
    };
    ContentCardFormatter.prototype.allowedIds = function (values) {
        return Object.keys(values)
            .filter(function (k) { return /public-/.test(k) === true; })
            .filter(function (k) { return /\.original/gm.test(k) === false; });
    };
    // Data should be JSON or a ContentCard, however, we can attempt to parse
    // unknown values as JSON.
    ContentCardFormatter.prototype.formatCardData = function (data) {
        var parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        var component = parsedData.component, type = parsedData.type, rest = tslib_1.__rest(parsedData, ["component", "type"]);
        return tslib_1.__assign({ type: type ? type : component }, rest);
    };
    return ContentCardFormatter;
}());
exports.ContentCardFormatter = ContentCardFormatter;
//# sourceMappingURL=ContentCardFormatter.js.map