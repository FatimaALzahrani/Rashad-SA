/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
import { WebSocketSession } from './WebSocketSession';
import { Logger } from './utils/Logger';
jest.mock('./utils/Logger');
describe('WebSocketSession', function () {
    var webSocketSession;
    var mockLogger;
    beforeEach(function () {
        mockLogger = new Logger();
        mockLogger.isEnabled = true;
        webSocketSession = new WebSocketSession('serverUri', 'accessToken', mockLogger);
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