/*
 * Copyright 2021 Soul Machines Ltd. All Rights Reserved.
 */
import { ResizeObserver } from '@juggle/resize-observer';
import allImagesLoaded from './utils/allImagesLoaded';
import { debouncedFunction } from './utils/debounce';
import { Logger } from './utils/Logger';
/**
 * ContentAwareness class
 *
 * An instance of this class is used to enable CUE behaviors in the digital human.
 * This is achived by measuring tagged HTML elements and sending their coordinates back to the server
 *
 * See documentation on GitHub for further reference on how to use this API
 * https://github.com/soulmachines/smwebsdk/blob/cue-content-awareness-api/guide/content-awareness.md
 *
 * @public
 */
var ContentAwareness = /** @class */ (function () {
    function ContentAwareness(scene, debounceTime, logger) {
        if (debounceTime === void 0) { debounceTime = 300; }
        if (logger === void 0) { logger = new Logger(); }
        var _this = this;
        this.scene = scene;
        this.debounceTime = debounceTime;
        this.logger = logger;
        // Data Attribute Strings
        this.VIDEO_FRAME_STR = 'data-sm-video';
        this.VIDEO_FRAME_STR_BRACKETED = "[".concat(this.VIDEO_FRAME_STR, "]");
        this.CONTENT_STR = 'data-sm-content';
        this.CONTENT_STR_BRACKETED = "[".concat(this.CONTENT_STR, "]");
        this.CUE_ATTRIBUTES = [this.VIDEO_FRAME_STR, this.CONTENT_STR];
        this.CUE_ATTRIBUTES_BRACKETED = [
            this.VIDEO_FRAME_STR_BRACKETED,
            this.CONTENT_STR_BRACKETED,
        ].join();
        this.RESIZE_OBSERVER_BOX_OPTIONS = 'border-box';
        this.callMeasure = false;
        this.contentCollection = {};
        this.videoFrame = null;
        this.debouncedMeasure = debouncedFunction(function () { return _this.measureInternal(); }, debounceTime);
        this.resizeObserver = new ResizeObserver(function () { return _this.measureDebounced(); });
        this.getInitialElements();
        this.mutationObserver = new MutationObserver(function (mutations) {
            return _this.mutationCallback(mutations);
        });
        this.setupEventListeners();
        this.observeMutations();
        this.measureInternal();
    }
    /**
     * Check if the content awareness logging is enabled.
     *
     * @returns Returns true if the content awareness logging is enabled otherwise false.
     */
    ContentAwareness.prototype.isLoggingEnabled = function () {
        return this.logger.isEnabled;
    };
    /**
     * Enable/disable content awareness logging
     * @param enable - set true to enable content awareness log, false to disable
     */
    ContentAwareness.prototype.setLogging = function (enable) {
        this.logger.enableLogging(enable);
    };
    /**
     * Check minimal log level of content awareness.
     *
     * @returns Returns minimal log setting of content awareness, type is LogLevel.
     */
    ContentAwareness.prototype.getMinLogLevel = function () {
        return this.logger.getMinLogLevel();
    };
    /**
     * Set minimal log level of  content awareness logging.
     * @param level - use LogLevel type to set minimal log level of  content awareness logging
     */
    ContentAwareness.prototype.setMinLogLevel = function (level) {
        this.logger.setMinLogLevel(level);
    };
    ContentAwareness.prototype.setupEventListeners = function () {
        var _this = this;
        window.addEventListener('resize', function () { return _this.measureDebounced(); });
    };
    /**
     * Get initial elements, future elements will be added via mutation observer
     */
    ContentAwareness.prototype.getInitialElements = function () {
        var _this = this;
        var videoEl = document.querySelector(this.VIDEO_FRAME_STR_BRACKETED);
        var contentElements = document.querySelectorAll(this.CONTENT_STR_BRACKETED);
        this.trackVideoElement(videoEl);
        Array.from(contentElements).map(function (element) {
            return _this.trackContentElement(element);
        });
    };
    /**
     * Start watching for changes in the DOM that are relevant to
     * ContentAwareness object tracking.
     * @returns The ContentAwareness MutationObserver used for all content
     */
    ContentAwareness.prototype.observeMutations = function () {
        var watchNode = document.documentElement || document.body; // Target node of DOM to watch
        this.mutationObserver.observe(watchNode, {
            attributeFilter: this.CUE_ATTRIBUTES,
            attributeOldValue: true,
            childList: true,
            subtree: true, // Monitor elements in child directories
        });
    };
    /**
     * Publicly accessible function to disconnect observers and event listeners
     */
    ContentAwareness.prototype.disconnect = function () {
        var _this = this;
        // Disconnect observers
        this.mutationObserver.disconnect();
        this.resizeObserver.disconnect();
        // Remove event listeners
        window.removeEventListener('resize', function () { return _this.measureDebounced(); });
        // Reset scene
        this.scene.contentAwareness = undefined;
    };
    /**
     * Publicly accessible function to reconnect observers and event listeners
     */
    ContentAwareness.prototype.reconnect = function () {
        // Restore the link between scene and ca
        this.scene.contentAwareness = this;
        this.observeMutations();
        this.setupEventListeners();
        this.measure();
    };
    /**
     * Publicly accessible function to trigger measurement of CUE-relevant elements in the DOM
     * and send an updateContentAwareness message
     */
    ContentAwareness.prototype.measure = function () {
        this.measureInternal();
    };
    ContentAwareness.prototype.measureDebounced = function () {
        this.debouncedMeasure();
    };
    /**
     * measures data-sm-video and data-sm-content HTML Elements
     *
     * This is automatically called in simple scenarios but can be manually called
     * if the dev knows an important element has changed
     *
     * See documentation on GitHub for further reference on how to use this API
     * https://github.com/soulmachines/smwebsdk/blob/cue-content-awareness-api/guide/content-awareness.md
     *
     * Console logs the sent message on success or an error on failure
     */
    ContentAwareness.prototype.measureInternal = function () {
        if (!this.scene.isConnected()) {
            this.logger.log('error', 'ContentAwareness: Scene does not exist or is not connected yet');
            return;
        }
        var windowSize = this.measureWindow();
        var videoFrame = this.measureVideoFrame();
        var contentCollection = this.measureContent();
        if (windowSize && videoFrame && contentCollection) {
            var contentAwarenessMessage = this.buildUpdateContentAwarenessRequest(windowSize.innerWidth, windowSize.innerHeight, videoFrame, contentCollection);
            this.scene.sendRequest('updateContentAwareness', contentAwarenessMessage);
        }
    };
    /**
     * measure elements tagged with data-videoFrame
     * @returns a ContentAwarenessObjectModel filled with
     * videoFrame coordinates on success. returns null on failure
     */
    ContentAwareness.prototype.measureVideoFrame = function () {
        if (!this.videoFrame) {
            this.logger.log('warn', 'ContentAwareness: Unable to find a video element');
            return null;
        }
        var videoRect = this.videoFrame.getBoundingClientRect();
        if (this.invalidDimensions(videoRect)) {
            this.logger.log('warn', 'ContentAwareness: Video has a zero width and height');
            return null;
        }
        return {
            x1: Math.round(videoRect.left),
            x2: Math.round(videoRect.right),
            y1: Math.round(videoRect.top),
            y2: Math.round(videoRect.bottom),
        };
    };
    /**
     * measure elements tagged with data-content
     * @returns a ContentAwarenessObjectModel array filled with the coordinates and
     * ids of content tagged with the data-sm-content attribute
     */
    ContentAwareness.prototype.measureContent = function () {
        var _this = this;
        var validContent = [];
        Object.keys(this.contentCollection).map(function (key) {
            var contentElement = _this.contentCollection[key];
            var contentRect = contentElement.getBoundingClientRect();
            if (_this.invalidDimensions(contentRect)) {
                _this.logger.log('warn', "ContentAwareness: Element '".concat(key, "' has a zero width and height"));
            }
            if (_this.invalidContent(contentRect)) {
                _this.logger.log('warn', "ContentAwareness: Element '".concat(key, "' is not being tracked"));
                // Remove id from content collection but keep observers incase it changes
                delete _this.contentCollection[key];
                return;
            }
            validContent.push({
                id: key,
                x1: Math.round(contentRect.left),
                x2: Math.round(contentRect.right),
                y1: Math.round(contentRect.top),
                y2: Math.round(contentRect.bottom),
            });
        });
        return validContent;
    };
    /**
     * Preliminary indication of if content dimensions are valid or not.
     * Checks if the length and height are zero
     * @param contentRect - the DOMRect to check
     * @returns a bool indicating validity
     */
    ContentAwareness.prototype.invalidDimensions = function (contentRect) {
        return contentRect.width === 0 && contentRect.height === 0;
    };
    /**
     * Preliminary indication of if content is valid or not.
     * Checks if the coordinates are non zero
     * @param contentRect - the DOMRect to check
     * @returns a bool indicating validity
     */
    ContentAwareness.prototype.invalidContent = function (contentRect) {
        return (contentRect.top === 0 &&
            contentRect.bottom === 0 &&
            contentRect.right === 0 &&
            contentRect.left === 0);
    };
    /**
     * measure the browser window
     * @returns an object containing the window height (innerHeight) and window width (innerWidth)
     */
    ContentAwareness.prototype.measureWindow = function () {
        return {
            innerHeight: Math.round(window.innerHeight),
            innerWidth: Math.round(window.innerWidth),
        };
    };
    /**
     * Builds the required UpdateContentAwareness message that gets sent to the server
     *
     * @param viewWidth - the width of the browser window
     * @param viewHeight - the height of the browser window
     * @param videoFrame - an object containing the coordinates of the video element in which the persona exists
     * @param content - an array of objects containing the coordinates of the content elements the persona should be aware of
     * @returns - UpdateContentAwarenessRequestBody the message body to send
     *
     * The return value from this function should be passed to
     * scene.sendRequest('updateContentAwareness', body)
     */
    ContentAwareness.prototype.buildUpdateContentAwarenessRequest = function (viewWidth, viewHeight, videoFrame, content) {
        return {
            viewWidth: viewWidth,
            viewHeight: viewHeight,
            videoFrame: videoFrame,
            content: content,
        };
    };
    ContentAwareness.prototype.trackVideoElement = function (element) {
        if (!element) {
            return;
        }
        if (this.videoFrame) {
            this.logger.log('warn', 'ContentAwareness: Already observing a video element, switching to new video element');
            this.untrackVideoElement(this.videoFrame);
        }
        this.videoFrame = element;
        this.resizeObserver.observe(this.videoFrame, {
            box: this.RESIZE_OBSERVER_BOX_OPTIONS,
        });
    };
    ContentAwareness.prototype.trackContentElement = function (element) {
        var id = element.getAttribute(this.CONTENT_STR);
        if (id) {
            this.contentCollection[id] = element;
            this.resizeObserver.observe(element, {
                box: this.RESIZE_OBSERVER_BOX_OPTIONS,
            });
            return true;
        }
        return false;
    };
    ContentAwareness.prototype.untrackContentElement = function (element) {
        var id = element.getAttribute(this.CONTENT_STR);
        var trackedElement = this.contentCollection[id];
        // only untrack the element if the element we have stored
        // against that id is the same one being requested for removal.
        // this allows for showing/hiding of elements that use the same id.
        if (element === trackedElement) {
            delete this.contentCollection[id];
            this.resizeObserver.unobserve(element);
        }
    };
    ContentAwareness.prototype.untrackVideoElement = function (element) {
        // Only clear the videoFrame element if its the same as the currently track video element.
        // A mismatch can occur when adding/removing different video elements. If a new video element appears we'll switch and track that.
        // If the remove event occurs after the switch we'll ignore it, as we don't want to untrack the newly added element
        if (element === this.videoFrame) {
            this.videoFrame = null;
        }
        // Always unobserve the removed element
        this.resizeObserver.unobserve(element);
    };
    /**
     * Takes an array of MutationRecords and measures the ones marked with content awareness attributes
     * @param mutations - an array of MutationRecords to check and measure
     */
    ContentAwareness.prototype.mutationCallback = function (mutations) {
        var _this = this;
        var imagesAdded = false;
        this.callMeasure = false; // reset callMeasure
        for (var i = 0; i < mutations.length; ++i) {
            switch (mutations[i].type) {
                case 'childList': {
                    if (mutations[i].target.nodeType !== Node.ELEMENT_NODE) {
                        break;
                    }
                    this.untrackRemovedNodeWithCUE(mutations[i].removedNodes); // Unobserve and stop tracking removed elements
                    this.trackAddedNodeWithCUE(mutations[i].addedNodes); // Start tracking elements added elements
                    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                        try {
                            var element = mutations[i].addedNodes[j];
                            if (!element.hasAttribute) {
                                // node is not an element, do not continue processing it
                                continue;
                            }
                            var isImage = element.tagName === 'IMG';
                            var containsImages = !!element.querySelector('img');
                            imagesAdded = isImage || containsImages;
                            if (imagesAdded) {
                                break;
                            }
                        }
                        catch (err) {
                            this.logger.log('warn', 'ContentAwareness: Failed to track non-element node', mutations[i].addedNodes[j]);
                        }
                    }
                    break;
                }
                case 'attributes': {
                    if (mutations[i].target.nodeType !== Node.ELEMENT_NODE) {
                        break;
                    }
                    try {
                        var element = mutations[i].target;
                        var attr = mutations[i].attributeName;
                        if (attr === this.VIDEO_FRAME_STR) {
                            if (element.hasAttribute(attr)) {
                                this.trackVideoElement(element);
                                this.callMeasure = true;
                            }
                            else if (this.videoFrame) {
                                this.untrackVideoElement(element);
                            }
                        }
                        else if (attr === this.CONTENT_STR) {
                            var newValue = element.getAttribute(attr);
                            var oldValue = mutations[i].oldValue;
                            if (oldValue) {
                                // data-sm-content attribute was changed and must be removed
                                this.resizeObserver.unobserve(this.contentCollection[oldValue]);
                                delete this.contentCollection[oldValue];
                            }
                            if (newValue) {
                                // data-sm-content attribute value was changed/added and now must be added to the list
                                this.contentCollection[newValue] = element;
                                this.resizeObserver.observe(element, {
                                    box: this.RESIZE_OBSERVER_BOX_OPTIONS,
                                });
                            }
                            this.callMeasure = true;
                        }
                        break;
                    }
                    catch (err) {
                        this.logger.log('warn', 'ContentAwareness: Failed to track non-element node', mutations[i].target);
                    }
                }
            }
        }
        if (this.callMeasure) {
            if (imagesAdded) {
                // Wait for all images to be loaded then remeasure
                allImagesLoaded().then(function () {
                    _this.measureDebounced();
                });
            }
            else {
                this.measureDebounced();
            }
        }
    };
    ContentAwareness.prototype.trackAddedNodeWithCUE = function (mutations) {
        var _this = this;
        mutations.forEach(function (node) {
            try {
                var element = node;
                if (!element.hasAttribute) {
                    // node is not an element, do not continue processing it
                    return;
                }
                // check top level node for cue attributes
                if (element.hasAttribute(_this.VIDEO_FRAME_STR)) {
                    _this.trackVideoElement(element);
                    _this.callMeasure = true;
                }
                else if (element.hasAttribute(_this.CONTENT_STR)) {
                    _this.callMeasure = _this.trackContentElement(element);
                }
                // check child nodes for cue attributes
                if (element.querySelector(_this.CUE_ATTRIBUTES_BRACKETED) !== null) {
                    element
                        .querySelectorAll(_this.CUE_ATTRIBUTES_BRACKETED)
                        .forEach(function (childElement) {
                        if (childElement.hasAttribute(_this.VIDEO_FRAME_STR)) {
                            _this.trackVideoElement(childElement);
                            _this.callMeasure = true;
                        }
                        else if (childElement.hasAttribute(_this.CONTENT_STR)) {
                            _this.callMeasure = _this.trackContentElement(childElement);
                        }
                    });
                }
            }
            catch (err) {
                _this.logger.log('warn', 'ContentAwareness: Failed to track non-element node', node);
            }
        });
    };
    ContentAwareness.prototype.untrackRemovedNodeWithCUE = function (mutations) {
        var _this = this;
        mutations.forEach(function (node) {
            try {
                var element = node;
                if (!element.hasAttribute) {
                    // node is not an element, do not continue processing it
                    return;
                }
                if (element.hasAttribute(_this.VIDEO_FRAME_STR)) {
                    _this.untrackVideoElement(element);
                }
                else if (element.hasAttribute(_this.CONTENT_STR)) {
                    _this.untrackContentElement(element);
                    _this.callMeasure = true;
                }
                // check child nodes for cue attributes
                if (element.querySelector(_this.CUE_ATTRIBUTES_BRACKETED) !== null) {
                    element
                        .querySelectorAll(_this.CUE_ATTRIBUTES_BRACKETED)
                        .forEach(function (childElement) {
                        if (childElement.hasAttribute(_this.VIDEO_FRAME_STR)) {
                            _this.untrackVideoElement(childElement);
                        }
                        else if (childElement.hasAttribute(_this.CONTENT_STR)) {
                            _this.untrackContentElement(childElement);
                            _this.callMeasure = true;
                        }
                    });
                }
            }
            catch (err) {
                _this.logger.log('warn', 'ContentAwareness: Failed to track non-element node', node);
            }
        });
    };
    return ContentAwareness;
}());
export { ContentAwareness };
//# sourceMappingURL=ContentAwareness.js.map