"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideallcardsMessage = exports.hidecardsMessage = exports.showcardsMessage = void 0;
var showcardsMessage = {
    body: {
        arguments: ['image', 'image1', 'image2'],
        name: 'showcards',
        personaId: '1',
    },
    category: 'scene',
    kind: 'event',
    name: 'speechMarker',
};
exports.showcardsMessage = showcardsMessage;
var hidecardsMessage = {
    body: {
        arguments: ['image'],
        name: 'hidecards',
        personaId: '1',
    },
    category: 'scene',
    kind: 'event',
    name: 'speechMarker',
};
exports.hidecardsMessage = hidecardsMessage;
var hideallcardsMessage = {
    body: {
        arguments: [],
        name: 'hidecards',
        personaId: '1',
    },
    category: 'scene',
    kind: 'event',
    name: 'speechMarker',
};
exports.hideallcardsMessage = hideallcardsMessage;
//# sourceMappingURL=speechMarkerResult.js.map