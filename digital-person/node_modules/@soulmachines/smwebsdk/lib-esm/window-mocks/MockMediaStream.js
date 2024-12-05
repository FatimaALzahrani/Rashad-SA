import { __awaiter, __generator } from "tslib";
// jsdom does not support MediaStream so provide it
export function useMockMediaStream(usage) {
    return __awaiter(this, void 0, void 0, function () {
        var mockMediaStream, usageResult;
        return __generator(this, function (_a) {
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
//# sourceMappingURL=MockMediaStream.js.map