/*
 * Copyright 2019-2022 Soul Machines Ltd. All Rights Reserved.
 */
import { ConnectionStateTypes } from './enums/ConnectionStateTypes';
import { ConnectionState } from './ConnectionState';
describe('Connection State', function () {
    var connectionState;
    var firstStep = {
        name: ConnectionStateTypes.Disconnected,
        currentStep: 0,
        percentageLoaded: 0,
        totalSteps: 5,
    };
    beforeEach(function () {
        connectionState = new ConnectionState();
    });
    it('returns the current step data when getConnectionState() is called', function () {
        expect(connectionState.getConnectionState()).toEqual(firstStep);
    });
    it('resets the connection state to be the first step when reset() is called', function () {
        connectionState.setConnectionState(ConnectionStateTypes.Connected);
        connectionState.reset();
        expect(connectionState.getConnectionState()).toEqual(firstStep);
    });
    describe('when there are five steps', function () {
        var callbackFn = jest.fn();
        var TOTAL_CONNECTION_STEPS = Object.keys(ConnectionStateTypes).length;
        beforeEach(function () {
            connectionState.onConnectionStateUpdated.addListener(callbackFn);
        });
        describe('when we are on step one', function () {
            beforeEach(function () {
                connectionState.setConnectionState(ConnectionStateTypes.SearchingForDigitalPerson);
            });
            it('calls onConnectionStateUpdated with the step name', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    name: ConnectionStateTypes.SearchingForDigitalPerson,
                }));
            });
            it('calls onConnectionStateUpdated with the current step', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    currentStep: 1,
                }));
            });
            it('calls onConnectionStateUpdated with the total steps', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    totalSteps: TOTAL_CONNECTION_STEPS,
                }));
            });
            it('calls onConnectionStateUpdated with the percentage loaded', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    percentageLoaded: 25,
                }));
            });
        });
        describe('when we are on step two', function () {
            beforeEach(function () {
                connectionState.setConnectionState(ConnectionStateTypes.DownloadingAssets);
            });
            it('calls onConnectionStateUpdated with the step name', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    name: ConnectionStateTypes.DownloadingAssets,
                }));
            });
            it('calls onConnectionStateUpdated with the current step', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    currentStep: 2,
                }));
            });
            it('calls onConnectionStateUpdated with the total steps', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    totalSteps: TOTAL_CONNECTION_STEPS,
                }));
            });
            it('calls onConnectionStateUpdated with the percentage loaded', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    percentageLoaded: 50,
                }));
            });
        });
        describe('when we are on step three', function () {
            beforeEach(function () {
                connectionState.setConnectionState(ConnectionStateTypes.ConnectingToDigitalPerson);
            });
            it('calls onConnectionStateUpdated with the step name', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    name: ConnectionStateTypes.ConnectingToDigitalPerson,
                }));
            });
            it('calls onConnectionStateUpdated with the current step', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    currentStep: 3,
                }));
            });
            it('calls onConnectionStateUpdated with the total steps', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    totalSteps: TOTAL_CONNECTION_STEPS,
                }));
            });
            it('calls onConnectionStateUpdated with the percentage loaded', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    percentageLoaded: 75,
                }));
            });
        });
        describe('when we are on step four', function () {
            beforeEach(function () {
                connectionState.setConnectionState(ConnectionStateTypes.Connected);
            });
            it('calls onConnectionStateUpdated with the step name', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    name: ConnectionStateTypes.Connected,
                }));
            });
            it('calls onConnectionStateUpdated with the current step', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    currentStep: 4,
                }));
            });
            it('calls onConnectionStateUpdated with the total steps', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    totalSteps: TOTAL_CONNECTION_STEPS,
                }));
            });
            it('calls onConnectionStateUpdated with the percentage loaded', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    percentageLoaded: 100,
                }));
            });
        });
        describe('when we are disconnected from connected', function () {
            beforeEach(function () {
                connectionState.setConnectionState(ConnectionStateTypes.Connected);
                connectionState.setConnectionState(ConnectionStateTypes.Disconnected);
            });
            it('calls onConnectionStateUpdated with the step name', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    name: ConnectionStateTypes.Disconnected,
                }));
            });
            it('calls onConnectionStateUpdated with the current step', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    currentStep: 0,
                }));
            });
            it('calls onConnectionStateUpdated with the total steps', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    totalSteps: TOTAL_CONNECTION_STEPS,
                }));
            });
            it('calls onConnectionStateUpdated with the percentage loaded', function () {
                expect(callbackFn).toBeCalledWith(expect.objectContaining({
                    percentageLoaded: 0,
                }));
            });
        });
        describe('when connection state is called with the same value', function () {
            it('does not call onConnectionStateUpdated again', function () {
                connectionState.setConnectionState(ConnectionStateTypes.Connected);
                expect(callbackFn).toHaveBeenCalledTimes(1);
                connectionState.setConnectionState(ConnectionStateTypes.Connected);
                connectionState.setConnectionState(ConnectionStateTypes.Connected);
                expect(callbackFn).toHaveBeenCalledTimes(1);
            });
        });
    });
});
//# sourceMappingURL=ConnectionState.spec.js.map