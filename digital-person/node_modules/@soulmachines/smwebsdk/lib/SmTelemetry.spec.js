"use strict";
/**
 * @jest-environment node
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SmTelemetry_1 = require("./SmTelemetry");
var sdk_trace_web_1 = require("@opentelemetry/sdk-trace-web");
var resources_1 = require("@opentelemetry/resources");
jest.mock('@opentelemetry/sdk-trace-web', function () { return ({
    WebTracerProvider: jest.fn(function () { return ({
        addSpanProcessor: jest.fn(function () { return 'mock add span'; }),
        getTracer: jest.fn(function () {
            return { mock: 'mock tracer' };
        }),
        register: jest.fn(),
    }); }),
}); });
jest.mock('@opentelemetry/resources', function () { return ({
    Resource: jest.fn(),
}); });
var opts = {
    jwt: '',
    url: 'http://localhost:4318/v1/traces',
    webSDKVersion: 'mock version',
};
describe('SmTelemetry tracer provider', function () {
    it('does not throw an error if asked for an uninitialized tracer', function () {
        expect(SmTelemetry_1.SmTracerProvider.getTracer).not.toThrow();
    });
    it('should be able to initialize the tracer provider', function () {
        expect(SmTelemetry_1.SmTracerProvider.isInitialized()).toBe(false);
        SmTelemetry_1.SmTracerProvider.init(opts);
        expect(sdk_trace_web_1.WebTracerProvider).toHaveBeenCalledWith({
            resource: expect.any(Object),
        });
        expect(resources_1.Resource).toHaveBeenCalledWith({
            'service.name': 'smwebsdk',
            'service.version': 'mock version',
        });
        expect(SmTelemetry_1.SmTracerProvider.isInitialized()).toBe(true);
        jest.clearAllMocks();
        SmTelemetry_1.SmTracerProvider.init(opts);
        expect(sdk_trace_web_1.WebTracerProvider).not.toHaveBeenCalled();
        expect(resources_1.Resource).not.toHaveBeenCalled();
        expect(SmTelemetry_1.SmTracerProvider.isInitialized()).toBe(true);
    });
    it('should be able to get a tracer', function () {
        var tracer = SmTelemetry_1.SmTracerProvider.getTracer();
        expect(tracer).toBeDefined();
    });
});
//# sourceMappingURL=SmTelemetry.spec.js.map