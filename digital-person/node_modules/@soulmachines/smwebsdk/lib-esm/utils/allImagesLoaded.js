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
export default allImagesLoaded;
//# sourceMappingURL=allImagesLoaded.js.map