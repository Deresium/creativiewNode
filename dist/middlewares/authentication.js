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
exports.retrieveUser = exports.authOnlyOwner = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const roles_1 = __importDefault(require("../enums/roles"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.headers.cookie);
        extractToken(req);
        if (req.userId && req.userRole)
            next();
        else
            res.status(401).send('Please authenticate');
    }
    catch (e) {
        res.status(401).send('Please authenticate');
    }
});
exports.auth = auth;
const authOnlyOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.userRole === roles_1.default.OWNER)
        next();
    else
        res.status(401).send('Please authenticate');
});
exports.authOnlyOwner = authOnlyOwner;
const retrieveUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    extractToken(req);
    next();
});
exports.retrieveUser = retrieveUser;
const extractToken = (req) => {
    const cookies = cookie_1.default.parse(req.headers.cookie || '');
    const sign = cookies.signature;
    const payload = cookies.payload;
    if (sign && payload) {
        const token = `${payload}.${sign}`;
        const decrypt = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userRole = roles_1.default[decrypt.role];
        req.userId = decrypt.id;
    }
};
//# sourceMappingURL=authentication.js.map