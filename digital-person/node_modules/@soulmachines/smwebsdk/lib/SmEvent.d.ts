/**
 * @module smwebsdk
 */
/**
 * An event which can have a set of listeners registered against it using addListener().
 * @public
 */
export declare class SmEvent {
    private _callbacks;
    /**
     * Register a new listener for this event.
     * @param callback - Function called each time the event is triggered.
     */
    addListener(callback: Function): void;
    /**
     * Deregister a existing listener for this event.
     * @param callback - Previously registered function to be removed. It is a safe no-op to pass
     * a callback which was never registered against this event.
     */
    removeListener(callback: Function): void;
    /**
     * Trigger the event, calling each registered listener, and passing on any parameters.
     */
    call(...args: any[]): void;
}
//# sourceMappingURL=SmEvent.d.ts.map