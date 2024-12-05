/**
 * @module smwebsdk
 */
/*
 * Copyright 2017-2020 Soul Machines Ltd. All Rights Reserved.
 */
/**
 * Features class
 *
 * An instance of this class can also be created by the convenience API function DetectCapabilities()
 *
 * ```ts
 * var features  = window.smwebsdk.DetectCapabilities();
 * ```
 *
 * which also calls the detectWebRTCFeatures() method.
 */
var Features = /** @class */ (function () {
    function Features() {
        this._hasMicrophone = false;
        this._hasCamera = false;
        this._isAndroid = false;
        this._isBrowserSupported = false;
        this._isEdge = false;
        this._isIos = false;
        this._isAndroid = this.detectAndroid();
        this._isEdge = this.detectEdge();
        this._isIos = this.detectIos();
    }
    Features.prototype.detectEdge = function () {
        return this.userAgentMatches('Edge');
    };
    Features.prototype.detectAndroid = function () {
        return this.userAgentMatches('Android');
    };
    Features.prototype.detectIos = function () {
        var isIOS = (/iPad|iPhone|iPod/i.test(navigator.platform) ||
            (navigator &&
                navigator.platform === 'MacIntel' &&
                navigator.maxTouchPoints > 1)) &&
            !window.MSStream;
        return isIOS;
    };
    Features.prototype.userAgentMatches = function (text) {
        var userAgent = window.navigator.userAgent;
        var matches = userAgent.match(text);
        if (matches) {
            return matches.length > 0 ? true : false;
        }
        return false;
    };
    Features.prototype.detectWebRTCFeatures = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Check for runtime host
            if (window.SmIsUnderRuntimeHost) {
                // TODO - detect whether camera/microphone is available in runtime host
                _this._isBrowserSupported = true;
                _this._hasMicrophone = true;
                _this._hasCamera = true;
                resolve(_this);
            }
            // This approach heavily influenced by the helpful and MIT licensed:
            //    https://github.com/muaz-khan/DetectRTC/blob/master/DetectRTC.js
            // Detect webrtc support
            var isWebRTCSupported = false;
            [
                'RTCPeerConnection',
                'webkitRTCPeerConnection',
                'mozRTCPeerConnection',
                'RTCIceGatherer',
            ].forEach(function (item) {
                if (isWebRTCSupported) {
                    return;
                }
                if (item in window) {
                    isWebRTCSupported = true;
                }
            });
            // Apparently IE11 injected iPhone into user agent string, hence check for not MSStream
            var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) && !window.MSStream;
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (isWebRTCSupported && iOS && !isSafari) {
                // Webrtc is not supported on an iOS device using webview instead of full Safari
                isWebRTCSupported = false;
            }
            _this._isBrowserSupported = isWebRTCSupported;
            if (!_this._isBrowserSupported) {
                resolve(_this);
            }
            // Find the enumerate devices function if available
            var navEnumerateDevices = null;
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                // Firefox 38+ seems having support of enumerateDevices
                // Thanks @xdumaine/enumerateDevices
                // eslint-disable-next-line @typescript-eslint/ban-types
                navEnumerateDevices = function (callback) {
                    Promise.resolve(navigator.mediaDevices.enumerateDevices())
                        .then(function (value) {
                        if (value === void 0) { value = []; }
                        callback(value);
                    })
                        .catch(function () {
                        callback([]);
                    });
                };
            }
            var MediaStreamTrack = window.MediaStreamTrack;
            if (!navEnumerateDevices &&
                MediaStreamTrack &&
                MediaStreamTrack.getSources) {
                navEnumerateDevices =
                    MediaStreamTrack.getSources.bind(MediaStreamTrack);
            }
            if (!navEnumerateDevices && navigator.enumerateDevices) {
                // ! block was originally unreachable until bug is fixed in trunk
                navEnumerateDevices = navigator.enumerateDevices.bind(navigator);
            }
            // Enumerate the media devices
            if (navEnumerateDevices) {
                navEnumerateDevices(function (devices) {
                    devices.forEach(function (device) {
                        if (device.kind === 'audioinput') {
                            _this._hasMicrophone = true;
                        }
                        if (device.kind === 'videoinput') {
                            _this._hasCamera = true;
                        }
                    });
                    resolve(_this);
                });
            }
            else {
                resolve(_this);
            }
        });
    };
    Object.defineProperty(Features.prototype, "hasMicrophone", {
        get: function () {
            return this._hasMicrophone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Features.prototype, "hasCamera", {
        get: function () {
            return this._hasCamera;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Features.prototype, "isAndroid", {
        get: function () {
            return this._isAndroid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Features.prototype, "isBrowserSupported", {
        get: function () {
            return this._isBrowserSupported;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Features.prototype, "isEdge", {
        get: function () {
            return this._isEdge;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Features.prototype, "isIos", {
        get: function () {
            return this._isIos;
        },
        enumerable: false,
        configurable: true
    });
    return Features;
}());
export { Features };
//# sourceMappingURL=Features.js.map