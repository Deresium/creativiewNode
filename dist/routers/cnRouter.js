"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Invitation_1 = __importDefault(require("../models/Invitation"));
const express_1 = __importDefault(require("express"));
const Guest_1 = __importDefault(require("../models/Guest"));
const sendGridCn_1 = require("../sendGridCn");
const Contact_1 = __importDefault(require("../models/Contact"));
const mongoose = __importStar(require("mongoose"));
const routerCn = express_1.default.Router();
routerCn.post('/cn/event', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invitation = new Invitation_1.default({
        'company': req.body.invitation.company,
        'mainGuest': new Guest_1.default(req.body.invitation.mainGuest),
    });
    invitation.guestList = [];
    req.body.invitation.guestList.forEach((guest) => {
        invitation.guestList.push(new Guest_1.default(Object.assign(Object.assign({}, guest), { invitation })));
    });
    const db = mongoose.connection;
    yield Invitation_1.default.createCollection();
    yield Guest_1.default.createCollection();
    const session = yield db.startSession();
    session.startTransaction();
    try {
        yield Guest_1.default.create([invitation.mainGuest], { session });
        yield Invitation_1.default.create([invitation], { session });
        for (const guest of invitation.guestList) {
            yield Guest_1.default.create([guest], { session });
        }
        yield session.commitTransaction();
        yield sendGridCn_1.sendNewInvitationMail(invitation);
        res.status(200).send(invitation);
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        res.status(500).send();
    }
    finally {
        session.endSession();
    }
}));
routerCn.post('/cn/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.default.create(req.body.contact);
        yield sendGridCn_1.sendContactMail(contact);
        res.status(200).send(contact);
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
exports.default = routerCn;
