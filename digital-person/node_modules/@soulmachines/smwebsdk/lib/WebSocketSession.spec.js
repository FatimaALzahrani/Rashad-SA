"use strict";
/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketSession_1 = require("./WebSocketSession");
var Logger_1 = require("./utils/Logger");
jest.mock('./utils/Logger');
describe('WebSocketSession', function () {
    var webSocketSession;
    var mockLogger;
    beforeEach(function () {
        mockLogger = new Logger_1.Logger();
        mockLogger.isEnabled = true;
        webSocketSession = new WebSocketSession_1.WebSocketSession('serverUri', 'accessToken', mockLogger);
    });
    it('calls logger.setMinLogLevel when setMinLogLevel is called', function () {
        webSocketSession.setMinLogLevel('warn');
        expect(mockLogger.setMinLogLevel).toHaveBeenCalledWith('warn');
    });
    it('calls logger.enableLogging when loggingEnabled is called', function () {
        webSocketSession.loggingEnabled = true;
        expect(mockLogger.enableLogging).toHaveBeenCalledWith(true);
    });
    it('calls logger.enableLogging when setLogging is called', function () {
        webSocketSession.setLogging(false);
        expect(mockLogger.enableLogging).toHaveBeenCalledWith(false);
    });
    it('returns the value of logger.isEnabled when loggingEnabled is called', function () {
        expect(webSocketSession.loggingEnabled).toEqual(true);
    });
});
//# sourceMappingURL=WebSocketSession.spec.js.map