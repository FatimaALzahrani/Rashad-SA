import { Crypto } from '@peculiar/webcrypto';
// jsdom does not support crypto. Need to add it manually
global.crypto = new Crypto();
//# sourceMappingURL=jest.setup.js.map