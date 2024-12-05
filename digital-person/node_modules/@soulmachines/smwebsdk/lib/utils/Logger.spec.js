"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("./Logger");
describe('Logger', function () {
    var logger;
    beforeEach(function () {
        jest.spyOn(console, 'debug').mockImplementation();
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'warn').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
        logger = new Logger_1.Logger();
    });
    it('defaults the minLogLevel to "log"', function () {
        expect(logger.getMinLogLevel()).toEqual('log');
    });
    it('defaults the logging to enabled', function () {
        expect(logger.isEnabled).toBeTruthy();
    });
    it('allows the minLogLevel to be set on creation', function () {
        logger = new Logger_1.Logger('debug');
        expect(logger.getMinLogLevel()).toEqual('debug');
    });
    it('allows the logging to be turned off on creation', function () {
        logger = new Logger_1.Logger('debug', false);
        expect(logger.isEnabled).toBeFalsy();
    });
    describe('enableLogging', function () {
        it('updates isEnabled to the boolean value passed in', function () {
            expect(logger.isEnabled).toBeTruthy();
            logger.enableLogging(false);
            expect(logger.isEnabled).toBeFalsy();
            logger.enableLogging(true);
            expect(logger.isEnabled).toBeTruthy();
        });
    });
    describe('setMinLogLevel', function () {
        it('updates minLogLevel to the value passed in', function () {
            logger.setMinLogLevel('error');
            expect(logger.getMinLogLevel()).toEqual('error');
            logger.setMinLogLevel('debug');
            expect(logger.getMinLogLevel()).toEqual('debug');
        });
    });
    describe('log', function () {
        it('does not log when isEnabled is false', function () {
            logger.enableLogging(false);
            logger.log('debug', 'hello');
            logger.log('log', 'hello');
            logger.log('warn', 'hello');
            logger.log('error', 'hello');
            expect(console.debug).not.toBeCalled();
            expect(console.log).not.toBeCalled();
            expect(console.warn).not.toBeCalled();
            expect(console.error).not.toBeCalled();
        });
        it('can log multiple params', function () {
            logger.enableLogging(true);
            logger.setMinLogLevel('debug');
            logger.log('debug', 'hello', 1, [2, 3, 4], { 5: 'five', 6: 'six' });
            expect(console.debug).toHaveBeenCalledWith('hello', 1, [2, 3, 4], {
                5: 'five',
                6: 'six',
            });
        });
        describe('when isEnabled is true', function () {
            beforeEach(function () {
                logger.enableLogging(true);
            });
            describe('when minLogLevel is debug', function () {
                beforeEach(function () {
                    logger.setMinLogLevel('debug');
                });
                it('calls console.debug with the log', function () {
                    logger.log('debug', 'hello');
                    expect(console.debug).toHaveBeenCalledWith('hello');
                });
                it('calls console.log with the log', function () {
                    logger.log('log', 'hello');
                    expect(console.log).toHaveBeenCalledWith('hello');
                });
                it('calls console.warn with the log', function () {
                    logger.log('warn', 'hello');
                    expect(console.warn).toHaveBeenCalledWith('hello');
                });
                it('calls console.error with the log', function () {
                    logger.log('error', 'hello');
                    expect(console.error).toHaveBeenCalledWith('hello');
                });
            });
            describe('when minLogLevel is log', function () {
                beforeEach(function () {
                    logger.setMinLogLevel('log');
                });
                it('does not call console.debug ', function () {
                    logger.log('debug', 'hello');
                    expect(console.debug).not.toHaveBeenCalled();
                });
                it('calls console.log with the log', function () {
                    logger.log('log', 'hello');
                    expect(console.log).toHaveBeenCalledWith('hello');
                });
                it('calls console.warn with the log', function () {
                    logger.log('warn', 'hello');
                    expect(console.warn).toHaveBeenCalledWith('hello');
                });
                it('calls console.error with the log', function () {
                    logger.log('error', 'hello');
                    expect(console.error).toHaveBeenCalledWith('hello');
                });
            });
            describe('when minLogLevel is warn', function () {
                beforeEach(function () {
                    logger.setMinLogLevel('warn');
                });
                it('does not call console.debug', function () {
                    logger.log('debug', 'hello');
                    expect(console.debug).not.toHaveBeenCalled();
                });
                it('does not call console.log', function () {
                    logger.log('log', 'hello');
                    expect(console.log).not.toHaveBeenCalled();
                });
                it('calls console.warn with the log', function () {
                    logger.log('warn', 'hello');
                    expect(console.warn).toHaveBeenCalledWith('hello');
                });
                it('calls console.error with the log', function () {
                    logger.log('error', 'hello');
                    expect(console.error).toHaveBeenCalledWith('hello');
                });
            });
            describe('when minLogLevel is error', function () {
                beforeEach(function () {
                    logger.setMinLogLevel('error');
                });
                it('does not call console.debug', function () {
                    logger.log('debug', 'hello');
                    expect(console.debug).not.toHaveBeenCalled();
                });
                it('does not call console.log', function () {
                    logger.log('log', 'hello');
                    expect(console.log).not.toHaveBeenCalled();
                });
                it('does not call console.warn', function () {
                    logger.log('warn', 'hello');
                    expect(console.warn).not.toHaveBeenCalled();
                });
                it('calls console.error with the log', function () {
                    logger.log('error', 'hello');
                    expect(console.error).toHaveBeenCalledWith('hello');
                });
            });
        });
    });
});
//# sourceMappingURL=Logger.spec.js.map