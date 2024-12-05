/**
 * @module smwebsdk
 */
import { ConnectionStateData, ConnectionStateTypes } from './enums/ConnectionStateTypes';
import { SmEvent } from './SmEvent';
/**
 * Determines and stores Connection State.
 *
 * @public
 */
export declare class ConnectionState {
    private _connectionState;
    private _onConnectionStateUpdated;
    constructor();
    setConnectionState(connectionStateType: ConnectionStateTypes): void;
    getConnectionState(): ConnectionStateData;
    get onConnectionStateUpdated(): SmEvent;
    reset(): void;
}
//# sourceMappingURL=ConnectionState.d.ts.map