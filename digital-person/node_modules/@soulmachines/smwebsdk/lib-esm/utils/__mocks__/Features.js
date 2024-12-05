var mockFeatures = jest.fn(function () { return ({
    hasMicrophone: jest.fn(function () { return true; }),
    hasCamera: jest.fn(function () { return true; }),
    isAndroid: jest.fn(function () { return false; }),
    isBrowserSupported: jest.fn(function () { return true; }),
    isEdge: jest.fn(function () { return false; }),
    isIos: jest.fn(function () { return false; }),
}); });
export default mockFeatures;
//# sourceMappingURL=Features.js.map