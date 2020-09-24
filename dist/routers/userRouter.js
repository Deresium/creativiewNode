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
const google_auth_library_1 = require("google-auth-library");
const User_1 = __importDefault(require("../db/models/eshop/User"));
const roles_1 = __importDefault(require("../enums/roles"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = require("../cookies");
const userRouter = express_1.default.Router();
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userLoginSuccess = null;
    const email = req.body.email;
    const password = req.body.password;
    const idToken = req.body.idToken;
    const name = req.body.name;
    try {
        if (email && idToken && name) {
            const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
            const ticket = yield client.verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.CLIENT_ID
            });
            const payload = ticket.getPayload();
            if (payload) {
                const userid = payload['sub'];
                let user = yield User_1.default.findOne({ where: { googleId: userid } });
                if (!user) {
                    user = yield User_1.default.create({
                        fullName: name,
                        email,
                        googleId: userid,
                        roleCode: roles_1.default.USER
                    });
                }
                userLoginSuccess = user;
            }
            else {
                res.status(401).send();
            }
        }
        else if (email && password) {
            const foundUser = yield User_1.default.findOne({ where: { email } });
            if (!foundUser)
                res.status(400).send('Email ou mot de passe incorrect');
            const passwordHash = yield bcryptjs_1.default.hash(password, foundUser.userSalted);
            const compare = passwordHash === foundUser.userPassword;
            if (compare) {
                userLoginSuccess = foundUser;
            }
            else {
                res.status(400).send('Email ou mot de passe incorrect');
            }
        }
        else {
            res.status(401).send();
        }
        if (userLoginSuccess) {
            const token = jsonwebtoken_1.default.sign({ id: userLoginSuccess.userId, role: userLoginSuccess.userRole }, process.env.JWT_SECRET).split('.');
            const signatureCookieValue = token[2];
            const payloadCookieValue = `${token[0]}.${token[1]}`;
            res.setHeader('Set-Cookie', [cookies_1.getSignatureCookie(signatureCookieValue), cookies_1.getPayloadCookie(payloadCookieValue)]);
            res.status(200).send(userLoginSuccess.userRole);
        }
    }
    catch (error) {
        res.send(500).send();
    }
}));
userRouter.post('/createAccount', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    if (password !== repeatPassword)
        res.status(400).send();
    try {
        const foundUser = yield User_1.default.findOne({ where: { email } });
        if (foundUser) {
            res.status(400).send('Un utilisateur associé à cet email existe déjà');
        }
        else {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield bcryptjs_1.default.hash(password, salt);
            const user = yield User_1.default.create({
                fullName: `${firstName} ${name}`,
                email,
                password: passwordHash,
                salted: salt,
                roleCode: roles_1.default.USER
            });
            res.status(200).send({
                id: user.userId
            });
        }
    }
    catch (error) {
        res.status(400).send();
    }
}));
userRouter.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Set-Cookie', [cookies_1.getSignatureCookie('', true), cookies_1.getPayloadCookie('', true)]);
    res.send();
}));
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map