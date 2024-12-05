/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
import { LocalSession } from './LocalSession';
import { Logger } from './utils/Logger';
jest.mock('./utils/Logger');
describe('LocalSession', function () {
    var localSession;
    var mockLogger;
    beforeEach(function () {
        mockLogger = new Logger();
        mockLogger.isEnabled = true;
        localSession = new LocalSession(document.createElement('video'), mockLogger);
    });
    it('logs a message saying the session is created', function () {
        expect(mockLogger.log).toHaveBeenCalledWith('log', 'Local session created!');
    });
    it('calls logger.setMinLogLevel when setMinLogLevel is called', function () {
        localSession.setMinLogLevel('warn');
        expect(mockLogger.setMinLogLevel).toHaveBeenCalledWith('warn');
    });
    it('calls logger.enableLogging when loggingEnabled is called', function () {
        localSession.loggingEnabled = true;
        expect(mockLogger.enableLogging).toHaveBeenCalledWith(true);
    });
    it('calls logger.enableLogging when setLogging is called', function () {
        localSession.setLogging(false);
        expect(mockLogger.enableLogging).toHaveBeenCalledWith(false);
    });
    it('returns the value of logger.isEnabled when loggingEnabled is called', function () {
        expect(localSession.loggingEnabled).toEqual(true);
    });
    describe('receiveMessage', function () {
        var message;
        beforeEach(function () {
            jest.spyOn(localSession, 'close');
            message = {
                name: 'state',
                category: 'scene',
                body: {
                    session: {
                        state: 'active',
                    },
                },
            };
        });
        it('logs a message received with the raw text', function () {
            var jsonMessage = JSON.stringify(message);
            localSession.receiveMessage(jsonMessage);
            expect(mockLogger.log).toHaveBeenCalledWith('log', 'message received: ' + jsonMessage);
        });
        describe('message name is state', function () {
            beforeEach(function () {
                message.name = 'state';
            });
            describe('category is scene', function () {
                beforeEach(function () {
                    message.category = 'scene';
                });
                describe('session state is idle', function () {
                    beforeEach(function () {
                        message.body.session.state = 'idle';
                        localSession.receiveMessage(JSON.stringify(message));
                    });
                    it('calls close', function () {
                        expect(localSession.close).toHaveBeenCalled();
                    });
                    it('logs a local session ending message', function () {
                        expect(mockLogger.log).toHaveBeenCalledWith('log', 'Local session ending - conversationEnded');
                    });
                });
                describe('session state is not idle', function () {
                    it('does not call close', function () {
                        message.body.session.state = 'random';
                        localSession.receiveMessage(JSON.stringify(message));
                        expect(localSession.close).not.toHaveBeenCalled();
                    });
                });
                describe('message body is undefined', function () {
                    it('does not call close', function () {
                        message.body = undefined;
                        localSession.receiveMessage(JSON.stringify(message));
                        expect(localSession.close).not.toHaveBeenCalled();
                    });
                });
                describe('session is null', function () {
                    it('does not call close', function () {
                        message.body.session = null;
                        localSession.receiveMessage(JSON.stringify(message));
                        expect(localSession.close).not.toHaveBeenCalled();
                    });
                });
                describe('session state is undefined', function () {
                    it('does not call close', function () {
                        message.body.session.state = undefined;
                        localSession.receiveMessage(JSON.stringify(message));
                        expect(localSession.close).not.toHaveBeenCalled();
                    });
                });
            });
            describe('category is not scene', function () {
                it('does not call close', function () {
                    message.category = 'random';
                    localSession.receiveMessage(JSON.stringify(message));
                    expect(localSession.close).not.toHaveBeenCalled();
                });
            });
        });
        describe('message name is not state', function () {
            it('does not call close', function () {
                message.name = 'showcards';
                localSession.receiveMessage(JSON.stringify(message));
                expect(localSession.close).not.toHaveBeenCalled();
            });
        });
    });
});
//# sourceMappingURL=LocalSession.spec.js.map