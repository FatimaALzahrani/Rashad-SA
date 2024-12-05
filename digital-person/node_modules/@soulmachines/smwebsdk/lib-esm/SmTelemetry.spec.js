/**
 * @jest-environment node
 */
import { SmTracerProvider } from './SmTelemetry';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { Resource } from '@opentelemetry/resources';
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
        expect(SmTracerProvider.getTracer).not.toThrow();
    });
    it('should be able to initialize the tracer provider', function () {
        expect(SmTracerProvider.isInitialized()).toBe(false);
        SmTracerProvider.init(opts);
        expect(WebTracerProvider).toHaveBeenCalledWith({
            resource: expect.any(Object),
        });
        expect(Resource).toHaveBeenCalledWith({
            'service.name': 'smwebsdk',
            'service.version': 'mock version',
        });
        expect(SmTracerProvider.isInitialized()).toBe(true);
        jest.clearAllMocks();
        SmTracerProvider.init(opts);
        expect(WebTracerProvider).not.toHaveBeenCalled();
        expect(Resource).not.toHaveBeenCalled();
        expect(SmTracerProvider.isInitialized()).toBe(true);
    });
    it('should be able to get a tracer', function () {
        var tracer = SmTracerProvider.getTracer();
        expect(tracer).toBeDefined();
    });
});
//# sourceMappingURL=SmTelemetry.spec.js.map