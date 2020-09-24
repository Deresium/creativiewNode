"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadCookie = exports.getSignatureCookie = void 0;
const cookie_1 = __importDefault(require("cookie"));
const getSignatureCookie = (value, deleteCookie = false) => {
    return cookie_1.default.serialize('signature', value, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: deleteCookie ? 0 : 60 * 60 * 24 * 7,
        domain: 'creatiview.be',
        sameSite: true
    });
};
exports.getSignatureCookie = getSignatureCookie;
const getPayloadCookie = (value, deleteCookie = false) => {
    return cookie_1.default.serialize('payload', value, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: deleteCookie ? 0 : 60 * 60 * 24 * 7,
        domain: 'creatiview.be',
        sameSite: true
    });
};
exports.getPayloadCookie = getPayloadCookie;
//# sourceMappingURL=cookies.js.map