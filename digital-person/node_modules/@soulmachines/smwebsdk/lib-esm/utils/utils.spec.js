import { convertWssToHttps, getUrlHost } from './utils';
describe('utils', function () {
    describe('validate wss to http conversion', function () {
        it('should change wss to https', function () {
            expect(convertWssToHttps('wss://')).toEqual('https://');
            expect(convertWssToHttps('wss://abc.xyz')).toEqual('https://abc.xyz');
            expect(convertWssToHttps('wss://abc.xyz/')).toEqual('https://abc.xyz/');
        });
        it('should not change random strings', function () {
            expect(convertWssToHttps('')).toEqual('');
            expect(convertWssToHttps('this')).toEqual('this');
            expect(convertWssToHttps('wss')).toEqual('wss');
        });
        it('should not change http to https', function () {
            expect(convertWssToHttps('http://abc.xyz')).toEqual('http://abc.xyz');
            expect(convertWssToHttps('http://abc.xyz/')).toEqual('http://abc.xyz/');
        });
        it('should not change https', function () {
            expect(convertWssToHttps('https://abc.xyz')).toEqual('https://abc.xyz');
            expect(convertWssToHttps('https://abc.xyz/')).toEqual('https://abc.xyz/');
        });
        it('should not replace anything in the middle of the string', function () {
            expect(convertWssToHttps('wss://abc.xyz/wss')).toEqual('https://abc.xyz/wss');
            expect(convertWssToHttps('http://abc.xyz?q=wss://tuv.def')).toEqual('http://abc.xyz?q=wss://tuv.def');
        });
    });
    describe('validate stripping url to base and adding https', function () {
        it('should be undefined if input is invalid', function () {
            expect(getUrlHost('bad data')).toBeUndefined();
        });
        it('should strip path', function () {
            expect(getUrlHost('https://abc.xyz/def')).toEqual('https://abc.xyz/');
        });
        it('should strip path and query params', function () {
            expect(getUrlHost('https://abc.xyz/def?ghi=jkl')).toEqual('https://abc.xyz/');
        });
        it('should append slash if otherwise valid', function () {
            expect(getUrlHost('https://abc.xyz')).toEqual('https://abc.xyz/');
        });
        it('should stay the same if already valid', function () {
            expect(getUrlHost('https://abc.xyz/')).toEqual('https://abc.xyz/');
        });
        it('should work with a real example', function () {
            expect(getUrlHost('https://playground.soulmachines.cloud/server/playground-syd--10-0-15-224.sm-int.cloud/api/telemetry/jwt')).toEqual('https://playground.soulmachines.cloud/');
        });
    });
});
//# sourceMappingURL=utils.spec.js.map