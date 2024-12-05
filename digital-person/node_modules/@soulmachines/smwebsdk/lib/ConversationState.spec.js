"use strict";
/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConversationStateTypes_1 = require("./enums/ConversationStateTypes");
var ConversationState_1 = require("./ConversationState");
var SpeechState_1 = require("./websocket-message/enums/SpeechState");
var Logger_1 = require("./utils/Logger");
jest.mock('./utils/Logger');
describe('Conversation State', function () {
    var _a;
    var mockLogger;
    var speechState;
    var recognizeResultsResponseBody = function (final) {
        return {
            status: 0,
            errorMessage: '',
            results: [
                {
                    final: final,
                    alternatives: [
                        {
                            confidence: 0.8,
                            transcript: 'blah blah blah',
                        },
                    ],
                },
            ],
        };
    };
    var idleStateResponseBody = {
        persona: {
            '1': {
                speechState: SpeechState_1.SpeechState.Idle,
            },
        },
    };
    var speakingStateResponseBody = {
        persona: {
            '1': {
                speechState: SpeechState_1.SpeechState.Speaking,
            },
        },
    };
    function errorMessage(errorMessage) {
        return {
            status: 1,
            errorMessage: errorMessage || '',
            results: [],
        };
    }
    beforeEach(function () {
        mockLogger = new Logger_1.Logger();
        speechState = new ConversationState_1.ConversationState(mockLogger);
        mockLogger.enableLogging(true);
    });
    var stateTransitionDict = (_a = {},
        _a[ConversationStateTypes_1.ConversationStateTypes.idle] = function (speechState) {
            speechState.processStateMessage(idleStateResponseBody);
        },
        _a[ConversationStateTypes_1.ConversationStateTypes.dpSpeaking] = function (speechState) {
            speechState.processStateMessage(speakingStateResponseBody);
        },
        _a[ConversationStateTypes_1.ConversationStateTypes.userSpeaking] = function (speechState) {
            speechState.processRecognizeResultsMessage(recognizeResultsResponseBody(false));
        },
        _a[ConversationStateTypes_1.ConversationStateTypes.dpProcessing] = function (speechState) {
            speechState.processRecognizeResultsMessage(recognizeResultsResponseBody(true));
        },
        _a);
    it('Change to state from instantiation succeeds', function () {
        speechState.processStateMessage(idleStateResponseBody);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
        speechState.processStateMessage(speakingStateResponseBody);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.dpSpeaking);
        speechState.processRecognizeResultsMessage(recognizeResultsResponseBody(false));
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.userSpeaking);
        speechState.processRecognizeResultsMessage(recognizeResultsResponseBody(true));
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.dpProcessing);
    });
    it('Change to state from any state succeeds', function () {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = tslib_1.__values(Object.entries(stateTransitionDict)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = tslib_1.__read(_d.value, 2), startState = _e[0], startStateFunction = _e[1];
                startStateFunction(speechState);
                expect(speechState.getSpeechState()).toBe(startState);
                try {
                    for (var _f = (e_2 = void 0, tslib_1.__values(Object.entries(stateTransitionDict))), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var _h = tslib_1.__read(_g.value, 2), endState = _h[0], endStateFunction = _h[1];
                        endStateFunction(speechState);
                        expect(speechState.getSpeechState()).toBe(endState);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    it('does not change state when a recognizeResults error message is received ', function () {
        var errorMessage = {
            status: 1,
            errorMessage: 'A Test Error Message',
            results: [],
        };
        speechState.processStateMessage(idleStateResponseBody);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
        speechState.processRecognizeResultsMessage(errorMessage);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
        speechState.processStateMessage(speakingStateResponseBody);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.dpSpeaking);
        speechState.processRecognizeResultsMessage(errorMessage);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.dpSpeaking);
        speechState.processRecognizeResultsMessage(recognizeResultsResponseBody(false));
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.userSpeaking);
        speechState.processRecognizeResultsMessage(errorMessage);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.userSpeaking);
        speechState.processRecognizeResultsMessage(recognizeResultsResponseBody(true));
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.dpProcessing);
        speechState.processRecognizeResultsMessage(errorMessage);
        expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.dpProcessing);
    });
    describe('Validate Error message recognition', function () {
        it('Does not change state when error message is undefined', function () {
            speechState.processStateMessage(idleStateResponseBody);
            expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
            speechState.processRecognizeResultsMessage(errorMessage(undefined));
            expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
        });
        it('Does not change state when error message is null', function () {
            speechState.processStateMessage(idleStateResponseBody);
            expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
            speechState.processRecognizeResultsMessage(errorMessage(null));
            expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
        });
        it('Does not change state when error message is empty string', function () {
            speechState.processStateMessage(idleStateResponseBody);
            expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
            speechState.processRecognizeResultsMessage(errorMessage(''));
            expect(speechState.getSpeechState()).toBe(ConversationStateTypes_1.ConversationStateTypes.idle);
        });
    });
});
//# sourceMappingURL=ConversationState.spec.js.map