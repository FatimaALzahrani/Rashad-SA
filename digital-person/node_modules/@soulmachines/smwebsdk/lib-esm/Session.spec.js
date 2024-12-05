/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
import { __assign, __awaiter, __generator, __makeTemplateObject } from "tslib";
import { Session } from './Session';
import { Logger } from './utils/Logger';
import { UserMedia } from './types/scene';
import { useMockMediaDevices } from './window-mocks/MockMediaDevices';
import { useMockMediaStream } from './window-mocks/MockMediaStream';
import { Deferred } from './Deferred';
import { ConnectionState } from './ConnectionState';
jest.mock('./utils/Logger');
jest.mock('./Features');
describe('Session', function () {
    var session;
    var mockLogger;
    var connectionState;
    beforeEach(function () {
        mockLogger = new Logger();
        connectionState = new ConnectionState();
        mockLogger.isEnabled = true;
        session = new Session(document.createElement('video'), 'serverUri', 'connectUserText', 'accessToken', false, UserMedia.None, UserMedia.None, true, mockLogger, connectionState);
    });
    describe('Camera and Microphone activity', function () {
        var createMockPeerConnection = function (tracks) { return ({
            getSenders: jest
                .fn()
                .mockReturnValue(tracks.map(function (track) { return (__assign(__assign({}, track), { replaceTrack: jest.fn() })); })),
            getTransceivers: jest.fn(function () { return []; }),
        }); };
        describe('isCameraActive', function () {
            it('should return false if peer connection is not defined', function () {
                session._peerConnection = undefined;
                expect(session.isCameraActive()).toEqual(false);
            });
            it('should return false if there are no tracks', function () {
                session._peerConnection = createMockPeerConnection([]);
                expect(session.isCameraActive()).toEqual(false);
            });
            it('should return false if there is a media track but it is the wrong kind', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'audio',
                            enabled: true,
                        },
                    },
                ]);
                expect(session.isCameraActive()).toEqual(false);
            });
            it('should return false if there is an video track but the track is disabled', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'video',
                            enabled: false,
                        },
                    },
                ]);
                expect(session.isCameraActive()).toEqual(false);
            });
            it('should return true when there is an video track and it is enabled', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'video',
                            enabled: true,
                        },
                    },
                ]);
                expect(session.isCameraActive()).toEqual(true);
            });
            it('should return true when there are multiple tracks and the video is enabled', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'audio',
                            enabled: false,
                        },
                    },
                    {
                        track: {
                            kind: 'video',
                            enabled: true,
                        },
                    },
                ]);
                expect(session.isCameraActive()).toEqual(true);
            });
        });
        describe('isMicrophoneActive', function () {
            it('should return false if peer connection is not defined', function () {
                session._peerConnection = undefined;
                expect(session.isMicrophoneActive()).toEqual(false);
            });
            it('should return false if there are no tracks', function () {
                session._peerConnection = createMockPeerConnection([]);
                expect(session.isMicrophoneActive()).toEqual(false);
            });
            it('should return false if there is a media track but it is the wrong kind', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'video',
                            enabled: true,
                        },
                    },
                ]);
                expect(session.isMicrophoneActive()).toEqual(false);
            });
            it('should return false if there is an audio track but the track is disabled', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'audio',
                            enabled: false,
                        },
                    },
                ]);
                expect(session.isMicrophoneActive()).toEqual(false);
            });
            it('should return true when there is an audio track and it is enabled', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'audio',
                            enabled: true,
                        },
                    },
                ]);
                expect(session.isMicrophoneActive()).toEqual(true);
            });
            it('should return true when there are multiple tracks and the audio is enabled', function () {
                session._peerConnection = createMockPeerConnection([
                    {
                        track: {
                            kind: 'audio',
                            enabled: true,
                        },
                    },
                    {
                        track: {
                            kind: 'video',
                            enabled: false,
                        },
                    },
                ]);
                expect(session.isMicrophoneActive()).toEqual(true);
            });
        });
        describe('setMediaDeviceActive', function () {
            describe('microphone', function () {
                describe('when set active', function () {
                    it('should add a new audio track to the local stream', function () {
                        return useMockMediaDevices(function (_a) {
                            var mockUserMedia = _a.mockUserMedia;
                            return useMockMediaStream(function (_a) {
                                var mockMediaStream = _a.mockMediaStream;
                                var addTrack = jest.fn();
                                mockMediaStream.mockReturnValue({
                                    addTrack: addTrack,
                                });
                                mockUserMedia.mockResolvedValue({
                                    getTracks: jest.fn(function () { return [{ kind: 'audio' }]; }),
                                });
                                session._peerConnection = createMockPeerConnection([
                                    {
                                        track: null,
                                    },
                                ]);
                                return session
                                    .setMediaDeviceActive({ microphone: true })
                                    .then(function () {
                                    expect(addTrack).toHaveBeenCalledTimes(1);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    describe('selectUserMedia with', function () {
        var deferred;
        var createdMediaStream;
        var completion = function (stream, deferred) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                createdMediaStream = stream;
                deferred.resolve();
                return [2 /*return*/];
            });
        }); };
        var testMedia = [
            {
                mediaDescription: 'Microphone',
                media: UserMedia.Microphone,
            },
            {
                mediaDescription: 'Camera',
                media: UserMedia.Camera,
            },
            {
                mediaDescription: 'Microphone & Camera',
                media: UserMedia.MicrophoneAndCamera,
            },
        ];
        var audioOption = {
            noiseSuppression: false,
            autoGainControl: false,
            channelCount: 1,
            sampleRate: 16000,
            sampleSize: 16,
            echoCancellation: true,
        };
        var videoOption = {
            frameRate: 10.0,
            width: 640.0,
            height: 480.0,
            facingMode: 'user',
        };
        describe('No user media is requested or required', function () {
            it('should result in success without a stream in the first attempt when Requested and Required Media are both None', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        deferred = new Deferred();
                                        createdMediaStream = new MediaStream();
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        session.selectUserMedia(UserMedia.None, UserMedia.None, deferred, completion);
                                        return [4 /*yield*/, deferred.promise];
                                    case 2:
                                        _a.sent();
                                        expect(createdMediaStream).toBe(null);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        expect(error_1).toBeUndefined();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            }); });
        });
        describe('First attempt', function () {
            testMedia.forEach(function (_a) {
                var mediaDescription = _a.mediaDescription, media = _a.media;
                it("should result in success with a stream in the first attempt when Requested ".concat(mediaDescription, " access is obtained when Required Media is None"), function () {
                    return useMockMediaDevices(function (_a) {
                        var mockUserMedia = _a.mockUserMedia;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    mockUserMedia.mockResolvedValue('stream');
                                                    deferred = new Deferred();
                                                    createdMediaStream = null;
                                                    session.selectUserMedia(media, UserMedia.None, deferred, completion);
                                                    return [4 /*yield*/, deferred.promise];
                                                case 1:
                                                    _a.sent();
                                                    expect(createdMediaStream).toBe('stream');
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    });
                });
            });
            testMedia.forEach(function (_a) {
                var mediaDescription = _a.mediaDescription, media = _a.media;
                it("should result in success with a stream in the first attempt when Required ".concat(mediaDescription, " access is obtained when Requested Media is None"), function () {
                    return useMockMediaDevices(function (_a) {
                        var mockUserMedia = _a.mockUserMedia;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    mockUserMedia.mockResolvedValue('stream');
                                                    deferred = new Deferred();
                                                    createdMediaStream = null;
                                                    session.selectUserMedia(UserMedia.None, media, deferred, completion);
                                                    return [4 /*yield*/, deferred.promise];
                                                case 1:
                                                    _a.sent();
                                                    expect(createdMediaStream).toBe('stream');
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    });
                });
            });
            testMedia.forEach(function (_a) {
                var mediaDescription = _a.mediaDescription, media = _a.media;
                it("should result in failure with a noUserMedia error when Required ".concat(mediaDescription, " access is not obtained while Requested Media is same as Required Media"), function () {
                    return useMockMediaDevices(function (_a) {
                        var mockUserMedia = _a.mockUserMedia;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var error_2;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    mockUserMedia.mockRejectedValue({});
                                                    deferred = new Deferred();
                                                    createdMediaStream = new MediaStream();
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    session.selectUserMedia(media, media, deferred, completion);
                                                    return [4 /*yield*/, deferred.promise];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    error_2 = _a.sent();
                                                    expect(error_2).toBeInstanceOf(Error);
                                                    expect(error_2.name).toBe('noUserMedia');
                                                    return [3 /*break*/, 4];
                                                case 4:
                                                    expect.assertions(1);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    });
                });
            });
        });
        describe('Second attempt after first attempt failed: ', function () {
            describe('required Media is not None and not the same as Requested Media', function () {
                test.each(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          RequestedMedia                   | RequiredMedia           | expectedResult\n          ", " | ", " | ", "\n          ", "              | ", " | ", "\n          ", "          | ", "     | ", "\n        "], ["\n          RequestedMedia                   | RequiredMedia           | expectedResult\n          ", " | ", " | ", "\n          ", "              | ", " | ", "\n          ", "          | ", "     | ", "\n        "])), UserMedia.MicrophoneAndCamera, UserMedia.Microphone, { video: false, audio: audioOption }, UserMedia.Camera, UserMedia.Microphone, { video: false, audio: audioOption }, UserMedia.Microphone, UserMedia.Camera, { video: videoOption, audio: false })('getUserMedia has been called with $expectedResult when RequestedMedia is $RequestedMedia and RequiredMedia is $RequiredMedia', function (_a) {
                    var RequestedMedia = _a.RequestedMedia, RequiredMedia = _a.RequiredMedia, expectedResult = _a.expectedResult;
                    return useMockMediaDevices(function (_a) {
                        var mockUserMedia = _a.mockUserMedia, mockMediaDevices = _a.mockMediaDevices;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    mockUserMedia
                                                        .mockRejectedValueOnce({}) // fail 1st attempt
                                                        .mockResolvedValue('stream'); // succeed 2nd attempt (fallback)
                                                    deferred = new Deferred();
                                                    createdMediaStream = new MediaStream();
                                                    session.selectUserMedia(RequestedMedia, RequiredMedia, deferred, completion);
                                                    return [4 /*yield*/, deferred.promise];
                                                case 1:
                                                    _a.sent();
                                                    expect(mockMediaDevices.getUserMedia).toHaveBeenLastCalledWith(expectedResult);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    });
                });
            });
            describe('when Required access is obtained in the second attempt', function () {
                test.each(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          RequestedMedia                   | RequiredMedia           | expectedResult\n          ", " | ", " | ", "\n          ", "              | ", " | ", "\n          ", "          | ", "     | ", "\n        "], ["\n          RequestedMedia                   | RequiredMedia           | expectedResult\n          ", " | ", " | ", "\n          ", "              | ", " | ", "\n          ", "          | ", "     | ", "\n        "])), UserMedia.MicrophoneAndCamera, UserMedia.Microphone, 'stream', UserMedia.Camera, UserMedia.Microphone, 'stream', UserMedia.Microphone, UserMedia.Camera, 'stream')('success with $expectedResult when RequestedMedia is $RequestedMedia and RequiredMedia is $RequiredMedia', function (_a) {
                    var RequestedMedia = _a.RequestedMedia, RequiredMedia = _a.RequiredMedia, expectedResult = _a.expectedResult;
                    return useMockMediaDevices(function (_a) {
                        var mockUserMedia = _a.mockUserMedia, mockMediaDevices = _a.mockMediaDevices;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    mockUserMedia
                                                        .mockRejectedValueOnce({}) // fail 1st attempt
                                                        .mockResolvedValue('stream'); // succeed 2nd attempt (fallback)
                                                    deferred = new Deferred();
                                                    createdMediaStream = new MediaStream();
                                                    session.selectUserMedia(RequestedMedia, RequiredMedia, deferred, completion);
                                                    return [4 /*yield*/, deferred.promise];
                                                case 1:
                                                    _a.sent();
                                                    expect(createdMediaStream).toBe(expectedResult);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    });
                });
            });
            describe('when Required access is not obtained in the second attempt', function () {
                test.each(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          RequestedMedia                   | RequiredMedia                    | expectedResult\n          ", " | ", "          | ", "\n          ", "              | ", " | ", "\n          ", "          | ", " | ", "\n        "], ["\n          RequestedMedia                   | RequiredMedia                    | expectedResult\n          ", " | ", "          | ", "\n          ", "              | ", " | ", "\n          ", "          | ", " | ", "\n        "])), UserMedia.MicrophoneAndCamera, UserMedia.Microphone, 'noUserMedia', UserMedia.Camera, UserMedia.MicrophoneAndCamera, 'noUserMedia', UserMedia.Microphone, UserMedia.MicrophoneAndCamera, 'noUserMedia')('should throw a $expectedResult error when RequestedMedia is $RequestedMedia and RequiredMedia is  $RequiredMedia', function (_a) {
                    var RequestedMedia = _a.RequestedMedia, RequiredMedia = _a.RequiredMedia, expectedResult = _a.expectedResult;
                    return useMockMediaDevices(function (_a) {
                        var mockUserMedia = _a.mockUserMedia, mockMediaDevices = _a.mockMediaDevices;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var error_3;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    mockUserMedia
                                                        .mockRejectedValueOnce({}) // fail 1st attempt
                                                        .mockRejectedValueOnce({}); // fail 2nd attempt (fallback)
                                                    deferred = new Deferred();
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    session.selectUserMedia(RequestedMedia, RequiredMedia, deferred, completion);
                                                    return [4 /*yield*/, deferred.promise];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    error_3 = _a.sent();
                                                    expect(error_3).toBeInstanceOf(Error);
                                                    expect(error_3.name).toBe(expectedResult);
                                                    return [3 /*break*/, 4];
                                                case 4:
                                                    expect.assertions(1);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    });
                });
            });
        });
        describe('when the second attempt is successful', function () {
            it('should call getUserMedia with video false and the audioOptions when Requested access is obtained', function () {
                return useMockMediaDevices(function (_a) {
                    var mockUserMedia = _a.mockUserMedia, mockMediaDevices = _a.mockMediaDevices;
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                mockUserMedia
                                                    .mockRejectedValueOnce({}) // fail 1st attempt
                                                    .mockResolvedValue('stream'); // succeed 2nd attempt (fallback)
                                                deferred = new Deferred();
                                                createdMediaStream = new MediaStream();
                                                session.selectUserMedia(UserMedia.MicrophoneAndCamera, UserMedia.None, deferred, completion);
                                                return [4 /*yield*/, deferred.promise];
                                            case 1:
                                                _a.sent();
                                                expect(mockMediaDevices.getUserMedia).toHaveBeenLastCalledWith({
                                                    video: false,
                                                    audio: audioOption,
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        });
                    });
                });
            });
            it('should return a stream when Requested access is obtained', function () {
                return useMockMediaDevices(function (_a) {
                    var mockUserMedia = _a.mockUserMedia;
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                mockUserMedia
                                                    .mockRejectedValueOnce({}) // fail 1st attempt
                                                    .mockResolvedValue('stream'); // succeed 2nd attempt (fallback)
                                                deferred = new Deferred();
                                                createdMediaStream = new MediaStream();
                                                session.selectUserMedia(UserMedia.MicrophoneAndCamera, UserMedia.None, deferred, completion);
                                                return [4 /*yield*/, deferred.promise];
                                            case 1:
                                                _a.sent();
                                                expect(createdMediaStream).toBe('stream');
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        });
                    });
                });
            });
            it('should result a null stream when Requested access is not obtained', function () {
                return useMockMediaDevices(function (_a) {
                    var mockUserMedia = _a.mockUserMedia;
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            return [2 /*return*/, useMockMediaStream(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var error_4;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                mockUserMedia
                                                    .mockRejectedValueOnce({}) // fail 1st attempt
                                                    .mockRejectedValueOnce({}); // fail 2nd attempt (fallback)
                                                deferred = new Deferred();
                                                createdMediaStream = new MediaStream();
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                session.selectUserMedia(UserMedia.MicrophoneAndCamera, UserMedia.None, deferred, completion);
                                                return [4 /*yield*/, deferred.promise];
                                            case 2:
                                                _a.sent();
                                                expect(createdMediaStream).toBe(null);
                                                return [3 /*break*/, 4];
                                            case 3:
                                                error_4 = _a.sent();
                                                expect(error_4).toBeUndefined();
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        });
                    });
                });
            });
        });
    });
    describe('getMediaConstraints', function () {
        describe('when audio is requested', function () {
            fit('returns only the supported constraints and ignores unknown/unsupported constraints', function () {
                return useMockMediaDevices(function (_a) {
                    var mockMediaDevices = _a.mockMediaDevices;
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            mockMediaDevices.getSupportedConstraints.mockReturnValue({
                                autoGainControl: true,
                                sampleRate: true,
                                sampleSize: false,
                                channelCount: true,
                            });
                            expect(
                            // XXX This is an odd test, because it tests passing invalid types
                            // into the function. However, instead of removing it, I'm just
                            // forcing it to accept `null`, which it should never do in
                            // practice.
                            session.getMediaConstraints(UserMedia.Microphone, null)).toEqual(expect.objectContaining({
                                audio: {
                                    autoGainControl: false,
                                    channelCount: 1,
                                    sampleRate: 16000,
                                },
                            }));
                            return [2 /*return*/];
                        });
                    });
                });
            });
        });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Session.spec.js.map