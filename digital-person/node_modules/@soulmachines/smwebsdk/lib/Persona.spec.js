"use strict";
/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Persona_1 = require("./Persona");
var Scene_1 = require("./Scene");
require("./Session");
var SmEvent_1 = require("./SmEvent");
jest.mock('./ContentAwareness');
jest.mock('./Session', function () {
    return {
        Session: jest.fn(function () {
            return {
                connect: jest.fn(),
                features: {
                    isIos: false,
                },
                sendMessage: jest.fn(),
            };
        }),
    };
});
jest.mock('./SmTelemetry.ts');
// =============================================================================
// Persona Tests
describe('Persona tests', function () {
    var scene;
    beforeEach(function () {
        scene = new Scene_1.Scene(undefined);
        jest
            .spyOn(scene, 'sendRequest')
            .mockImplementation(function () { return Promise.resolve(); });
        scene.connect('serverUri', '', 'accessToken');
    });
    it('passes can be interrupted true to the scenes sendRequest', function () {
        new Persona_1.Persona(scene, '1').startSpeaking('hi', '', {
            canBeInterrupted: true,
        });
        expect(scene.sendRequest).toBeCalledWith('startSpeaking', expect.objectContaining({
            optionalArgs: {
                canBeInterrupted: true,
            },
        }));
    });
    it('passes can be interrupted false to the scenes sendRequest', function () {
        new Persona_1.Persona(scene, '1').startSpeaking('hi', '', {
            canBeInterrupted: false,
        });
        expect(scene.sendRequest).toBeCalledWith('startSpeaking', expect.objectContaining({
            optionalArgs: {
                canBeInterrupted: false,
            },
        }));
    });
    it('returns the error if send request errors', function () {
        scene.sendRequest = function () { return Promise.reject('Something went wrong'); };
        return expect(new Persona_1.Persona(scene, '1').startSpeaking('hi')).rejects.toEqual('Something went wrong');
    });
    it('assigns an smEvent to scene.onConversationResultEvents if it is not already defined', function () {
        var persona = new Persona_1.Persona(scene, 1);
        expect(persona.onConversationResultEvent).toEqual(expect.any(SmEvent_1.SmEvent));
    });
    it('assigns an smEvent to scene.onSpeechMarkerEvent if it is not already defined', function () {
        var persona = new Persona_1.Persona(scene, 1);
        expect(persona.onSpeechMarkerEvent).toEqual(expect.any(SmEvent_1.SmEvent));
    });
});
//# sourceMappingURL=Persona.spec.js.map