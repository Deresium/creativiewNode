"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadCookie = exports.getSignatureCookie = void 0;
const cookie_1 = __importDefault(require("cookie"));
const getSignatureCookie = (value) => {
    return cookie_1.default.serialize('signature', value, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });
};
exports.getSignatureCookie = getSignatureCookie;
const getPayloadCookie = (value) => {
    return cookie_1.default.serialize('payload', value, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 4
    });
};
exports.getPayloadCookie = getPayloadCookie;
