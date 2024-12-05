"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMockMediaStream = void 0;
var tslib_1 = require("tslib");
// jsdom does not support MediaStream so provide it
function useMockMediaStream(usage) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mockMediaStream, usageResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockMediaStream = jest.fn();
                    window.MediaStream = mockMediaStream;
                    return [4 /*yield*/, usage({ mockMediaStream: mockMediaStream })];
                case 1:
                    usageResult = _a.sent();
                    delete window.MediaStream;
                    return [2 /*return*/, usageResult];
            }
        });
    });
}
exports.useMockMediaStream = useMockMediaStream;
//# sourceMappingURL=MockMediaStream.js.map