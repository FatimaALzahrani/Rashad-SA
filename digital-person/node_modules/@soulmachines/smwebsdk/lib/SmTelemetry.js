"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmTracerProvider = void 0;
var resources_1 = require("@opentelemetry/resources");
var semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
var sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
var sdk_trace_web_1 = require("@opentelemetry/sdk-trace-web");
var exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
var DEFAULT_URL = 'http://localhost:4318/v1/traces';
exports.SmTracerProvider = (function () {
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
            _tracerProvider = new sdk_trace_web_1.WebTracerProvider({
                resource: new resources_1.Resource((_a = {},
                    _a[semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME] = 'smwebsdk',
                    _a[semantic_conventions_1.SemanticResourceAttributes.SERVICE_VERSION] = opts.webSDKVersion,
                    _a)),
            });
            _tracerProvider.addSpanProcessor(new sdk_trace_base_1.BatchSpanProcessor(new exporter_trace_otlp_http_1.OTLPTraceExporter({
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
Object.freeze(exports.SmTracerProvider);
//# sourceMappingURL=SmTelemetry.js.map