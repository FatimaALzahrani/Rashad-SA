import { NLPIntent } from './types/scene';
var MetadataSender = /** @class */ (function () {
    function MetadataSender(scene) {
        var _this = this;
        this.scene = scene;
        this._previousUrl = window.location.href;
        this._observer = new MutationObserver(function () { return _this.observeDocumentChanges(); });
    }
    MetadataSender.prototype.observeUrlChanges = function () {
        this._observer.observe(document, { subtree: true, childList: true });
    };
    MetadataSender.prototype.disconnect = function () {
        this._observer.disconnect();
    };
    MetadataSender.prototype.send = function () {
        var conversationVariables = {
            personaId: this.scene.currentPersonaId,
            text: NLPIntent.PAGE_METADATA,
            variables: {
                pageUrl: window.location.href.split('?')[0],
            },
            optionalArgs: {},
        };
        this.scene.sendRequest('conversationSend', conversationVariables);
    };
    MetadataSender.prototype.observeDocumentChanges = function () {
        if (window.location.href !== this._previousUrl) {
            // Update url to current one
            this._previousUrl = window.location.href;
            // Send event
            this.send();
        }
    };
    return MetadataSender;
}());
export { MetadataSender };
//# sourceMappingURL=MetadataSender.js.map