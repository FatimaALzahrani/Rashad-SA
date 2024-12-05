import { UserMedia } from '../types/scene';
import convertToUserMedia from './convertToUserMedia';
describe('convertToUserMedia', function () {
    it('returns provided fallback value when called with undefined', function () {
        expect(convertToUserMedia(undefined, UserMedia.MicrophoneAndCamera)).toEqual(UserMedia.MicrophoneAndCamera);
    });
    it('returns None as the default fallback when called with undefined', function () {
        expect(convertToUserMedia(undefined)).toEqual(UserMedia.None);
    });
    it('returns None when called with an empty object', function () {
        expect(convertToUserMedia({})).toEqual(UserMedia.None);
    });
    it('returns None when called with camera false and microphone false', function () {
        expect(convertToUserMedia({ camera: false, microphone: false })).toEqual(UserMedia.None);
    });
    it('returns MicrophoneAndCamera when called with camera true and microphone true', function () {
        expect(convertToUserMedia({ camera: true, microphone: true })).toEqual(UserMedia.MicrophoneAndCamera);
    });
    it('returns Camera when called with camera true ', function () {
        expect(convertToUserMedia({ camera: true })).toEqual(UserMedia.Camera);
    });
    it('returns Microphone when called with microphone true ', function () {
        expect(convertToUserMedia({ microphone: true })).toEqual(UserMedia.Microphone);
    });
});
//# sourceMappingURL=convertToUserMedia.spec.js.map