"use strict";
/*
 * Copyright 2019-2022 Soul Machines Ltd. All Rights Reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MetadataSender_1 = require("./MetadataSender");
var scene_1 = require("./types/scene");
describe('MetadataSender', function () {
    var url = 'https://www.example.com?mock=URL_Param?123&foo=bar';
    var disconnectSpy = jest.spyOn(window.MutationObserver.prototype, 'disconnect');
    var mockSendRequest = jest.fn();
    var mockScene = {
        currentPersonaId: 1,
        sendRequest: mockSendRequest,
    };
    var metadataSender;
    beforeEach(function () {
        Object.defineProperty(window, 'location', { value: { href: url } });
        metadataSender = new MetadataSender_1.MetadataSender(mockScene);
    });
    it('does not call disconnect', function () {
        expect(disconnectSpy).not.toHaveBeenCalled();
    });
    describe('observeUrlChanges', function () {
        var triggerDomMutation = function () {
            var element = document.createElement('div');
            document.body.append(element);
        };
        beforeEach(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Force url to be in changed state
                        metadataSender['_previousUrl'] = '';
                        metadataSender.observeUrlChanges();
                        // First trigger will change url from localhost to example.com
                        triggerDomMutation();
                        //  Wait for mutation to finish
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 1:
                        //  Wait for mutation to finish
                        _a.sent();
                        metadataSender.observeUrlChanges();
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends a PAGE_METADATA message when the url changes', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                expect(mockSendRequest).toHaveBeenCalledWith('conversationSend', expect.objectContaining({
                    text: scene_1.NLPIntent.PAGE_METADATA,
                }));
                return [2 /*return*/];
            });
        }); });
        it('does not call sendRequest when the url does not change', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Clear mock from first time url changes and its called
                        mockSendRequest.mockClear();
                        // Trigger second dom mutation and this time url will be the same
                        triggerDomMutation();
                        //  Wait for mutation to finish
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 1:
                        //  Wait for mutation to finish
                        _a.sent();
                        expect(mockScene.sendRequest).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('disconnect', function () {
        it('calls disconnect on the observer', function () {
            metadataSender.disconnect();
            expect(disconnectSpy).toHaveBeenCalled();
        });
    });
    describe('send', function () {
        beforeEach(function () {
            metadataSender.send();
        });
        it('calls scene.sendRequest with the text PAGE_METADATA', function () {
            expect(mockScene.sendRequest).toHaveBeenCalledWith('conversationSend', {
                personaId: mockScene.currentPersonaId,
                text: scene_1.NLPIntent.PAGE_METADATA,
                variables: expect.any(Object),
                optionalArgs: {},
            });
        });
        describe('variables', function () {
            it('sends the page url without any url params', function () {
                expect(mockScene.sendRequest).toHaveBeenCalledWith('conversationSend', expect.objectContaining({
                    variables: expect.objectContaining({
                        pageUrl: 'https://www.example.com',
                    }),
                }));
            });
        });
    });
});
//# sourceMappingURL=MetadataSender.spec.js.map