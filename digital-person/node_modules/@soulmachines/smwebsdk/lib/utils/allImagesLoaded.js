"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allImagesLoaded = function () {
    return Promise.all(Array.from(document.images)
        .filter(function (img) { return !img.complete; })
        .map(function (img) {
        return new Promise(function (resolve) {
            img.onload = resolve;
            img.onerror = resolve;
        });
    }));
};
exports.default = allImagesLoaded;
//# sourceMappingURL=allImagesLoaded.js.map