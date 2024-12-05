"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scene_1 = require("../types/scene");
var convertToUserMedia_1 = require("./convertToUserMedia");
describe('convertToUserMedia', function () {
    it('returns provided fallback value when called with undefined', function () {
        expect((0, convertToUserMedia_1.default)(undefined, scene_1.UserMedia.MicrophoneAndCamera)).toEqual(scene_1.UserMedia.MicrophoneAndCamera);
    });
    it('returns None as the default fallback when called with undefined', function () {
        expect((0, convertToUserMedia_1.default)(undefined)).toEqual(scene_1.UserMedia.None);
    });
    it('returns None when called with an empty object', function () {
        expect((0, convertToUserMedia_1.default)({})).toEqual(scene_1.UserMedia.None);
    });
    it('returns None when called with camera false and microphone false', function () {
        expect((0, convertToUserMedia_1.default)({ camera: false, microphone: false })).toEqual(scene_1.UserMedia.None);
    });
    it('returns MicrophoneAndCamera when called with camera true and microphone true', function () {
        expect((0, convertToUserMedia_1.default)({ camera: true, microphone: true })).toEqual(scene_1.UserMedia.MicrophoneAndCamera);
    });
    it('returns Camera when called with camera true ', function () {
        expect((0, convertToUserMedia_1.default)({ camera: true })).toEqual(scene_1.UserMedia.Camera);
    });
    it('returns Microphone when called with microphone true ', function () {
        expect((0, convertToUserMedia_1.default)({ microphone: true })).toEqual(scene_1.UserMedia.Microphone);
    });
});
//# sourceMappingURL=convertToUserMedia.spec.js.map