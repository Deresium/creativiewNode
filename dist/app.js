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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cnRouter_1 = __importDefault(require("./routers/cnRouter"));
const redirectHttps_1 = __importDefault(require("./middlewares/redirectHttps"));
const allowCn_1 = __importDefault(require("./middlewares/allowCn"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const allowCredentials_1 = __importDefault(require("./middlewares/allowCredentials"));
const cookies_1 = require("./cookies");
const galleryRouter_1 = __importDefault(require("./routers/galleryRouter"));
const mongodbCreatiview_1 = require("./mongodbCreatiview");
mongodbCreatiview_1.connect();
const app = express_1.default();
const publicDirectoryPath = path_1.default.join(__dirname, '../public');
if (process.env.NODE_ENV === 'production') {
    app.use(redirectHttps_1.default);
}
else {
    app.use(allowCredentials_1.default);
}
app.use(allowCn_1.default);
app.use(express_1.default.json());
app.use(cnRouter_1.default);
app.use(galleryRouter_1.default);
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login;
    const password = req.body.password;
    const pwOk = yield bcryptjs_1.default.compare(password, process.env.ADMIN_PW);
    if (login === process.env.ADMIN_LOGIN && pwOk) {
        const token = jsonwebtoken_1.default.sign({ admin: true }, process.env.JWT_SECRET).split('.');
        const signatureCookieValue = token[2];
        const payloadCookieValue = `${token[0]}.${token[1]}`;
        res.setHeader('Set-Cookie', [cookies_1.getSignatureCookie(signatureCookieValue), cookies_1.getPayloadCookie(payloadCookieValue)]);
        res.status(200);
    }
    else {
        res.status(401);
    }
    res.send();
}));
app.use(express_1.default.static(publicDirectoryPath));
exports.default = app;
