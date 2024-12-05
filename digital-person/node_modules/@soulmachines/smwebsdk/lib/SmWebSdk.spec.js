"use strict";
/*
 * Copyright 2019-2020 Soul Machines Ltd. All Rights Reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Scene_1 = require("./Scene");
var SmWebSdk_1 = require("./SmWebSdk");
jest.mock('./ContentAwareness');
describe('SmWebSdk', function () {
    var smWebSdk;
    var scene = new Scene_1.Scene(undefined);
    beforeEach(function () {
        smWebSdk = new SmWebSdk_1.SmWebSdk();
    });
    it('exposes a Scene class', function () {
        expect(new smWebSdk.Scene(undefined)).toBeInstanceOf(Scene_1.Scene);
    });
    it('exposes a Persona class', function () {
        expect(new smWebSdk.Persona(scene, 123)).toBeInstanceOf(_1.Persona);
    });
});
//# sourceMappingURL=SmWebSdk.spec.js.map