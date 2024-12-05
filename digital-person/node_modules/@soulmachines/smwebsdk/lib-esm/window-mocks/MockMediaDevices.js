import { __awaiter, __generator } from "tslib";
// jsdom does not support navigator.mediaDevices so provide it
export function useMockMediaDevices(usage) {
    return __awaiter(this, void 0, void 0, function () {
        var navigatorSpy, mockUserMedia, mockMediaDevices, usageResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    navigatorSpy = jest.spyOn(window, 'navigator', 'get');
                    mockUserMedia = jest.fn();
                    mockMediaDevices = {
                        getUserMedia: mockUserMedia,
                        getSupportedConstraints: jest.fn(function () { return ({}); }),
                    };
                    navigatorSpy.mockReturnValue({ mediaDevices: mockMediaDevices });
                    return [4 /*yield*/, usage({ mockUserMedia: mockUserMedia, mockMediaDevices: mockMediaDevices })];
                case 1:
                    usageResult = _a.sent();
                    navigatorSpy.mockRestore();
                    return [2 /*return*/, usageResult];
            }
        });
    });
}
//# sourceMappingURL=MockMediaDevices.js.map