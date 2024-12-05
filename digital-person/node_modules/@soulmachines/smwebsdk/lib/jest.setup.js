"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webcrypto_1 = require("@peculiar/webcrypto");
// jsdom does not support crypto. Need to add it manually
global.crypto = new webcrypto_1.Crypto();
//# sourceMappingURL=jest.setup.js.map