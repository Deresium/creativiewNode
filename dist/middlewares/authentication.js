"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const cookies_1 = require("../cookies");
exports.auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = cookie_1.default.parse(req.headers.cookie || '');
        const sign = cookies.signature;
        const payload = cookies.payload;
        const token = `${payload}.${sign}`;
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            res.setHeader('Set-Cookie', cookies_1.getPayloadCookie(payload));
            next();
        }
    }
    catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
});
