/*
 * Copyright 2021 Soul Machines Ltd. All Rights Reserved.
 */
import { __assign, __awaiter, __generator } from "tslib";
import { ContentAwareness } from './ContentAwareness';
import { Scene } from './Scene';
import { Logger } from './utils/Logger';
import '@juggle/resize-observer';
jest.mock('./Scene');
jest.mock('./utils/Logger');
jest.mock('./utils/allImagesLoaded', function () { return ({
    __esModule: true,
    default: function () { return Promise.resolve(true); },
}); });
jest.mock('@juggle/resize-observer');
describe('ContentAwareness', function () {
    var mockScene;
    var mockLogger;
    var ca;
    var videoElement;
    var elementOne;
    var genericElement;
    var mockContentBoundingClientRect = {
        left: 100,
        right: 200,
        top: 300,
        bottom: 400,
        width: 500,
        height: 600,
        x: 700,
        y: 800,
        toJSON: jest.fn(),
    };
    var mockVideoBoundingClientRect = __assign(__assign({}, mockContentBoundingClientRect), { left: 500, right: 600, top: 700, bottom: 800 });
    var waitForNextTick = function () {
        return new Promise(function (r) {
            setTimeout(r, 0);
            jest.runAllTimers();
        });
    };
    var createSmVideoElement = function (id) {
        if (id === void 0) { id = ''; }
        var video = document.createElement('video');
        video.setAttribute('data-sm-video', id);
        jest
            .spyOn(video, 'getBoundingClientRect')
            .mockReturnValue(mockVideoBoundingClientRect);
        return video;
    };
    var createSmContentElement = function (id) {
        if (id === void 0) { id = ''; }
        var el = document.createElement('div');
        el.setAttribute('data-sm-content', id);
        jest
            .spyOn(el, 'getBoundingClientRect')
            .mockReturnValue(mockContentBoundingClientRect);
        return el;
    };
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.useFakeTimers();
                    mockLogger = new Logger();
                    mockLogger.isEnabled = true;
                    mockScene = new Scene(undefined);
                    mockScene.isConnected = jest.fn(function () { return true; });
                    videoElement = createSmVideoElement('originalVideo');
                    document.body.append(videoElement);
                    ca = new ContentAwareness(mockScene, undefined, mockLogger);
                    jest.spyOn(ca.resizeObserver, 'observe');
                    jest.spyOn(ca.resizeObserver, 'unobserve');
                    jest.spyOn(ca, 'measureDebounced');
                    jest.spyOn(ca, 'measure');
                    return [4 /*yield*/, waitForNextTick()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        // Reset DOM
        document.body.innerHTML = '';
    });
    it('calls logger.setMinLogLevel when setMinLogLevel is called', function () {
        ca.setMinLogLevel('warn');
        expect(mockLogger.setMinLogLevel).toHaveBeenCalledWith('warn');
    });
    it('calls logger.enableLogging when setLogging is called', function () {
        ca.setLogging(true);
        expect(mockLogger.enableLogging).toHaveBeenCalledWith(true);
    });
    it('returns the value of logger.isEnabled when isLoggingEnabled is called', function () {
        expect(ca.isLoggingEnabled()).toEqual(true);
    });
    it('calls observe on the mutation observer with the correct option', function () {
        var observeSpy = jest.spyOn(window.MutationObserver.prototype, 'observe');
        ca = new ContentAwareness(mockScene);
        expect(observeSpy).toHaveBeenCalledWith(document.documentElement, {
            attributeFilter: ['data-sm-video', 'data-sm-content'],
            attributeOldValue: true,
            childList: true,
            subtree: true,
        });
    });
    it('sends a updateContentAwareness message on initialisation', function () {
        var initialElementId = '1';
        elementOne = createSmContentElement(initialElementId);
        document.body.appendChild(elementOne);
        ca = new ContentAwareness(mockScene);
        expect(mockScene.sendRequest).toHaveBeenCalledWith('updateContentAwareness', {
            content: [
                {
                    id: initialElementId,
                    x1: mockContentBoundingClientRect.left,
                    x2: mockContentBoundingClientRect.right,
                    y1: mockContentBoundingClientRect.top,
                    y2: mockContentBoundingClientRect.bottom,
                },
            ],
            videoFrame: {
                x1: mockVideoBoundingClientRect.left,
                x2: mockVideoBoundingClientRect.right,
                y1: mockVideoBoundingClientRect.top,
                y2: mockVideoBoundingClientRect.bottom,
            },
            viewHeight: 768,
            viewWidth: 1024,
        });
    });
    it('sends a updateContentAwareness message when the window resizes', function () {
        var newWidth = 200;
        var newHeight = 350;
        Object.assign(window, { innerWidth: newWidth });
        window.dispatchEvent(new Event('resize'));
        jest.runAllTimers();
        expect(mockScene.sendRequest).toHaveBeenCalledWith('updateContentAwareness', expect.objectContaining({
            viewHeight: 768,
            viewWidth: newWidth,
        }));
        Object.assign(window, { innerHeight: newHeight });
        window.dispatchEvent(new Event('resize'));
        jest.runAllTimers();
        expect(mockScene.sendRequest).toHaveBeenCalledWith('updateContentAwareness', expect.objectContaining({
            viewHeight: newHeight,
            viewWidth: newWidth,
        }));
    });
    it('returns measurements that are integers', function () {
        var viewWidth = 400.4;
        var viewWidthRounded = 400;
        var viewHeight = 650.6;
        var viewHeightRounded = 651;
        Object.assign(window, { innerWidth: viewWidth, innerHeight: viewHeight });
        window.dispatchEvent(new Event('resize'));
        jest.runAllTimers();
        expect(mockScene.sendRequest).toHaveBeenCalledWith('updateContentAwareness', expect.objectContaining({
            viewHeight: viewHeightRounded,
            viewWidth: viewWidthRounded,
        }));
    });
    it('defaults the debounce time to 300', function () {
        expect(ca.debounceTime).toEqual(300);
    });
    it('sets the debounce time to the passed in value', function () {
        ca = new ContentAwareness(mockScene, 9999);
        expect(ca.debounceTime).toEqual(9999);
    });
    describe('buildUpdateContentAwarenessRequest', function () {
        it('generates correct message body', function () {
            var viewWidth = 9;
            var viewHeight = 10;
            var videoFrame = {
                x1: 1,
                y1: 2,
                x2: 3,
                y2: 4,
            };
            var contentAwarenessObject = {
                id: 'test-object',
                x1: 5,
                y1: 6,
                x2: 7,
                y2: 8,
            };
            var requestBody = ca.buildUpdateContentAwarenessRequest(viewWidth, viewHeight, videoFrame, [contentAwarenessObject]);
            expect(requestBody).toEqual({
                viewWidth: viewWidth,
                viewHeight: viewHeight,
                videoFrame: videoFrame,
                content: [contentAwarenessObject],
            });
        });
    });
    describe('when nodes with sm-content are removed', function () {
        var elementOne;
        var elementTwo;
        var elementThree;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementOne = createSmContentElement('one');
                        elementTwo = createSmContentElement('two');
                        elementThree = createSmContentElement('three');
                        document.body.append(elementOne, elementTwo, elementThree);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        // Remove two of the three elements
                        elementOne === null || elementOne === void 0 ? void 0 : elementOne.remove();
                        elementThree === null || elementThree === void 0 ? void 0 : elementThree.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes from the two elements from the content collection and keeps the existing elements', function () {
            expect(ca.contentCollection).toEqual({
                two: elementTwo,
            });
        });
        it('calls unobserve on the two removed elements', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(elementOne);
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(elementThree);
        });
        it('does not unobserve on the non removed elements', function () {
            expect(ca.resizeObserver.unobserve).not.toHaveBeenCalledWith(elementTwo);
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when nodes with sm-content are removed', function () {
        var elementOne;
        var parentNode;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementOne = createSmContentElement('one');
                        parentNode = document.createElement('div');
                        parentNode.append(elementOne);
                        document.body.append(elementOne);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        elementOne === null || elementOne === void 0 ? void 0 : elementOne.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls unobserve on the removed element', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(elementOne);
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when parent and child nodes with sm-content are removed', function () {
        var childNode;
        var parentNode;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        childNode = createSmContentElement('childId');
                        parentNode = createSmContentElement('parentId');
                        parentNode.append(childNode);
                        document.body.append(parentNode);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        parentNode === null || parentNode === void 0 ? void 0 : parentNode.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls unobserve on the removed parent and child', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(parentNode);
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(childNode);
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when nodes with sm-content="xxx" are added', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create element
                        elementOne = createSmContentElement('newId');
                        document.body.append(elementOne);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls observe with the new id', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(elementOne, {
                box: 'border-box',
            });
        });
        it('adds the new element id to the content collection', function () {
            expect(ca.contentCollection).toEqual({
                newId: elementOne,
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when nodes with sm-content="" are added', function () {
        var invalidElement;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidElement = document.createElement('div');
                        invalidElement.setAttribute('data-sm-content', '');
                        document.body.append(invalidElement);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not observe the element', function () {
            expect(ca.resizeObserver.observe).not.toHaveBeenCalledWith(invalidElement, {
                box: 'border-box',
            });
        });
        it('does not add the element to the content collection', function () {
            expect(ca.contentCollection).toEqual({});
        });
        it('does not call measureDebounced', function () {
            expect(ca.measureDebounced).not.toHaveBeenCalled();
        });
    });
    describe('when a child node with sm-video is added', function () {
        var parentNode;
        var childNode;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create elements
                        parentNode = document.createElement('div');
                        childNode = createSmVideoElement('newVideo');
                        // Append as a child to verify child elements are picked up
                        parentNode.append(childNode);
                        document.body.append(parentNode);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets the video frame to the child video node', function () {
            expect(ca.videoFrame).toEqual(childNode);
        });
        it('calls observe on the resizeObserver with the childNode', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(childNode, {
                box: 'border-box',
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when child nodes with sm-content are added', function () {
        var parentElement;
        var childElement;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create elements
                        parentElement = document.createElement('div');
                        childElement = createSmContentElement('newId');
                        // Append as a child to verify child elements are picked up
                        parentElement.append(childElement);
                        document.body.append(parentElement);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls observe with the new id', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(childElement, {
                box: 'border-box',
            });
        });
        it('adds the new element id to the content collection', function () {
            expect(ca.contentCollection).toEqual({
                newId: childElement,
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when parent and child nodes with sm-content are added', function () {
        var parentElement;
        var childElement;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create elements
                        parentElement = createSmContentElement('parentId');
                        childElement = createSmContentElement('childId');
                        // Append as a child to verify child elements are picked up
                        parentElement.append(childElement);
                        document.body.append(parentElement);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls observe with the parent and child elements', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(parentElement, {
                box: 'border-box',
            });
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(childElement, {
                box: 'border-box',
            });
        });
        it('adds the new element id to the content collection', function () {
            expect(ca.contentCollection).toEqual({
                parentId: parentElement,
                childId: childElement,
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when a child node sm-content attribute is changed', function () {
        var parentElement;
        var childElement;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create element
                        childElement = createSmContentElement('oldId');
                        parentElement = document.createElement('div');
                        parentElement.append(childElement);
                        document.body.append(parentElement);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        // Update element attribute id
                        childElement.setAttribute('data-sm-content', 'newId');
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls observe with the new id', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(childElement, {
                box: 'border-box',
            });
        });
        it('calls unobserve with the old id', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(childElement);
        });
        it('adds the new element id to the content collection and removes the old id', function () {
            expect(ca.contentCollection).toEqual({
                newId: childElement,
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when a parent node with sm-video is removed', function () {
        var existingVideo;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existingVideo = document.querySelector('[data-sm-video]');
                        existingVideo === null || existingVideo === void 0 ? void 0 : existingVideo.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets the video frame to null', function () {
            expect(ca.videoFrame).toBeNull();
        });
        it('calls unobserve with the removed video', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(existingVideo);
        });
        it('does not call measure', function () {
            expect(ca.measure).not.toHaveBeenCalled();
        });
    });
    describe('when a child node with sm-video is removed', function () {
        var video;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var parentNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parentNode = document.createElement('div');
                        video = createSmVideoElement('newVideo');
                        parentNode.append(video);
                        document.body.append(parentNode);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        // Remove parent which has sm-video as a child
                        parentNode.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets the video frame to null', function () {
            expect(ca.videoFrame).toBeNull();
        });
        it('calls unobserve with the removed video', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(video);
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when the removed video element is NOT the same as the tracked video element', function () {
        var video1 = createSmVideoElement('video1');
        var video2 = createSmVideoElement('video2');
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Add video1 to DOM
                        document.body.append(video1);
                        // Add video2 to DOM
                        // CA switches to tracking the most recent video (video2)
                        document.body.append(video2);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        // Remove video1
                        video1.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not clear the video frame and leaves it set to most recent new video', function () {
            expect(ca.videoFrame).toEqual(video2);
        });
        it('calls unobserve with the removed video', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(video1);
        });
        it('does not unobserve the newest video', function () {
            expect(ca.resizeObserver.unobserve).not.toHaveBeenCalledWith(video2);
        });
    });
    describe('when a new node with sm-video attribute is added', function () {
        var orginalVideo;
        var newVideo;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.clearAllMocks();
                        orginalVideo = ca.videoFrame;
                        // Create video with sm video attribute
                        newVideo = document.createElement('video');
                        newVideo.setAttribute('data-sm-video', 'new-video');
                        document.body.append(newVideo);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('logs a warning saying that it already is observing a video and will switch to this video', function () {
            expect(mockLogger.log).toHaveBeenCalledWith('warn', 'ContentAwareness: Already observing a video element, switching to new video element');
        });
        it('calls unobserve on the resizeObserver with the original video', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(orginalVideo);
        });
        it('sets the videoFrame to the new video', function () {
            expect(ca.videoFrame).toEqual(newVideo);
        });
        it('calls observe on the resizeObserver with the new video', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(newVideo, {
                box: 'border-box',
            });
        });
        it('does not call observe on the resizeObserver with the original video', function () {
            expect(ca.resizeObserver.observe).not.toHaveBeenCalledWith(orginalVideo, {
                box: 'border-box',
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when generic nodes are removed', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        genericElement = document.createElement('div');
                        genericElement === null || genericElement === void 0 ? void 0 : genericElement.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not call resize observer unobserve', function () {
            expect(ca.resizeObserver.unobserve).not.toHaveBeenCalled();
        });
        it('does not call measure', function () {
            expect(ca.measure).not.toHaveBeenCalled();
        });
    });
    describe('when generic nodes are added', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Ignore initial observation of video element
                        jest.clearAllMocks();
                        genericElement = document.createElement('div');
                        document.body.append(genericElement);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not call observe', function () {
            expect(ca.resizeObserver.observe).not.toHaveBeenCalled();
        });
        it('does not call measure', function () {
            expect(ca.measure).not.toHaveBeenCalled();
        });
    });
    describe('when sm-content attribute value changes', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create element
                        elementOne = createSmContentElement('oldId');
                        document.body.append(elementOne);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        // Update element attribute id
                        elementOne.setAttribute('data-sm-content', 'newId');
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls observe with the new id', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(elementOne, {
                box: 'border-box',
            });
        });
        it('calls unobserve with the old id', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(elementOne);
        });
        it('adds the new element id to the content collection and removes the old id', function () {
            expect(ca.contentCollection).toEqual({
                newId: elementOne,
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('when the video data attribute is removed', function () {
        var video;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        video = document.querySelector('[data-sm-video]');
                        video === null || video === void 0 ? void 0 : video.removeAttribute('data-sm-video');
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('clears the videoFrame', function () {
            expect(ca.videoFrame).toBeNull();
        });
        it('calls unobserve on the resizeObserver with the videoFrame', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(video);
        });
        it('does not call measure', function () {
            expect(ca.measure).not.toHaveBeenCalled();
        });
    });
    describe('when a new sm-video attribute is added to an element', function () {
        var orginalVideo;
        var newVideo;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.clearAllMocks();
                        newVideo = document.createElement('video');
                        document.body.append(newVideo);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        orginalVideo = ca.videoFrame;
                        // Update video to have same attribute
                        newVideo.setAttribute('data-sm-video', 'new-video');
                        return [2 /*return*/];
                }
            });
        }); });
        it('logs a warning saying that it already is observing a video and will switch to this video', function () {
            expect(mockLogger.log).toHaveBeenCalledWith('warn', 'ContentAwareness: Already observing a video element, switching to new video element');
        });
        it('calls unobserve on the resizeObserver with the original video', function () {
            expect(ca.resizeObserver.unobserve).toHaveBeenCalledWith(orginalVideo);
        });
        it('sets the videoFrame to the new video', function () {
            expect(ca.videoFrame).toEqual(newVideo);
        });
        it('calls observe on the resizeObserver with the new video', function () {
            expect(ca.resizeObserver.observe).toHaveBeenCalledWith(newVideo, {
                box: 'border-box',
            });
        });
        it('does not call observe on the resizeObserver with the original video', function () {
            expect(ca.resizeObserver.observe).not.toHaveBeenCalledWith(orginalVideo, {
                box: 'border-box',
            });
        });
        it('calls measureDebounced', function () {
            expect(ca.measureDebounced).toHaveBeenCalled();
        });
    });
    describe('disconnect', function () {
        var disconnectSpy;
        beforeEach(function () {
            jest.spyOn(window, 'removeEventListener');
            disconnectSpy = jest.spyOn(window.MutationObserver.prototype, 'disconnect');
            mockScene.contentAwareness = ca;
            ca.disconnect();
        });
        it('calls disconnect on the mutation observer', function () {
            expect(disconnectSpy).toHaveBeenCalled();
        });
        it('calls disconnect on the resize observer', function () {
            expect(ca.resizeObserver.disconnect).toHaveBeenCalled();
        });
        it('removes the resize event listener', function () {
            expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        });
        it('sets the scenes content awareness class to undefined', function () {
            expect(mockScene.contentAwareness).toEqual(undefined);
        });
    });
    describe('reconnect', function () {
        var observeSpy;
        beforeEach(function () {
            jest.spyOn(window, 'addEventListener');
            observeSpy = jest.spyOn(window.MutationObserver.prototype, 'observe');
            mockScene.contentAwareness = undefined;
            // Clear mocks to avoid false positives from initialization calls
            jest.clearAllMocks();
            ca.reconnect();
        });
        it('calls observe on the mutation observer', function () {
            expect(observeSpy).toHaveBeenCalled();
        });
        it('adds a resize event listener', function () {
            expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        });
        it('restores the connection between the scene and content awareness class', function () {
            expect(mockScene.contentAwareness).toEqual(ca);
        });
    });
    describe('measure', function () {
        describe('when content is present', function () {
            it('does not call the log method', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest.clearAllMocks();
                            ca.measure();
                            return [4 /*yield*/, waitForNextTick()];
                        case 1:
                            _a.sent();
                            expect(mockLogger.log).not.toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should send an empty content array when there are no content elements', function () {
                ca.measure();
                expect(mockScene.sendRequest).toHaveBeenCalledWith('updateContentAwareness', expect.objectContaining({
                    content: [],
                }));
            });
        });
        it('logs a scene not connected error when the scene is not connected', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockScene.isConnected = jest.fn(function () { return false; });
                        ca.measure();
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        expect(mockLogger.log).toHaveBeenCalledWith('error', 'ContentAwareness: Scene does not exist or is not connected yet');
                        return [2 /*return*/];
                }
            });
        }); });
        it('logs a unable to find the video warning when the video frame is not present', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = document.querySelector('video')) === null || _a === void 0 ? void 0 : _a.remove();
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _b.sent();
                        ca.measure();
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _b.sent();
                        expect(mockLogger.log).toHaveBeenCalledWith('warn', 'ContentAwareness: Unable to find a video element');
                        return [2 /*return*/];
                }
            });
        }); });
        it('logs a warning and does not send an updateContentAwareness message when the video frame dimensions are invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var videoEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videoEl = document.querySelector('[data-sm-video]');
                        expect(videoEl).not.toBeNull();
                        if (!videoEl) return [3 /*break*/, 3];
                        jest.clearAllMocks();
                        jest.spyOn(videoEl, 'getBoundingClientRect').mockReturnValue(__assign(__assign({}, mockContentBoundingClientRect), { width: 0, height: 0 }));
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        ca.measure();
                        return [4 /*yield*/, waitForNextTick()];
                    case 2:
                        _a.sent();
                        expect(mockLogger.log).toHaveBeenCalledWith('warn', 'ContentAwareness: Video has a zero width and height');
                        expect(mockScene.sendRequest).not.toHaveBeenCalled();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('measureContent', function () {
        beforeEach(function () {
            document.body.innerHTML = '';
        });
        it('should correctly capture zero content elements', function () {
            var contentData = ca['measureContent']();
            expect(contentData).toEqual([]);
        });
        it('should correctly capture a single content element', function () {
            ca.contentCollection = {
                'test-one': createSmContentElement('test-one'),
            };
            var contentData = ca['measureContent']();
            expect(contentData).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'test-one' })]));
        });
        it('should correctly capture multiple content elements', function () {
            ca.contentCollection = {
                'test-one': createSmContentElement('test-one'),
                'test-two': createSmContentElement('test-two'),
                'test-three': createSmContentElement('test-three'),
            };
            var contentData = ca['measureContent']();
            expect(contentData).toEqual(expect.arrayContaining([
                expect.objectContaining({ id: 'test-one' }),
                expect.objectContaining({ id: 'test-two' }),
                expect.objectContaining({ id: 'test-three' }),
            ]));
        });
        it('should capture the coordinate location of a content element', function () {
            var el = createSmContentElement('test');
            ca.contentCollection = { test: el };
            var contentData = ca['measureContent']();
            expect(contentData).toEqual([
                {
                    id: 'test',
                    x1: mockContentBoundingClientRect.left,
                    x2: mockContentBoundingClientRect.right,
                    y1: mockContentBoundingClientRect.top,
                    y2: mockContentBoundingClientRect.bottom,
                },
            ]);
        });
        /**
         * TODO: Provide some ID duplication warning on the frontend.
         * This is currently the expected result when more than one
         * content element has the same ID, but this case should be
         * handled more helpfully and this test should be updated
         * according to whatever solution is chosen.
         *
         * eg. 'it should NOT allow duplicate content element IDs'
         *
         * QUIC-545 Provide developer tooling to identify duplicated content IDs
         * https://soulmachines.atlassian.net/browse/QUIC-545
         */
        it('does not send duplicate content element IDs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var elementOne, element2, element3, contentData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementOne = createSmContentElement('test-one');
                        element2 = createSmContentElement('test-one');
                        element3 = createSmContentElement('test-two');
                        document.body.append(elementOne, element2, element3);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        contentData = ca['measureContent']();
                        expect(contentData.length).toEqual(2);
                        expect(contentData).toEqual(expect.arrayContaining([
                            expect.objectContaining({ id: 'test-one' }),
                            expect.objectContaining({ id: 'test-two' }),
                        ]));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log a warning if the sm-content width and height are <= zero and add it to the content collection', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = '123';
                        el = document.createElement('div');
                        el.setAttribute('data-sm-content', id);
                        jest.spyOn(el, 'getBoundingClientRect').mockReturnValue(__assign(__assign({}, mockContentBoundingClientRect), { width: 0, height: 0 }));
                        document.body.append(el);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        jest.runAllTimers();
                        expect(mockLogger.log).toHaveBeenCalledWith('warn', "ContentAwareness: Element '".concat(id, "' has a zero width and height"));
                        expect(ca.contentCollection[id]).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log a warning if the sm-content has no coordinates and not add it to the content collection', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = '567';
                        el = document.createElement('div');
                        el.setAttribute('data-sm-content', id);
                        document.body.append(el);
                        jest.spyOn(el, 'getBoundingClientRect').mockReturnValue(__assign(__assign({}, mockContentBoundingClientRect), { top: 0, left: 0, right: 0, bottom: 0 }));
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        jest.runAllTimers();
                        expect(mockLogger.log).toHaveBeenCalledWith('warn', "ContentAwareness: Element '".concat(id, "' is not being tracked"));
                        expect(ca.contentCollection[id]).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log a warning if the sm-video width and height are <= zero', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = '789';
                        el = document.createElement('video');
                        el.setAttribute('data-sm-video', id);
                        document.body.append(el);
                        return [4 /*yield*/, waitForNextTick()];
                    case 1:
                        _a.sent();
                        jest.runAllTimers();
                        expect(mockLogger.log).toHaveBeenCalledWith('warn', "ContentAwareness: Video has a zero width and height");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=ContentAwareness.spec.js.map