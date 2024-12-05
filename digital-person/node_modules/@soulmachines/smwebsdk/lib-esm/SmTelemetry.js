import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
var DEFAULT_URL = 'http://localhost:4318/v1/traces';
export var SmTracerProvider = (function () {
    var _tracerProvider;
    var _instance;
    return {
        init: function (opts) {
            var _a;
            if (_instance) {
                return;
            }
            opts.url = opts.url || DEFAULT_URL;
            opts.webSDKVersion = opts.webSDKVersion || 'unknown';
            _tracerProvider = new WebTracerProvider({
                resource: new Resource((_a = {},
                    _a[SemanticResourceAttributes.SERVICE_NAME] = 'smwebsdk',
                    _a[SemanticResourceAttributes.SERVICE_VERSION] = opts.webSDKVersion,
                    _a)),
            });
            _tracerProvider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({
                url: opts.url,
                headers: {
                    Authorization: 'Bearer ' + opts.jwt,
                },
            })));
            _tracerProvider.register();
            _instance = _tracerProvider.getTracer('smwebsdk');
        },
        isInitialized: function () {
            return !!_instance;
        },
        getTracer: function () {
            return _instance;
        },
        defaultUrl: DEFAULT_URL,
    };
})();
Object.freeze(SmTracerProvider);
//# sourceMappingURL=SmTelemetry.js.map