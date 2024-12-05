/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
import { Persona } from '.';
import { Scene } from './Scene';
import { SmWebSdk } from './SmWebSdk';
jest.mock('./ContentAwareness');
describe('SmWebSdk', function () {
    var smWebSdk;
    var scene = new Scene(undefined);
    beforeEach(function () {
        smWebSdk = new SmWebSdk();
    });
    it('exposes a Scene class', function () {
        expect(new smWebSdk.Scene(undefined)).toBeInstanceOf(Scene);
    });
    it('exposes a Persona class', function () {
        expect(new smWebSdk.Persona(scene, 123)).toBeInstanceOf(Persona);
    });
});
//# sourceMappingURL=SmWebSdk.spec.js.map